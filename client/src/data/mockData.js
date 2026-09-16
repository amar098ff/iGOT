// ── EMPLOYEE PROFILE ─────────────────────────────────────────────────────────
export const employee = {
  id: 'EMP-2024-04821',
  name: 'Rahul Sharma',
  nameHindi: 'राहुल शर्मा',
  role: 'Statistical Officer (Grade B)',
  department: 'Department of Statistics & Programme Implementation',
  ministry: 'Ministry of Statistics & Programme Implementation',
  station: 'New Delhi',
  igotId: 'IGOT-NIC-20240481',
  igotStatus: 'connected',
  joinDate: '2019-08-15',
  avatar: null,
  overallCompetency: 72,
  lastAssessment: '2026-08-28',
  nextAssessmentDue: '2026-10-15',
};

// ── COMPETENCY DATA ───────────────────────────────────────────────────────────
export const competencies = [
  {
    id: 'c1',
    name: 'Statistical Analysis',
    current: 81,
    required: 85,
    status: 'developing',   // achieved | developing | gap
    trend: +6,
    lastUpdated: '2026-08-28',
  },
  {
    id: 'c2',
    name: 'Data Visualization',
    current: 58,
    required: 70,
    status: 'gap',
    trend: +4,
    lastUpdated: '2026-08-28',
  },
  {
    id: 'c3',
    name: 'Python for Data Analysis',
    current: 43,
    required: 75,
    status: 'gap',
    trend: +8,
    lastUpdated: '2026-08-28',
  },
  {
    id: 'c4',
    name: 'Communication & Reporting',
    current: 86,
    required: 80,
    status: 'achieved',
    trend: +3,
    lastUpdated: '2026-08-28',
  },
  {
    id: 'c5',
    name: 'Survey Methodology',
    current: 78,
    required: 80,
    status: 'developing',
    trend: +5,
    lastUpdated: '2026-08-28',
  },
  {
    id: 'c6',
    name: 'Data Quality Management',
    current: 69,
    required: 75,
    status: 'developing',
    trend: +2,
    lastUpdated: '2026-08-28',
  },
];

// Radar data format for Recharts
export const radarData = competencies.map(c => ({
  subject: c.name.split(' ').slice(0, 2).join(' '),
  current: c.current,
  required: c.required,
  fullName: c.name,
}));

// ── SKILL GAPS ────────────────────────────────────────────────────────────────
export const skillGaps = [
  {
    id: 'sg1',
    skill: 'Python for Data Analysis',
    current: 43,
    required: 75,
    gap: 32,
    severity: 'high',
    reason: 'This competency is mandatory for your current role as Statistical Officer. Advanced Python skills are required for automated data processing and analysis pipelines.',
    recommendedCourses: 2,
    estimatedWeeks: 6,
  },
  {
    id: 'sg2',
    skill: 'Data Visualization',
    current: 58,
    required: 70,
    gap: 12,
    severity: 'medium',
    reason: 'Effective data visualization is essential for presenting statistical findings to policy makers and senior officials in your department.',
    recommendedCourses: 1,
    estimatedWeeks: 3,
  },
];

// ── AI INSIGHT ────────────────────────────────────────────────────────────────
export const aiInsight = {
  summary: 'Your assessment indicates that your understanding of statistical concepts is strong, with above-average performance in Communication and Statistical Analysis. However, practical application of Python-based data analysis and interactive data visualization require focused development to meet the requirements of your role.',
  strengths: ['Statistical Analysis', 'Communication & Reporting'],
  priorityGaps: ['Python for Data Analysis', 'Data Visualization'],
  overallStatus: 'developing',
  recommendation: 'Prioritize completing the iGOT Python course within the next 6 weeks to close your most significant skill gap.',
  generatedOn: '2026-09-15',
};

// ── LEARNING RECOMMENDATIONS ──────────────────────────────────────────────────
export const recommendations = [
  {
    id: 'r1',
    title: 'Python for Government Data Analysis',
    provider: 'iGOT Karmayogi',
    providerType: 'igot',
    competencies: ['Python for Data Analysis', 'Statistical Analysis'],
    duration: '4 Hours',
    difficulty: 'Intermediate',
    enrolled: false,
    rating: 4.6,
    completions: 1240,
    thumbnail: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=400&q=80',
    url: '#',
    priority: 'high',
  },
  {
    id: 'r2',
    title: 'Data Visualization with Government Datasets',
    provider: 'TPAC',
    providerType: 'tpac',
    competencies: ['Data Visualization', 'Communication'],
    duration: '3 Hours',
    difficulty: 'Beginner',
    enrolled: false,
    rating: 4.4,
    completions: 890,
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80',
    url: '#',
    priority: 'medium',
  },
  {
    id: 'r3',
    title: 'Advanced Survey Methodology for NSS Officers',
    provider: 'iGOT Karmayogi',
    providerType: 'igot',
    competencies: ['Survey Methodology', 'Statistical Analysis'],
    duration: '6 Hours',
    difficulty: 'Advanced',
    enrolled: true,
    rating: 4.8,
    completions: 560,
    thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&q=80',
    url: '#',
    priority: 'low',
  },
];

// ── iGOT STATUS ───────────────────────────────────────────────────────────────
export const igotData = {
  connected: true,
  accountId: 'IGOT-NIC-20240481',
  lastSync: '2026-09-15T09:30:00',
  coursesEnrolled: 6,
  coursesCompleted: 4,
  certificates: 3,
  hoursLearned: 28,
  currentCourse: {
    title: 'Advanced Survey Methodology for NSS Officers',
    progress: 65,
    provider: 'iGOT Karmayogi',
  },
};

// ── GROWTH HISTORY ────────────────────────────────────────────────────────────
export const growthHistory = [
  { month: 'Jan 2026', score: 54 },
  { month: 'Mar 2026', score: 59 },
  { month: 'May 2026', score: 63 },
  { month: 'Jun 2026', score: 66 },
  { month: 'Jul 2026', score: 69 },
  { month: 'Aug 2026', score: 72 },
];

// ── ASSESSMENT ────────────────────────────────────────────────────────────────
export const upcomingAssessment = {
  id: 'a1',
  title: 'Data Analysis Competency Assessment',
  description: 'Evaluates your proficiency in statistical methods, data interpretation, and data quality management.',
  questions: 20,
  duration: 15,
  difficulty: 'Intermediate',
  competencies: ['Statistical Analysis', 'Data Quality Management'],
  status: 'pending',
  dueDate: '2026-10-15',
};

export const assessmentQuestions = [
  {
    id: 1,
    text: 'Which of the following is the most appropriate measure of central tendency for a skewed distribution of household income data?',
    options: [
      { id: 'A', text: 'Mean' },
      { id: 'B', text: 'Median' },
      { id: 'C', text: 'Mode' },
      { id: 'D', text: 'Standard Deviation' },
    ],
    correct: 'B',
    explanation: 'The median is preferred for skewed distributions as it is not affected by extreme values.',
    competency: 'Statistical Analysis',
    difficulty: 'Easy',
  },
  {
    id: 2,
    text: 'In the context of National Sample Survey (NSS), what does "stratified random sampling" primarily ensure?',
    options: [
      { id: 'A', text: 'Every household has an equal probability of selection' },
      { id: 'B', text: 'Important population subgroups are adequately represented' },
      { id: 'C', text: 'The sample size is minimized' },
      { id: 'D', text: 'Non-sampling errors are eliminated' },
    ],
    correct: 'B',
    explanation: 'Stratified sampling ensures representation of key subgroups by dividing the population into strata.',
    competency: 'Survey Methodology',
    difficulty: 'Medium',
  },
  {
    id: 3,
    text: 'A p-value of 0.02 at a significance level (α) of 0.05 indicates:',
    options: [
      { id: 'A', text: 'Fail to reject the null hypothesis' },
      { id: 'B', text: 'Reject the null hypothesis; result is statistically significant' },
      { id: 'C', text: 'The result has a 2% probability of being true' },
      { id: 'D', text: 'The effect is practically significant' },
    ],
    correct: 'B',
    explanation: 'Since p (0.02) < α (0.05), we reject the null hypothesis.',
    competency: 'Statistical Analysis',
    difficulty: 'Medium',
  },
  {
    id: 4,
    text: 'Which type of data quality issue occurs when survey respondents provide inaccurate information?',
    options: [
      { id: 'A', text: 'Coverage error' },
      { id: 'B', text: 'Sampling error' },
      { id: 'C', text: 'Measurement error' },
      { id: 'D', text: 'Processing error' },
    ],
    correct: 'C',
    explanation: 'Measurement error occurs when respondents provide inaccurate or incorrect information.',
    competency: 'Data Quality Management',
    difficulty: 'Medium',
  },
  {
    id: 5,
    text: 'The Consumer Price Index (CPI) primarily measures:',
    options: [
      { id: 'A', text: 'Industrial production output' },
      { id: 'B', text: 'Household income levels' },
      { id: 'C', text: 'Changes in prices of goods and services consumed by households' },
      { id: 'D', text: 'GDP growth rate' },
    ],
    correct: 'C',
    explanation: 'CPI measures the average change in prices of a representative basket of goods and services.',
    competency: 'Statistical Analysis',
    difficulty: 'Easy',
  },
];

// ── CERTIFICATES ──────────────────────────────────────────────────────────────
export const certificates = [
  {
    id: 'cert-001',
    course: 'Foundations of Official Statistics',
    provider: 'iGOT Karmayogi',
    completedDate: '2026-07-12',
    certificateId: 'IGOT-CERT-2026-004821',
    credits: 4,
    competency: 'Statistical Analysis',
    verifyUrl: '#',
  },
  {
    id: 'cert-002',
    course: 'Data Ethics and Privacy in Government',
    provider: 'iGOT Karmayogi',
    completedDate: '2026-05-28',
    certificateId: 'IGOT-CERT-2026-003199',
    credits: 2,
    competency: 'Data Quality Management',
    verifyUrl: '#',
  },
  {
    id: 'cert-003',
    course: 'Effective Government Communication',
    provider: 'TPAC',
    completedDate: '2026-03-14',
    certificateId: 'TPAC-CERT-2026-00881',
    credits: 3,
    competency: 'Communication & Reporting',
    verifyUrl: '#',
  },
];

// ── NOTIFICATIONS ─────────────────────────────────────────────────────────────
export const notifications = [
  { id: 'n1', title: 'Assessment Due Soon', message: 'Data Analysis Assessment is due on 15 October 2026.', type: 'warning', read: false, time: '2 hours ago' },
  { id: 'n2', title: 'Competency Profile Updated', message: 'Your competency profile was updated after your last assessment.', type: 'info', read: false, time: '1 day ago' },
  { id: 'n3', title: 'New Course Recommended', message: 'Python for Government Data Analysis has been added to your learning plan.', type: 'info', read: true, time: '3 days ago' },
  { id: 'n4', title: 'Certificate Issued', message: 'Your certificate for Foundations of Official Statistics is now available.', type: 'success', read: true, time: '1 week ago' },
];

// ── PUBLIC SERVICE IMAGES ─────────────────────────────────────────────────────
export const serviceImages = [
  {
    url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    caption: 'Data-driven governance for better public service',
  },
  {
    url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
    caption: 'Building competencies for the modern civil service',
  },
  {
    url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
    caption: 'Collaborative learning for effective public administration',
  },
];
