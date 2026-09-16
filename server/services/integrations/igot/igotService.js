/**
 * iGOT / Karmayogi Integration Abstraction
 * 
 * When IGOT_ENABLED=true and IGOT_API_KEY is set, real API calls are made.
 * Otherwise, clearly-labeled mock data is returned.
 * 
 * The recommendation engine consumes this service transparently —
 * no changes needed when real credentials become available.
 */

const IGOT_BASE_URL = process.env.IGOT_API_BASE_URL || 'https://api.igot.gov.in/api';
const IGOT_ENABLED = process.env.IGOT_ENABLED === 'true';

// Mock iGOT courses for development
const MOCK_IGOT_COURSES = [
  {
    id: 'igot-001',
    title: 'Fundamentals of Statistical Analysis',
    description: 'An introductory course covering descriptive and inferential statistics for government officials.',
    provider: 'iGOT Karmayogi',
    difficulty: 'BEGINNER',
    durationHours: 8,
    language: 'English',
    skills: ['Statistical Analysis', 'Data Interpretation'],
    url: 'https://www.igot.gov.in',
    source: 'IGOT',
    isMock: true,
  },
  {
    id: 'igot-002',
    title: 'Data-Driven Governance',
    description: 'Learn how to use data effectively for policy making and public administration.',
    provider: 'iGOT Karmayogi',
    difficulty: 'INTERMEDIATE',
    durationHours: 12,
    language: 'English',
    skills: ['Data Analysis', 'Policy Research'],
    url: 'https://www.igot.gov.in',
    source: 'IGOT',
    isMock: true,
  },
  {
    id: 'igot-003',
    title: 'National Sample Survey Methodology',
    description: 'Comprehensive training on NSS survey design, data collection, and quality control.',
    provider: 'iGOT Karmayogi',
    difficulty: 'INTERMEDIATE',
    durationHours: 16,
    language: 'English',
    skills: ['Survey Design', 'Field Data Collection'],
    url: 'https://www.igot.gov.in',
    source: 'IGOT',
    isMock: true,
  },
  {
    id: 'igot-004',
    title: 'Introduction to R for Government Data',
    description: 'Practical R programming course focused on government data analysis use cases.',
    provider: 'iGOT Karmayogi',
    difficulty: 'BEGINNER',
    durationHours: 10,
    language: 'English',
    skills: ['R Programming', 'Statistical Computing'],
    url: 'https://www.igot.gov.in',
    source: 'IGOT',
    isMock: true,
  },
];

async function searchCoursesReal(query, filters) {
  const response = await fetch(`${IGOT_BASE_URL}/courses/search?q=${encodeURIComponent(query)}`, {
    headers: {
      'Authorization': `Bearer ${process.env.IGOT_API_KEY}`,
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) throw new Error(`iGOT API error: ${response.status}`);
  const data = await response.json();
  return data.courses || [];
}

export async function searchCourses(query = '', filters = {}) {
  if (!IGOT_ENABLED) {
    // Return mock data with clear labeling
    return MOCK_IGOT_COURSES.filter(c =>
      !query || c.title.toLowerCase().includes(query.toLowerCase())
    );
  }
  try {
    return await searchCoursesReal(query, filters);
  } catch (error) {
    console.warn('[iGOT] Real API failed, falling back to mock:', error.message);
    return MOCK_IGOT_COURSES;
  }
}

export async function getCourseById(igotCourseId) {
  if (!IGOT_ENABLED) {
    return MOCK_IGOT_COURSES.find(c => c.id === igotCourseId) || null;
  }
  try {
    const response = await fetch(`${IGOT_BASE_URL}/courses/${igotCourseId}`, {
      headers: { 'Authorization': `Bearer ${process.env.IGOT_API_KEY}` },
    });
    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
}

export const isIGOTEnabled = () => IGOT_ENABLED;
export const getMockCourses = () => MOCK_IGOT_COURSES;
