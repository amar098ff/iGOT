/**
 * Provider-independent AI Service Router
 * Routes AI calls to Gemini, OpenAI, or Mock based on AI_PROVIDER env variable.
 * 
 * NEVER import this in React components.
 * All AI calls must go through this service.
 */

import { parseAIJSON } from './aiValidator.js';

const PROVIDER = process.env.AI_PROVIDER || 'mock';
const TIMEOUT_MS = 30000;

// ─── PROVIDER: GEMINI ─────────────────────────────────────────────────────────
async function callGemini(prompt) {
  const { GoogleGenerativeAI } = await import('@google/generative-ai').catch(() => {
    throw new Error('Google Generative AI package not installed. Run: npm install @google/generative-ai');
  });
  
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: process.env.AI_MODEL_GEMINI || 'gemini-1.5-flash' });
  
  const result = await model.generateContent(prompt);
  return result.response.text();
}

// ─── PROVIDER: OPENAI ─────────────────────────────────────────────────────────
async function callOpenAI(prompt) {
  const OpenAI = (await import('openai').catch(() => {
    throw new Error('OpenAI package not installed. Run: npm install openai');
  })).default;

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const response = await openai.chat.completions.create({
    model: process.env.AI_MODEL_OPENAI || 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
    response_format: { type: 'json_object' },
    temperature: 0.3,
  });
  return response.choices[0].message.content;
}

// ─── PROVIDER: MOCK ───────────────────────────────────────────────────────────
async function callMock(prompt) {
  // Simulate network delay
  await new Promise(r => setTimeout(r, 800 + Math.random() * 500));
  
  // Detect prompt type and return appropriate mock
  if (prompt.includes('skill gaps') || prompt.includes('skillGaps')) {
    return JSON.stringify({
      overallGapScore: 42,
      summary: "The learner demonstrates solid foundational knowledge in statistical concepts with notable gaps in advanced data visualization and modern analytical tools. Priority focus areas include data analytics tools and survey methodology at the advanced level.",
      priorityAreas: ["Data Analytics & Visualization", "Survey Methodology", "Statistical Computing"],
      skillGaps: [
        {
          skillName: "Data Visualization",
          currentLevel: "INTERMEDIATE",
          requiredLevel: "ADVANCED",
          gapSeverity: "MODERATE",
          gapScore: 1,
          priority: "HIGH",
          explanation: "Current visualization skills are at intermediate level, but the role requires advanced proficiency including interactive dashboards and geospatial analysis.",
          evidence: "Self-assessment at Intermediate; assessment score 58% on visualization questions",
          recommendedAction: "Complete the Advanced Data Visualization course focusing on Tableau and Power BI"
        },
        {
          skillName: "Statistical Analysis",
          currentLevel: "BEGINNER",
          requiredLevel: "INTERMEDIATE",
          gapSeverity: "HIGH",
          gapScore: 2,
          priority: "CRITICAL",
          explanation: "Statistical analysis skills require significant development to meet role requirements for conducting independent data analysis.",
          evidence: "Assessment score 41% on statistical analysis section",
          recommendedAction: "Start with Descriptive Statistics fundamentals, then progress to inferential statistics"
        },
        {
          skillName: "Survey Design",
          currentLevel: "FOUNDATION",
          requiredLevel: "INTERMEDIATE",
          gapSeverity: "HIGH",
          gapScore: 2,
          priority: "HIGH",
          explanation: "Survey design skills are at foundation level and need development to support field data collection activities.",
          evidence: "Self-assessment at Foundation; no prior survey design experience indicated",
          recommendedAction: "Complete the Survey Methodology Essentials course"
        },
        {
          skillName: "R Programming",
          currentLevel: "BEGINNER",
          requiredLevel: "BEGINNER",
          gapSeverity: "NONE",
          gapScore: 0,
          priority: "LOW",
          explanation: "R programming meets current role requirements. Consider advancing to intermediate level for career growth.",
          evidence: "Assessment score 72% on R programming questions",
          recommendedAction: "Optional: Explore advanced R packages for statistical computing"
        }
      ],
      strengths: ["Data Collection Fundamentals", "Report Writing", "Excel Proficiency"],
      immediateRecommendations: [
        "Enroll in Statistical Analysis Intermediate course immediately",
        "Complete Survey Design Essentials within 2 weeks",
        "Practice data visualization with provided datasets"
      ]
    });
  }

  if (prompt.includes('recommendations') || prompt.includes('learning recommendations')) {
    return JSON.stringify({
      recommendations: [
        {
          courseId: null,
          reason: "Directly addresses your critical gap in statistical analysis identified in your assessment",
          priority: "HIGH",
          addressesSkillGap: "Statistical Analysis",
          estimatedImpact: "Move from Beginner to Intermediate in Statistical Analysis within 4 weeks",
          recommendationType: "SKILL_GAP"
        },
        {
          courseId: null,
          reason: "Builds on your existing data collection knowledge and bridges your survey design gap",
          priority: "HIGH",
          addressesSkillGap: "Survey Design",
          estimatedImpact: "Develop foundational survey design competency for field work",
          recommendationType: "SKILL_GAP"
        },
        {
          courseId: null,
          reason: "Aligns with your stated interest in data analytics and role requirements",
          priority: "MEDIUM",
          addressesSkillGap: "Data Visualization",
          estimatedImpact: "Develop advanced visualization skills for reporting and dashboards",
          recommendationType: "ROLE_REQUIREMENT"
        }
      ],
      learningPathSummary: "Your personalized learning path focuses on building statistical analysis and survey methodology skills first, followed by advanced visualization techniques. This sequence ensures you develop core competencies required for your role before advancing to specialized areas.",
      weeklyGoalSuggestion: "Spend 3 hours this week on Statistical Analysis fundamentals — complete Module 1 and attempt the practice quiz"
    });
  }

  if (prompt.includes('Generate') && prompt.includes('questions')) {
    return JSON.stringify({
      generatedCount: 5,
      topicsIdentified: ["Statistical Surveys", "Data Collection Methods", "Quality Control"],
      questions: [
        {
          questionText: "Which of the following is the primary purpose of a pilot survey in the context of national data collection?",
          questionType: "MCQ_SINGLE",
          options: [
            { id: "A", text: "To collect final data for publication", isCorrect: false },
            { id: "B", text: "To test and refine survey instruments before the main survey", isCorrect: true },
            { id: "C", text: "To train enumerators on data entry software", isCorrect: false },
            { id: "D", text: "To establish a sampling frame for stratified sampling", isCorrect: false }
          ],
          correctAnswerExplanation: "A pilot survey tests the survey design, questionnaire clarity, and operational procedures before the main data collection exercise, allowing for refinements that improve data quality.",
          difficulty: "MEDIUM",
          topicName: "Survey Methodology",
          sourceLocation: "Section 2: Survey Design Principles"
        },
        {
          questionText: "What does the term 'non-sampling error' refer to in statistical surveys?",
          questionType: "MCQ_SINGLE",
          options: [
            { id: "A", text: "Errors arising from selecting an unrepresentative sample", isCorrect: false },
            { id: "B", text: "Errors that would occur even if the entire population were surveyed", isCorrect: true },
            { id: "C", text: "Errors caused by using an incorrect sampling formula", isCorrect: false },
            { id: "D", text: "Errors in calculating confidence intervals", isCorrect: false }
          ],
          correctAnswerExplanation: "Non-sampling errors include measurement errors, coverage errors, and processing errors that can occur regardless of sample size, including in a complete census.",
          difficulty: "MEDIUM",
          topicName: "Error Types in Surveys",
          sourceLocation: "Section 3: Survey Quality"
        },
        {
          questionText: "In stratified random sampling, what is the main advantage over simple random sampling?",
          questionType: "MCQ_SINGLE",
          options: [
            { id: "A", text: "It is simpler to implement in field conditions", isCorrect: false },
            { id: "B", text: "It always produces a smaller sample size", isCorrect: false },
            { id: "C", text: "It ensures representation of all important subgroups in the population", isCorrect: true },
            { id: "D", text: "It eliminates the need for a sampling frame", isCorrect: false }
          ],
          correctAnswerExplanation: "Stratified sampling divides the population into homogeneous groups (strata) and samples from each, ensuring all key subgroups are represented and typically producing more precise estimates.",
          difficulty: "MEDIUM",
          topicName: "Sampling Methods",
          sourceLocation: "Section 4: Sampling Techniques"
        },
        {
          questionText: "The Consumer Price Index (CPI) is primarily used to measure:",
          questionType: "MCQ_SINGLE",
          options: [
            { id: "A", text: "Changes in the industrial production output", isCorrect: false },
            { id: "B", text: "The rate of inflation as experienced by households", isCorrect: true },
            { id: "C", text: "Foreign exchange rate fluctuations", isCorrect: false },
            { id: "D", text: "Government fiscal deficit trends", isCorrect: false }
          ],
          correctAnswerExplanation: "CPI measures the average change over time in the prices paid by consumers for a representative basket of goods and services, serving as the primary indicator of consumer inflation.",
          difficulty: "EASY",
          topicName: "Price Statistics",
          sourceLocation: "Section 5: Key Economic Indicators"
        },
        {
          questionText: "Which statistical measure is most appropriate for describing the central tendency of a highly skewed income distribution?",
          questionType: "MCQ_SINGLE",
          options: [
            { id: "A", text: "Mean", isCorrect: false },
            { id: "B", text: "Mode", isCorrect: false },
            { id: "C", text: "Median", isCorrect: true },
            { id: "D", text: "Standard deviation", isCorrect: false }
          ],
          correctAnswerExplanation: "The median is preferred for skewed distributions because it is not affected by extreme values (outliers), making it a more representative measure of central tendency for income data.",
          difficulty: "MEDIUM",
          topicName: "Descriptive Statistics",
          sourceLocation: "Section 1: Statistical Fundamentals"
        }
      ]
    });
  }

  if (prompt.includes('competency profile') || prompt.includes('overallLevel')) {
    return JSON.stringify({
      overallScore: 64,
      overallLevel: "INTERMEDIATE",
      skillLevels: [
        { skillName: "Statistical Analysis", score: 58, level: "BEGINNER", confidence: "HIGH" },
        { skillName: "Data Visualization", score: 71, level: "INTERMEDIATE", confidence: "HIGH" },
        { skillName: "Survey Design", score: 45, level: "FOUNDATION", confidence: "MEDIUM" },
        { skillName: "R Programming", score: 72, level: "BEGINNER", confidence: "HIGH" },
        { skillName: "Data Collection", score: 80, level: "INTERMEDIATE", confidence: "HIGH" },
      ],
      strengths: ["Data Collection", "R Programming basics", "Report Interpretation"],
      areasForImprovement: ["Statistical Analysis", "Survey Design", "Advanced Visualization"],
      summary: "The learner demonstrates solid foundational competency with particular strength in data collection practices. Statistical analysis and survey design represent key development areas that, when addressed, will significantly enhance overall performance."
    });
  }

  // Generic fallback
  return JSON.stringify({ message: "AI mock response", status: "mock" });
}

// ─── MAIN CALL FUNCTION ───────────────────────────────────────────────────────
export async function callAI(prompt) {
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('AI request timed out')), TIMEOUT_MS)
  );

  let aiCallPromise;
  switch (PROVIDER) {
    case 'gemini':
      aiCallPromise = callGemini(prompt);
      break;
    case 'openai':
      aiCallPromise = callOpenAI(prompt);
      break;
    case 'mock':
    default:
      aiCallPromise = callMock(prompt);
      break;
  }

  try {
    const rawResponse = await Promise.race([aiCallPromise, timeoutPromise]);
    const { data, error } = parseAIJSON(rawResponse);
    if (error) throw new Error(error);
    return data;
  } catch (error) {
    if (error.message.includes('timed out')) {
      throw new Error('AI service timed out. Please try again.');
    }
    if (error.message.includes('rate limit') || error.status === 429) {
      throw new Error('AI service rate limit exceeded. Please try again in a moment.');
    }
    throw error;
  }
}

export const AI_PROVIDER = PROVIDER;
