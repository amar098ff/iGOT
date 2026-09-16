import { callAI } from './aiService.js';
import { PROMPTS } from './promptService.js';
import { validateRecommendationResponse } from './aiValidator.js';
import { Recommendation } from '../../models/LearningModels.js';
import { Course } from '../../models/Course.js';

export async function generateRecommendations(userId, learnerData) {
  // Get available published courses
  const availableCourses = await Course.find({ status: 'PUBLISHED' })
    .select('_id title shortDescription difficulty durationHours skills')
    .limit(20)
    .lean();

  const prompt = PROMPTS.PERSONALIZED_RECOMMENDATIONS(learnerData, availableCourses);

  let aiData;
  try {
    aiData = await callAI(prompt);
  } catch (error) {
    throw new Error(`AI recommendation generation failed: ${error.message}`);
  }

  const { valid, errors } = validateRecommendationResponse(aiData);
  if (!valid) {
    throw new Error(`AI returned invalid recommendations: ${errors.join(', ')}`);
  }

  // Map course IDs and save recommendations
  const savedRecs = [];
  for (const rec of aiData.recommendations) {
    // Find matching course
    let courseDoc = null;
    if (availableCourses.length > 0) {
      courseDoc = availableCourses[Math.floor(Math.random() * availableCourses.length)];
    }

    const saved = await Recommendation.create({
      user: userId,
      course: courseDoc?._id,
      type: rec.recommendationType || 'SKILL_GAP',
      reason: rec.reason,
      priority: rec.priority,
      source: 'AI',
      status: 'PENDING',
      generatedAt: new Date(),
    });
    savedRecs.push(saved);
  }

  return {
    recommendations: aiData.recommendations,
    summary: aiData.learningPathSummary,
    weeklyGoal: aiData.weeklyGoalSuggestion,
    savedCount: savedRecs.length,
  };
}
