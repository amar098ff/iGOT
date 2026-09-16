/**
 * Centralized prompt templates for KarmaSiksha AI services.
 * All prompts must be versioned and maintained here.
 */

export const PROMPT_VERSION = '1.0';

export const PROMPTS = {
  
  // ─── SKILL GAP ANALYSIS ───────────────────────────────────────────────────
  SKILL_GAP_ANALYSIS: (learnerData) => `
You are an expert competency assessment analyst for a government training platform in India.

Analyze the skill gaps for the following learner profile and provide a structured assessment.

## Learner Profile
- Name: ${learnerData.name}
- Role: ${learnerData.role || 'Not specified'}
- Department: ${learnerData.department || 'Not specified'}
- Experience: ${learnerData.experienceYears || 0} years

## Current Skills (Self-Assessed)
${JSON.stringify(learnerData.currentSkills, null, 2)}

## Role Requirements
${JSON.stringify(learnerData.roleRequirements, null, 2)}

## Assessment Scores (if available)
${JSON.stringify(learnerData.assessmentScores, null, 2)}

Respond with ONLY valid JSON matching this exact structure:
{
  "overallGapScore": <number 0-100, where 0 = no gap, 100 = maximum gap>,
  "summary": "<2-3 sentence plain-language summary of the learner's overall competency state>",
  "priorityAreas": ["<top gap area 1>", "<top gap area 2>", "<top gap area 3>"],
  "skillGaps": [
    {
      "skillName": "<skill name>",
      "currentLevel": "<FOUNDATION|BEGINNER|INTERMEDIATE|ADVANCED|EXPERT>",
      "requiredLevel": "<FOUNDATION|BEGINNER|INTERMEDIATE|ADVANCED|EXPERT>",
      "gapSeverity": "<NONE|LOW|MODERATE|HIGH|CRITICAL>",
      "gapScore": <number 0-4>,
      "priority": "<LOW|MEDIUM|HIGH|CRITICAL>",
      "explanation": "<1-2 sentences explaining this specific gap in plain language>",
      "evidence": "<what evidence (assessment score, self-assessment, etc.) indicates this gap>",
      "recommendedAction": "<specific next step for this skill>"
    }
  ],
  "strengths": ["<strength 1>", "<strength 2>"],
  "immediateRecommendations": ["<action 1>", "<action 2>", "<action 3>"]
}`,

  // ─── PERSONALIZED RECOMMENDATIONS ────────────────────────────────────────
  PERSONALIZED_RECOMMENDATIONS: (learnerData, availableCourses) => `
You are a personalized learning advisor for a government competency platform.

Generate learning recommendations for this learner based on their gaps and profile.

## Learner
- Role: ${learnerData.role || 'Not specified'}
- Department: ${learnerData.department || 'Not specified'}
- Interests: ${(learnerData.interests || []).join(', ')}
- Learning Goals: ${(learnerData.learningGoals || []).join(', ')}

## Top Skill Gaps (Priority Order)
${JSON.stringify(learnerData.skillGaps?.slice(0, 5), null, 2)}

## Available Courses (IDs and metadata)
${JSON.stringify(availableCourses?.slice(0, 15), null, 2)}

Respond with ONLY valid JSON:
{
  "recommendations": [
    {
      "courseId": "<course ObjectId or null if iGOT>",
      "reason": "<specific 1-sentence reason why this is recommended for THIS learner>",
      "priority": "<HIGH|MEDIUM|LOW>",
      "addressesSkillGap": "<skill gap name this addresses, or null>",
      "estimatedImpact": "<description of learning outcome>",
      "recommendationType": "<SKILL_GAP|ROLE_REQUIREMENT|INTEREST|CONTINUATION>"
    }
  ],
  "learningPathSummary": "<2-sentence summary of the suggested learning journey>",
  "weeklyGoalSuggestion": "<a specific, achievable weekly learning goal>"
}`,

  // ─── MCQ GENERATION FROM DOCUMENT ────────────────────────────────────────
  MCQ_GENERATION: (config) => `
You are an expert educational assessment designer for a government training platform in India.

Generate ${config.questionCount} high-quality ${config.questionType || 'MCQ'} questions from the provided document content.

## Configuration
- Question Type: ${config.questionType || 'MCQ_SINGLE'}
- Difficulty: ${config.difficulty || 'MEDIUM'}
- Target Skill: ${config.skillName || 'Not specified'}
- Target Competency: ${config.competencyName || 'Not specified'}
- Language: ${config.language || 'English'}
- Topics to focus on: ${(config.topics || []).join(', ') || 'All topics in document'}

## Document Content
${config.documentText}

Requirements:
- Questions must be directly based on the document content
- Each question must have exactly 4 options for MCQ_SINGLE
- Only one option should be correct for MCQ_SINGLE
- Explanations must reference the source material
- Difficulty: EASY = recall, MEDIUM = application, HARD = analysis/synthesis
- Questions must be relevant to government statistical systems context

Respond with ONLY valid JSON:
{
  "generatedCount": <number>,
  "topicsIdentified": ["<topic 1>", "<topic 2>"],
  "questions": [
    {
      "questionText": "<clear, unambiguous question>",
      "questionType": "MCQ_SINGLE",
      "options": [
        { "id": "A", "text": "<option text>", "isCorrect": false },
        { "id": "B", "text": "<option text>", "isCorrect": true },
        { "id": "C", "text": "<option text>", "isCorrect": false },
        { "id": "D", "text": "<option text>", "isCorrect": false }
      ],
      "correctAnswerExplanation": "<why the correct answer is correct, referencing the document>",
      "difficulty": "${config.difficulty || 'MEDIUM'}",
      "topicName": "<topic within document>",
      "sourceLocation": "<approximate section/paragraph in document>"
    }
  ]
}`,

  // ─── ASSESSMENT QUESTION GENERATION ───────────────────────────────────────
  ASSESSMENT_QUESTIONS: (config) => `
You are an expert competency assessment designer for a government training platform.

Generate ${config.count} assessment questions to evaluate: ${config.skillName}
Level being assessed: ${config.level}
Context: India's Official Statistical System, MoSPI, data management, statistics

Respond with ONLY valid JSON:
{
  "questions": [
    {
      "questionText": "<question>",
      "questionType": "MCQ_SINGLE",
      "options": [
        { "id": "A", "text": "<option>", "isCorrect": false },
        { "id": "B", "text": "<option>", "isCorrect": true },
        { "id": "C", "text": "<option>", "isCorrect": false },
        { "id": "D", "text": "<option>", "isCorrect": false }
      ],
      "correctAnswerExplanation": "<explanation>",
      "difficulty": "<EASY|MEDIUM|HARD>",
      "topicName": "<topic>"
    }
  ]
}`,

  // ─── COMPETENCY PROFILE ANALYSIS ─────────────────────────────────────────
  COMPETENCY_PROFILE: (attemptResults) => `
You are a competency analytics engine for a government training platform.

Analyze these assessment results and compute a structured competency profile.

## Assessment Results
${JSON.stringify(attemptResults, null, 2)}

Respond with ONLY valid JSON:
{
  "overallScore": <0-100>,
  "overallLevel": "<FOUNDATION|BEGINNER|INTERMEDIATE|ADVANCED|EXPERT>",
  "skillLevels": [
    {
      "skillName": "<skill>",
      "score": <0-100>,
      "level": "<level>",
      "confidence": "<LOW|MEDIUM|HIGH>"
    }
  ],
  "strengths": ["<strength 1>", "<strength 2>"],
  "areasForImprovement": ["<area 1>", "<area 2>"],
  "summary": "<plain-language summary of competency profile>"
}`,
};

export default PROMPTS;
