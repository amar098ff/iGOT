import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
});

// Request interceptor: attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('ks_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('ks_token');
      localStorage.removeItem('ks_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;

// ─── AUTH ─────────────────────────────────────────────────────────────────────
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
  saveOnboardingStep: (step, data) => api.put('/auth/onboarding', { step, data }),
  completeOnboarding: () => api.post('/auth/onboarding/complete'),
};

// ─── USERS ─────────────────────────────────────────────────────────────────────
export const usersAPI = {
  getAll: (params) => api.get('/users', { params }),
  getById: (id) => api.get(`/users/${id}`),
  update: (id, data) => api.put(`/users/${id}`, data),
  updateStatus: (id, status) => api.patch(`/users/${id}/status`, { status }),
  getMyProfile: () => api.get('/users/me/profile'),
  updateMyProfile: (data) => api.put('/users/me/profile', data),
  getDashboard: () => api.get('/users/me/dashboard'),
};

// ─── COMPETENCY FRAMEWORK ────────────────────────────────────────────────────
export const frameworkAPI = {
  getTree: () => api.get('/framework/tree'),
  getDomains: () => api.get('/framework/domains'),
  createDomain: (data) => api.post('/framework/domains', data),
  updateDomain: (id, data) => api.put(`/framework/domains/${id}`, data),
  deleteDomain: (id) => api.delete(`/framework/domains/${id}`),
  getCompetencies: (params) => api.get('/framework/competencies', { params }),
  createCompetency: (data) => api.post('/framework/competencies', data),
  updateCompetency: (id, data) => api.put(`/framework/competencies/${id}`, data),
  getSkills: (params) => api.get('/framework/skills', { params }),
  createSkill: (data) => api.post('/framework/skills', data),
  updateSkill: (id, data) => api.put(`/framework/skills/${id}`, data),
  getTopics: (params) => api.get('/framework/topics', { params }),
  createTopic: (data) => api.post('/framework/topics', data),
  getRoles: () => api.get('/framework/roles'),
  createRole: (data) => api.post('/framework/roles', data),
  updateRole: (id, data) => api.put(`/framework/roles/${id}`, data),
};

// ─── ASSESSMENTS ──────────────────────────────────────────────────────────────
export const assessmentAPI = {
  getAll: (params) => api.get('/assessments', { params }),
  getById: (id) => api.get(`/assessments/${id}`),
  create: (data) => api.post('/assessments', data),
  update: (id, data) => api.put(`/assessments/${id}`, data),
  startAttempt: (assessmentId) => api.post(`/assessments/${assessmentId}/attempt`),
  submitAttempt: (assessmentId, attemptId, answers) => api.post(`/assessments/${assessmentId}/attempt/${attemptId}/submit`, { answers }),
  getResult: (attemptId) => api.get(`/assessments/results/${attemptId}`),
};

// ─── QUIZZES ──────────────────────────────────────────────────────────────────
export const quizAPI = {
  getAll: (params) => api.get('/quizzes', { params }),
  getById: (id) => api.get(`/quizzes/${id}`),
  create: (data) => api.post('/quizzes', data),
  update: (id, data) => api.put(`/quizzes/${id}`, data),
  start: (id) => api.post(`/quizzes/${id}/start`),
  submit: (id, data) => api.post(`/quizzes/${id}/submit`, data),
};

// ─── COURSES ──────────────────────────────────────────────────────────────────
export const courseAPI = {
  getAll: (params) => api.get('/courses', { params }),
  getById: (id) => api.get(`/courses/${id}`),
  create: (data) => api.post('/courses', data),
  update: (id, data) => api.put(`/courses/${id}`, data),
  enroll: (id) => api.post(`/courses/${id}/enroll`),
  updateProgress: (id, data) => api.put(`/courses/${id}/progress`, data),
  getMyProgress: () => api.get('/courses/me/progress'),
};

// ─── DOCUMENTS ────────────────────────────────────────────────────────────────
export const documentAPI = {
  upload: (formData) => api.post('/documents/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  getAll: (params) => api.get('/documents', { params }),
  getById: (id) => api.get(`/documents/${id}`),
  generateQuestions: (id, config) => api.post(`/documents/${id}/generate-questions`, config),
};

// ─── QUESTIONS ────────────────────────────────────────────────────────────────
export const questionAPI = {
  getAll: (params) => api.get('/questions', { params }),
  getById: (id) => api.get(`/questions/${id}`),
  create: (data) => api.post('/questions', data),
  update: (id, data) => api.put(`/questions/${id}`, data),
  updateStatus: (id, status, reason) => api.patch(`/questions/${id}/status`, { status, rejectionReason: reason }),
  bulkUpdateStatus: (questionIds, status) => api.post('/questions/bulk/status', { questionIds, status }),
  getStats: () => api.get('/questions/stats'),
};

// ─── LEARNING (Gaps & Recommendations) ───────────────────────────────────────
export const learningAPI = {
  getMyGaps: () => api.get('/learning/gaps'),
  analyzeGaps: (data) => api.post('/learning/gaps/analyze', data),
  getMyRecommendations: (params) => api.get('/learning/recommendations', { params }),
  generateRecommendations: () => api.post('/learning/recommendations/generate'),
  updateRecommendationStatus: (id, status) => api.patch(`/learning/recommendations/${id}/status`, { status }),
};

// ─── ANALYTICS ────────────────────────────────────────────────────────────────
export const analyticsAPI = {
  getOverview: () => api.get('/overview'),
  getDepartments: () => api.get('/departments'),
  getSkillGaps: () => api.get('/skill-gaps'),
};

// ─── NOTIFICATIONS ────────────────────────────────────────────────────────────
export const notificationAPI = {
  getAll: () => api.get('/notifications'),
  markRead: (id) => api.patch(`/notifications/${id}/read`),
  markAllRead: () => api.patch('/notifications/read-all'),
};

// ─── SEARCH ───────────────────────────────────────────────────────────────────
export const searchAPI = {
  search: (q) => api.get('/search', { params: { q } }),
};
