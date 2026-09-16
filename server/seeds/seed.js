/**
 * KarmaSiksha - Development Seed Data
 * Run: npm run seed
 * 
 * Creates sample: 1 admin, 5 learners, domains, competencies, skills, courses, assessments, questions
 */

import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import LearnerProfile from '../models/LearnerProfile.js';
import { Domain, Competency, Skill, Topic, Role } from '../models/CompetencyModels.js';
import { Assessment } from '../models/Assessment.js';
import Question from '../models/Question.js';
import { Quiz } from '../models/Quiz.js';
import { Course } from '../models/Course.js';
import { Notification } from '../models/SystemModels.js';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/karmasiksha';

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log('✅ Connected to MongoDB');

  // Clear existing data
  await Promise.all([
    User.deleteMany({}),
    LearnerProfile.deleteMany({}),
    Domain.deleteMany({}),
    Competency.deleteMany({}),
    Skill.deleteMany({}),
    Topic.deleteMany({}),
    Role.deleteMany({}),
    Assessment.deleteMany({}),
    Question.deleteMany({}),
    Quiz.deleteMany({}),
    Course.deleteMany({}),
    Notification.deleteMany({}),
  ]);
  console.log('🗑️  Cleared existing data');

  // ─── USERS ────────────────────────────────────────────────────────────────
  const adminUser = await User.create({
    name: 'Admin User',
    email: 'admin@karmasiksha.gov.in',
    password: 'Admin@1234',
    mobile: '9876543210',
    organization: 'MoSPI',
    department: 'DIID',
    designation: 'Senior Statistical Officer',
    experienceYears: 15,
    role: 'ADMIN',
    status: 'ACTIVE',
    onboardingCompleted: true,
    lastLogin: new Date(),
  });

  const superAdmin = await User.create({
    name: 'Super Admin',
    email: 'superadmin@karmasiksha.gov.in',
    password: 'SuperAdmin@1234',
    role: 'SUPER_ADMIN',
    organization: 'MoSPI',
    status: 'ACTIVE',
    onboardingCompleted: true,
  });

  const learners = await User.create([
    {
      name: 'Priya Sharma',
      email: 'priya@karmasiksha.gov.in',
      password: 'Learner@1234',
      mobile: '9123456780',
      organization: 'MoSPI',
      department: 'NSO',
      designation: 'Statistical Assistant',
      experienceYears: 3,
      role: 'LEARNER',
      status: 'ACTIVE',
      onboardingCompleted: true,
      lastLogin: new Date(),
    },
    {
      name: 'Rajesh Kumar',
      email: 'rajesh@karmasiksha.gov.in',
      password: 'Learner@1234',
      mobile: '9123456781',
      organization: 'MoSPI',
      department: 'DIID',
      designation: 'Data Analyst',
      experienceYears: 5,
      role: 'LEARNER',
      status: 'ACTIVE',
      onboardingCompleted: true,
      lastLogin: new Date(Date.now() - 2 * 24 * 3600 * 1000),
    },
    {
      name: 'Ananya Singh',
      email: 'ananya@karmasiksha.gov.in',
      password: 'Learner@1234',
      mobile: '9123456782',
      organization: 'CSO',
      department: 'Prices Division',
      designation: 'Research Officer',
      experienceYears: 7,
      role: 'LEARNER',
      status: 'ACTIVE',
      onboardingCompleted: false,
      lastLogin: new Date(Date.now() - 5 * 24 * 3600 * 1000),
    },
    {
      name: 'Amit Verma',
      email: 'amit@karmasiksha.gov.in',
      password: 'Learner@1234',
      mobile: '9123456783',
      organization: 'MoSPI',
      department: 'Social Statistics',
      designation: 'Deputy Director',
      experienceYears: 12,
      role: 'LEARNER',
      status: 'ACTIVE',
      onboardingCompleted: true,
    },
    {
      name: 'Kavitha Rao',
      email: 'kavitha@karmasiksha.gov.in',
      password: 'Learner@1234',
      mobile: '9123456784',
      organization: 'DES',
      department: 'Economic Statistics',
      designation: 'Statistical Officer',
      experienceYears: 2,
      role: 'LEARNER',
      status: 'ACTIVE',
      onboardingCompleted: true,
    },
  ]);
  console.log(`✅ Created ${learners.length + 2} users`);

  // ─── DOMAINS ──────────────────────────────────────────────────────────────
  const [domainStats, domainIT, domainPM, domainComm] = await Domain.create([
    { name: 'Statistical Sciences', description: 'Core statistical theory, methods, and practice', color: '#2563eb', createdBy: adminUser._id },
    { name: 'Information Technology & Data', description: 'IT, data management, and digital tools for government', color: '#0ea5e9', createdBy: adminUser._id },
    { name: 'Policy & Management', description: 'Policy analysis, governance, and management skills', color: '#10b981', createdBy: adminUser._id },
    { name: 'Communication & Reporting', description: 'Data communication, visualization, and report writing', color: '#f59e0b', createdBy: adminUser._id },
  ]);
  console.log('✅ Created domains');

  // ─── COMPETENCIES ─────────────────────────────────────────────────────────
  const [compStatAnalysis, compSurvey, compDataMgmt, compDataViz, compPolicy] = await Competency.create([
    { name: 'Statistical Analysis', description: 'Ability to apply statistical methods to analyze data', domain: domainStats._id, code: 'SA-001', createdBy: adminUser._id },
    { name: 'Survey Methodology', description: 'Design and execution of statistical surveys', domain: domainStats._id, code: 'SM-001', createdBy: adminUser._id },
    { name: 'Data Management', description: 'Data collection, processing, and quality control', domain: domainIT._id, code: 'DM-001', createdBy: adminUser._id },
    { name: 'Data Visualization', description: 'Creating clear and effective data visualizations', domain: domainComm._id, code: 'DV-001', createdBy: adminUser._id },
    { name: 'Policy Analysis', description: 'Statistical support for policy decisions', domain: domainPM._id, code: 'PA-001', createdBy: adminUser._id },
  ]);
  console.log('✅ Created competencies');

  // ─── SKILLS ───────────────────────────────────────────────────────────────
  const skills = await Skill.create([
    { name: 'Descriptive Statistics', competency: compStatAnalysis._id, domain: domainStats._id, description: 'Mean, median, mode, variance, standard deviation', createdBy: adminUser._id },
    { name: 'Inferential Statistics', competency: compStatAnalysis._id, domain: domainStats._id, description: 'Hypothesis testing, confidence intervals, regression', createdBy: adminUser._id },
    { name: 'R Programming', competency: compDataMgmt._id, domain: domainIT._id, description: 'Statistical computing with R', createdBy: adminUser._id },
    { name: 'Survey Design', competency: compSurvey._id, domain: domainStats._id, description: 'Questionnaire design, sampling methodology', createdBy: adminUser._id },
    { name: 'Data Visualization', competency: compDataViz._id, domain: domainComm._id, description: 'Charts, dashboards, and data storytelling', createdBy: adminUser._id },
    { name: 'Data Quality Management', competency: compDataMgmt._id, domain: domainIT._id, description: 'Data validation, cleaning, and quality assurance', createdBy: adminUser._id },
    { name: 'SPSS', competency: compStatAnalysis._id, domain: domainStats._id, description: 'Statistical analysis using IBM SPSS', createdBy: adminUser._id },
    { name: 'Report Writing', competency: compDataViz._id, domain: domainComm._id, description: 'Writing statistical reports and summaries', createdBy: adminUser._id },
  ]);
  console.log(`✅ Created ${skills.length} skills`);

  const [skillDescStat, skillInfStat, skillR, skillSurvey, skillViz, skillDQ, skillSPSS, skillReport] = skills;

  // ─── ROLE ─────────────────────────────────────────────────────────────────
  const statsOfficerRole = await Role.create({
    name: 'Statistical Officer',
    description: 'Core role for statistical data collection and analysis',
    department: 'NSO / DIID',
    requiredCompetencies: [
      { competency: compStatAnalysis._id, requiredLevel: 'INTERMEDIATE' },
      { competency: compSurvey._id, requiredLevel: 'INTERMEDIATE' },
    ],
    requiredSkills: [
      { skill: skillDescStat._id, requiredLevel: 'INTERMEDIATE' },
      { skill: skillSurvey._id, requiredLevel: 'INTERMEDIATE' },
      { skill: skillViz._id, requiredLevel: 'BEGINNER' },
      { skill: skillR._id, requiredLevel: 'BEGINNER' },
    ],
    createdBy: adminUser._id,
  });

  // ─── LEARNER PROFILES ────────────────────────────────────────────────────
  await LearnerProfile.create([
    {
      user: learners[0]._id,
      role: statsOfficerRole._id,
      skills: [
        { skill: skillDescStat._id, selfAssessedLevel: 'INTERMEDIATE', verifiedLevel: 'INTERMEDIATE' },
        { skill: skillViz._id, selfAssessedLevel: 'BEGINNER', verifiedLevel: 'BEGINNER' },
        { skill: skillReport._id, selfAssessedLevel: 'INTERMEDIATE' },
      ],
      interests: ['Data Analytics', 'Survey Methods', 'Visualization'],
      learningGoals: ['Master R programming', 'Improve survey design skills', 'Learn advanced statistics'],
      overallCompetencyScore: 58,
      preferredLearningDuration: '1hr',
      onboardingStep: 8,
    },
    {
      user: learners[1]._id,
      role: statsOfficerRole._id,
      skills: [
        { skill: skillR._id, selfAssessedLevel: 'INTERMEDIATE', verifiedLevel: 'INTERMEDIATE' },
        { skill: skillDescStat._id, selfAssessedLevel: 'ADVANCED', verifiedLevel: 'ADVANCED' },
        { skill: skillViz._id, selfAssessedLevel: 'INTERMEDIATE' },
      ],
      interests: ['Machine Learning', 'Data Science', 'Python'],
      learningGoals: ['Learn machine learning', 'Master data visualization'],
      overallCompetencyScore: 72,
      preferredLearningDuration: '2hr+',
      onboardingStep: 8,
    },
    {
      user: learners[2]._id,
      interests: ['Price Statistics', 'Economic Indicators'],
      learningGoals: ['Understand CPI methodology', 'Improve report writing'],
      overallCompetencyScore: 0,
      onboardingStep: 2,
    },
    {
      user: learners[3]._id,
      skills: [
        { skill: skillDescStat._id, selfAssessedLevel: 'ADVANCED' },
        { skill: skillInfStat._id, selfAssessedLevel: 'INTERMEDIATE' },
        { skill: skillSPSS._id, selfAssessedLevel: 'ADVANCED' },
        { skill: skillReport._id, selfAssessedLevel: 'ADVANCED' },
      ],
      interests: ['Policy Research', 'Social Statistics'],
      learningGoals: ['Move to data science', 'Learn modern visualization tools'],
      overallCompetencyScore: 81,
      onboardingStep: 8,
    },
    {
      user: learners[4]._id,
      skills: [
        { skill: skillDescStat._id, selfAssessedLevel: 'BEGINNER' },
        { skill: skillReport._id, selfAssessedLevel: 'BEGINNER' },
      ],
      interests: ['Statistics', 'Data Analysis'],
      learningGoals: ['Build statistical foundations', 'Learn data analysis tools'],
      overallCompetencyScore: 34,
      onboardingStep: 8,
    },
  ]);
  console.log('✅ Created learner profiles');

  // ─── COURSES ──────────────────────────────────────────────────────────────
  const courses = await Course.create([
    {
      title: 'Foundations of Statistical Analysis',
      shortDescription: 'Build a strong foundation in descriptive and inferential statistics.',
      description: 'A comprehensive course covering statistical fundamentals including measures of central tendency, dispersion, probability, hypothesis testing, and regression analysis for government data practitioners.',
      provider: 'KarmaSiksha Academy',
      category: 'Statistics',
      skills: [skillDescStat._id, skillInfStat._id],
      competencies: [compStatAnalysis._id],
      difficulty: 'BEGINNER',
      durationHours: 12,
      learningObjectives: [
        'Understand and apply measures of central tendency and dispersion',
        'Conduct basic hypothesis tests',
        'Interpret regression analysis results',
        'Apply statistical methods to government data contexts',
      ],
      modules: [
        { title: 'Introduction to Statistics', order: 1, duration: 60 },
        { title: 'Descriptive Statistics', order: 2, duration: 120 },
        { title: 'Probability Fundamentals', order: 3, duration: 90 },
        { title: 'Hypothesis Testing', order: 4, duration: 120 },
        { title: 'Correlation and Regression', order: 5, duration: 90 },
      ],
      status: 'PUBLISHED',
      source: 'INTERNAL',
      enrollmentCount: 45,
      completionCount: 28,
      createdBy: adminUser._id,
    },
    {
      title: 'Survey Design and Methodology',
      shortDescription: 'Master the principles of designing effective statistical surveys.',
      description: 'Learn how to design, plan, and execute high-quality statistical surveys for national data collection including questionnaire design, sampling methodology, data collection procedures, and quality control.',
      provider: 'KarmaSiksha Academy',
      category: 'Survey Methods',
      skills: [skillSurvey._id, skillDQ._id],
      competencies: [compSurvey._id],
      difficulty: 'INTERMEDIATE',
      durationHours: 16,
      learningObjectives: [
        'Design effective questionnaires and survey instruments',
        'Select appropriate sampling methodologies',
        'Implement data quality control measures',
        'Manage survey field operations',
      ],
      modules: [
        { title: 'Introduction to Survey Design', order: 1, duration: 90 },
        { title: 'Questionnaire Design', order: 2, duration: 120 },
        { title: 'Sampling Methods', order: 3, duration: 120 },
        { title: 'Data Collection Procedures', order: 4, duration: 90 },
        { title: 'Quality Control in Surveys', order: 5, duration: 90 },
        { title: 'Survey Data Analysis', order: 6, duration: 120 },
      ],
      status: 'PUBLISHED',
      source: 'INTERNAL',
      enrollmentCount: 38,
      completionCount: 19,
      createdBy: adminUser._id,
    },
    {
      title: 'R Programming for Statistical Analysis',
      shortDescription: 'Learn R for statistical analysis and data visualization.',
      description: 'A practical course on using R for statistical analysis in government data contexts. Covers data import, manipulation, statistical tests, and creating publication-quality visualizations.',
      provider: 'KarmaSiksha Academy',
      category: 'Programming',
      skills: [skillR._id, skillViz._id],
      competencies: [compDataMgmt._id, compDataViz._id],
      difficulty: 'INTERMEDIATE',
      durationHours: 20,
      learningObjectives: [
        'Import and manipulate data using R and tidyverse',
        'Conduct statistical analyses in R',
        'Create effective visualizations with ggplot2',
        'Write reproducible reports with R Markdown',
      ],
      modules: [
        { title: 'R Basics and Setup', order: 1, duration: 120 },
        { title: 'Data Import and Manipulation', order: 2, duration: 150 },
        { title: 'Statistical Analysis with R', order: 3, duration: 180 },
        { title: 'Data Visualization with ggplot2', order: 4, duration: 150 },
        { title: 'Reproducible Reports', order: 5, duration: 120 },
      ],
      status: 'PUBLISHED',
      source: 'INTERNAL',
      enrollmentCount: 52,
      completionCount: 31,
      createdBy: adminUser._id,
    },
    {
      title: 'Advanced Data Visualization',
      shortDescription: 'Create compelling visualizations and interactive dashboards.',
      description: 'Learn to create professional, interactive data visualizations and dashboards using modern tools including Power BI, Tableau basics, and R Shiny for government data communication.',
      provider: 'KarmaSiksha Academy',
      category: 'Data Visualization',
      skills: [skillViz._id, skillReport._id],
      competencies: [compDataViz._id],
      difficulty: 'ADVANCED',
      durationHours: 18,
      learningObjectives: [
        'Create interactive dashboards in Power BI',
        'Apply data storytelling principles',
        'Design accessible and inclusive visualizations',
        'Develop government statistical reports',
      ],
      status: 'PUBLISHED',
      source: 'INTERNAL',
      enrollmentCount: 29,
      completionCount: 12,
      createdBy: adminUser._id,
    },
    {
      title: 'Data Quality Management',
      shortDescription: 'Ensure accuracy and reliability of statistical data.',
      description: 'Comprehensive training on data quality management frameworks, validation techniques, and quality control processes for government statistical systems.',
      provider: 'KarmaSiksha Academy',
      category: 'Data Management',
      skills: [skillDQ._id],
      competencies: [compDataMgmt._id],
      difficulty: 'INTERMEDIATE',
      durationHours: 10,
      status: 'PUBLISHED',
      source: 'INTERNAL',
      enrollmentCount: 21,
      completionCount: 14,
      createdBy: adminUser._id,
    },
    {
      title: 'iGOT: Digital Governance Fundamentals',
      shortDescription: '[iGOT Karmayogi] Foundations of digital governance for government officers.',
      description: 'An official iGOT Karmayogi course on digital governance fundamentals. This course is sourced from the iGOT platform and linked via the integration layer.',
      provider: 'iGOT Karmayogi',
      category: 'Governance',
      difficulty: 'BEGINNER',
      durationHours: 8,
      status: 'PUBLISHED',
      source: 'IGOT',
      externalUrl: 'https://www.igot.gov.in',
      igotCourseId: 'igot-dg-001',
      enrollmentCount: 15,
      createdBy: adminUser._id,
    },
  ]);
  console.log(`✅ Created ${courses.length} courses`);

  // ─── QUESTIONS ────────────────────────────────────────────────────────────
  const questions = await Question.create([
    {
      questionText: 'Which measure of central tendency is most affected by extreme values (outliers)?',
      questionType: 'MCQ_SINGLE',
      options: [
        { id: 'A', text: 'Median', isCorrect: false },
        { id: 'B', text: 'Mode', isCorrect: false },
        { id: 'C', text: 'Mean', isCorrect: true },
        { id: 'D', text: 'Quartile', isCorrect: false },
      ],
      correctAnswerExplanation: 'The mean is calculated using all values in the dataset, so extreme values (outliers) significantly pull it in their direction. The median and mode are less sensitive to outliers.',
      skill: skillDescStat._id,
      competency: compStatAnalysis._id,
      topicName: 'Measures of Central Tendency',
      difficulty: 'EASY',
      status: 'PUBLISHED',
      source: 'MANUAL',
      createdBy: adminUser._id,
    },
    {
      questionText: 'What is the primary purpose of a null hypothesis in hypothesis testing?',
      questionType: 'MCQ_SINGLE',
      options: [
        { id: 'A', text: 'To state what the researcher expects to find', isCorrect: false },
        { id: 'B', text: 'To provide a statement that assumes no significant effect or relationship exists', isCorrect: true },
        { id: 'C', text: 'To guarantee a statistically significant result', isCorrect: false },
        { id: 'D', text: 'To define the confidence interval of the test', isCorrect: false },
      ],
      correctAnswerExplanation: 'The null hypothesis (H₀) assumes no significant effect, difference, or relationship. It serves as the baseline assumption that statistical testing attempts to disprove.',
      skill: skillInfStat._id,
      competency: compStatAnalysis._id,
      topicName: 'Hypothesis Testing',
      difficulty: 'MEDIUM',
      status: 'PUBLISHED',
      source: 'MANUAL',
      createdBy: adminUser._id,
    },
    {
      questionText: 'In stratified random sampling, what is the primary benefit over simple random sampling?',
      questionType: 'MCQ_SINGLE',
      options: [
        { id: 'A', text: 'It is always less expensive to implement', isCorrect: false },
        { id: 'B', text: 'It ensures representation of all important subgroups in the population', isCorrect: true },
        { id: 'C', text: 'It eliminates all forms of sampling error', isCorrect: false },
        { id: 'D', text: 'It requires a smaller sample size in all cases', isCorrect: false },
      ],
      correctAnswerExplanation: 'Stratified sampling divides the population into homogeneous strata and samples from each, guaranteeing representation of key subgroups and typically producing more precise estimates.',
      skill: skillSurvey._id,
      competency: compSurvey._id,
      topicName: 'Sampling Methodology',
      difficulty: 'MEDIUM',
      status: 'PUBLISHED',
      source: 'MANUAL',
      createdBy: adminUser._id,
    },
    {
      questionText: 'What does the coefficient of variation (CV) measure?',
      questionType: 'MCQ_SINGLE',
      options: [
        { id: 'A', text: 'The absolute spread of data around the mean', isCorrect: false },
        { id: 'B', text: 'The relative variability of data expressed as a percentage of the mean', isCorrect: true },
        { id: 'C', text: 'The correlation between two variables', isCorrect: false },
        { id: 'D', text: 'The number of standard deviations a data point is from the mean', isCorrect: false },
      ],
      correctAnswerExplanation: 'CV = (Standard Deviation / Mean) × 100. It is useful for comparing variability between datasets with different units or scales.',
      skill: skillDescStat._id,
      competency: compStatAnalysis._id,
      topicName: 'Measures of Dispersion',
      difficulty: 'MEDIUM',
      status: 'PUBLISHED',
      source: 'MANUAL',
      createdBy: adminUser._id,
    },
    {
      questionText: 'A p-value of 0.03 with a significance level (α) of 0.05 means:',
      questionType: 'MCQ_SINGLE',
      options: [
        { id: 'A', text: 'We fail to reject the null hypothesis', isCorrect: false },
        { id: 'B', text: 'We reject the null hypothesis; the result is statistically significant', isCorrect: true },
        { id: 'C', text: 'There is a 3% probability the result is true', isCorrect: false },
        { id: 'D', text: 'The effect size is practically significant', isCorrect: false },
      ],
      correctAnswerExplanation: 'Since p (0.03) < α (0.05), we reject the null hypothesis. The result is statistically significant at the 5% significance level.',
      skill: skillInfStat._id,
      competency: compStatAnalysis._id,
      topicName: 'Hypothesis Testing',
      difficulty: 'MEDIUM',
      status: 'PUBLISHED',
      source: 'MANUAL',
      createdBy: adminUser._id,
    },
    {
      questionText: 'Which type of chart is most appropriate for showing the distribution of a continuous variable?',
      questionType: 'MCQ_SINGLE',
      options: [
        { id: 'A', text: 'Pie chart', isCorrect: false },
        { id: 'B', text: 'Histogram', isCorrect: true },
        { id: 'C', text: 'Line graph', isCorrect: false },
        { id: 'D', text: 'Scatter plot', isCorrect: false },
      ],
      correctAnswerExplanation: 'A histogram displays the frequency distribution of continuous data by dividing it into bins, making it ideal for understanding data distribution, skewness, and identifying outliers.',
      skill: skillViz._id,
      competency: compDataViz._id,
      topicName: 'Chart Selection',
      difficulty: 'EASY',
      status: 'PUBLISHED',
      source: 'MANUAL',
      createdBy: adminUser._id,
    },
    {
      questionText: 'What is non-sampling error in statistical surveys?',
      questionType: 'MCQ_SINGLE',
      options: [
        { id: 'A', text: 'Errors arising from selecting an unrepresentative sample', isCorrect: false },
        { id: 'B', text: 'Errors that would occur even if the entire population were surveyed', isCorrect: true },
        { id: 'C', text: 'Mathematical errors in sample size calculation', isCorrect: false },
        { id: 'D', text: 'Errors caused by using the wrong sampling frame', isCorrect: false },
      ],
      correctAnswerExplanation: 'Non-sampling errors (measurement errors, coverage errors, processing errors) can occur in any survey regardless of sample size, including in a complete census.',
      skill: skillSurvey._id,
      competency: compSurvey._id,
      topicName: 'Survey Quality',
      difficulty: 'MEDIUM',
      status: 'PUBLISHED',
      source: 'MANUAL',
      createdBy: adminUser._id,
    },
    {
      questionText: 'In R, which function is used to calculate the mean of a numeric vector x?',
      questionType: 'MCQ_SINGLE',
      options: [
        { id: 'A', text: 'average(x)', isCorrect: false },
        { id: 'B', text: 'mean(x)', isCorrect: true },
        { id: 'C', text: 'calc.mean(x)', isCorrect: false },
        { id: 'D', text: 'avg(x)', isCorrect: false },
      ],
      correctAnswerExplanation: 'In R, the mean() function calculates the arithmetic mean of a numeric vector. E.g., mean(c(1,2,3,4,5)) returns 3.',
      skill: skillR._id,
      competency: compDataMgmt._id,
      topicName: 'R Basics',
      difficulty: 'EASY',
      status: 'PUBLISHED',
      source: 'MANUAL',
      createdBy: adminUser._id,
    },
    // AI-generated question (still pending review)
    {
      questionText: 'What is the Consumer Price Index primarily used to measure?',
      questionType: 'MCQ_SINGLE',
      options: [
        { id: 'A', text: 'Industrial production output', isCorrect: false },
        { id: 'B', text: 'Rate of inflation as experienced by households', isCorrect: true },
        { id: 'C', text: 'Foreign exchange rate fluctuations', isCorrect: false },
        { id: 'D', text: 'Government fiscal deficit trends', isCorrect: false },
      ],
      correctAnswerExplanation: 'CPI measures the average change over time in the prices paid by consumers for a representative basket of goods and services.',
      topicName: 'Price Statistics',
      difficulty: 'EASY',
      status: 'AI_GENERATED',
      source: 'AI_GENERATED',
      createdBy: adminUser._id,
    },
    {
      questionText: 'Simple random sampling ensures that every member of the population has an equal probability of being selected.',
      questionType: 'TRUE_FALSE',
      options: [
        { id: 'A', text: 'True', isCorrect: true },
        { id: 'B', text: 'False', isCorrect: false },
      ],
      correctAnswerExplanation: 'This is the defining property of simple random sampling — every member has an equal and independent probability of being included in the sample.',
      skill: skillSurvey._id,
      competency: compSurvey._id,
      topicName: 'Sampling Basics',
      difficulty: 'EASY',
      status: 'APPROVED',
      source: 'MANUAL',
      createdBy: adminUser._id,
    },
  ]);
  console.log(`✅ Created ${questions.length} questions`);

  // ─── ASSESSMENT ───────────────────────────────────────────────────────────
  const publishedQuestions = questions.filter(q => q.status === 'PUBLISHED');
  const assessment = await Assessment.create({
    title: 'Statistical Fundamentals Assessment',
    description: 'Assess your knowledge of core statistical concepts including descriptive statistics, hypothesis testing, and survey methodology.',
    type: 'COMPETENCY',
    skills: [skillDescStat._id, skillInfStat._id, skillSurvey._id],
    competencies: [compStatAnalysis._id, compSurvey._id],
    questions: publishedQuestions.map(q => q._id),
    timeLimit: 30,
    passingScore: 60,
    attemptsAllowed: 3,
    difficulty: 'MIXED',
    instructions: 'Answer all questions carefully. You have 30 minutes to complete this assessment. Your results will update your competency profile.',
    status: 'PUBLISHED',
    createdBy: adminUser._id,
  });
  console.log('✅ Created assessment');

  // ─── QUIZ ─────────────────────────────────────────────────────────────────
  const quiz = await Quiz.create({
    title: 'Statistics Basics Quiz',
    description: 'Quick quiz to test your understanding of basic statistical concepts.',
    course: courses[0]._id,
    skills: [skillDescStat._id],
    competencies: [compStatAnalysis._id],
    questions: publishedQuestions.filter(q => q.skill?.toString() === skillDescStat._id.toString()).map(q => q._id),
    difficulty: 'EASY',
    timeLimit: 15,
    passingScore: 70,
    attemptsAllowed: 5,
    showExplanations: true,
    status: 'PUBLISHED',
    createdBy: adminUser._id,
  });
  console.log('✅ Created quiz');

  // ─── NOTIFICATIONS ────────────────────────────────────────────────────────
  await Notification.create([
    {
      user: learners[0]._id,
      title: 'Welcome to KarmaSiksha!',
      message: 'Your account is ready. Complete your competency assessment to get personalized recommendations.',
      type: 'SYSTEM',
      priority: 'HIGH',
    },
    {
      user: learners[0]._id,
      title: 'New Course Available',
      message: 'Advanced Data Visualization course is now available. Based on your profile, this is recommended for you.',
      type: 'COURSE',
      link: `/courses/${courses[3]._id}`,
    },
    {
      user: learners[1]._id,
      title: 'Welcome to KarmaSiksha!',
      message: 'Complete your competency assessment to identify your skill gaps and get a personalized learning path.',
      type: 'SYSTEM',
      priority: 'HIGH',
    },
  ]);
  console.log('✅ Created notifications');

  console.log('\n🌱 Seed complete!\n');
  console.log('═══════════════════════════════════════');
  console.log('  TEST CREDENTIALS');
  console.log('═══════════════════════════════════════');
  console.log('  Admin:      admin@karmasiksha.gov.in / Admin@1234');
  console.log('  SuperAdmin: superadmin@karmasiksha.gov.in / SuperAdmin@1234');
  console.log('  Learner 1:  priya@karmasiksha.gov.in / Learner@1234');
  console.log('  Learner 2:  rajesh@karmasiksha.gov.in / Learner@1234');
  console.log('  Learner 3:  ananya@karmasiksha.gov.in / Learner@1234 (onboarding incomplete)');
  console.log('═══════════════════════════════════════\n');

  await mongoose.disconnect();
}

seed().catch(err => {
  console.error('Seed failed:', err);
  process.exit(1);
});
