/**
 * AI Response Validator
 * Validates structured JSON responses from AI providers before DB insertion.
 */

const LEVELS = ['FOUNDATION', 'BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT'];
const SEVERITIES = ['NONE', 'LOW', 'MODERATE', 'HIGH', 'CRITICAL'];
const PRIORITIES = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];
const DIFFICULTIES = ['EASY', 'MEDIUM', 'HARD'];

export function validateSkillGapResponse(data) {
  const errors = [];

  if (typeof data.overallGapScore !== 'number') errors.push('overallGapScore must be a number');
  if (typeof data.summary !== 'string') errors.push('summary must be a string');
  if (!Array.isArray(data.skillGaps)) errors.push('skillGaps must be an array');
  if (!Array.isArray(data.priorityAreas)) errors.push('priorityAreas must be an array');

  if (Array.isArray(data.skillGaps)) {
    data.skillGaps.forEach((gap, i) => {
      if (!gap.skillName) errors.push(`skillGaps[${i}].skillName is required`);
      if (!LEVELS.includes(gap.currentLevel)) errors.push(`skillGaps[${i}].currentLevel invalid`);
      if (!LEVELS.includes(gap.requiredLevel)) errors.push(`skillGaps[${i}].requiredLevel invalid`);
      if (!SEVERITIES.includes(gap.gapSeverity)) errors.push(`skillGaps[${i}].gapSeverity invalid`);
      if (!PRIORITIES.includes(gap.priority)) errors.push(`skillGaps[${i}].priority invalid`);
    });
  }

  return { valid: errors.length === 0, errors };
}

export function validateMCQResponse(data) {
  const errors = [];

  if (!Array.isArray(data.questions)) errors.push('questions must be an array');
  if (typeof data.generatedCount !== 'number') errors.push('generatedCount must be a number');

  if (Array.isArray(data.questions)) {
    data.questions.forEach((q, i) => {
      if (!q.questionText) errors.push(`questions[${i}].questionText is required`);
      if (!Array.isArray(q.options) || q.options.length < 2) errors.push(`questions[${i}].options must have at least 2 items`);
      if (!q.correctAnswerExplanation) errors.push(`questions[${i}].correctAnswerExplanation is required`);
      if (!DIFFICULTIES.includes(q.difficulty)) {
        // Normalize instead of error
        q.difficulty = 'MEDIUM';
      }
      if (Array.isArray(q.options)) {
        const correctCount = q.options.filter(o => o.isCorrect).length;
        if (correctCount === 0) errors.push(`questions[${i}] has no correct answer`);
      }
    });
  }

  return { valid: errors.length === 0, errors };
}

export function validateRecommendationResponse(data) {
  const errors = [];

  if (!Array.isArray(data.recommendations)) errors.push('recommendations must be an array');
  if (typeof data.learningPathSummary !== 'string') errors.push('learningPathSummary must be a string');

  return { valid: errors.length === 0, errors };
}

export function validateCompetencyProfileResponse(data) {
  const errors = [];

  if (typeof data.overallScore !== 'number') errors.push('overallScore must be a number');
  if (!LEVELS.includes(data.overallLevel)) errors.push('overallLevel invalid');
  if (!Array.isArray(data.skillLevels)) errors.push('skillLevels must be an array');

  return { valid: errors.length === 0, errors };
}

/**
 * Safely parse AI JSON response, handling markdown code blocks
 */
export function parseAIJSON(rawResponse) {
  let text = rawResponse.trim();
  
  // Remove markdown code blocks if present
  text = text.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/\s*```$/i, '');
  
  try {
    return { data: JSON.parse(text), error: null };
  } catch (e) {
    // Try to extract JSON from within the text
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      try {
        return { data: JSON.parse(jsonMatch[0]), error: null };
      } catch (e2) {
        return { data: null, error: `Failed to parse AI JSON: ${e2.message}` };
      }
    }
    return { data: null, error: `Failed to parse AI JSON: ${e.message}` };
  }
}
