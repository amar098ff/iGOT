import { callAI } from './aiService.js';
import { PROMPTS } from './promptService.js';
import { validateSkillGapResponse } from './aiValidator.js';
import { SkillGap } from '../../models/LearningModels.js';
import { Skill } from '../../models/CompetencyModels.js';

export async function analyzeSkillGaps(userId, learnerData) {
  const prompt = PROMPTS.SKILL_GAP_ANALYSIS(learnerData);
  
  let aiData;
  try {
    aiData = await callAI(prompt);
  } catch (error) {
    throw new Error(`AI skill gap analysis failed: ${error.message}`);
  }

  const { valid, errors } = validateSkillGapResponse(aiData);
  if (!valid) {
    console.error('AI response validation failed:', errors);
    throw new Error(`AI returned invalid skill gap data: ${errors.join(', ')}`);
  }

  // Persist gaps to database
  const savedGaps = [];
  for (const gap of aiData.skillGaps) {
    // Try to find matching skill in DB
    const skillDoc = await Skill.findOne({ name: new RegExp(gap.skillName, 'i') });

    const gapFilter = { user: userId, ...(skillDoc ? { skill: skillDoc._id } : { 'meta.skillName': gap.skillName }) };
    
    if (skillDoc) {
      const saved = await SkillGap.findOneAndUpdate(
        { user: userId, skill: skillDoc._id },
        {
          user: userId,
          skill: skillDoc._id,
          currentLevel: gap.currentLevel,
          requiredLevel: gap.requiredLevel,
          gapSeverity: gap.gapSeverity,
          gapScore: gap.gapScore,
          priority: gap.priority,
          evidence: gap.evidence,
          recommendedAction: gap.recommendedAction,
          aiExplanation: gap.explanation,
          lastAssessedAt: new Date(),
          isResolved: gap.gapSeverity === 'NONE',
        },
        { upsert: true, new: true }
      );
      savedGaps.push(saved);
    }
  }

  return {
    analysis: aiData,
    savedGapsCount: savedGaps.length,
  };
}
