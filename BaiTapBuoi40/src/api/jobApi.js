import axios from 'axios';
const API_BASE_URL = 'http://localhost:3000';

// Tạo instance axios dùng chung (dễ bảo trì, thêm interceptor sau này)
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/* ==========================================================================
   1. JOB API (Giữ nguyên toàn bộ hàm cũ + Bổ sung tìm kiếm nâng cao)
   ========================================================================== */
export const jobApi = {
  // --- NGUYÊN BẢN CỦA BẠN (GIỮ NGUYÊN CÁCH HOẠT ĐỘNG) ---
  getAll(params) {
    return apiClient.get('/jobs', { params }).then((res) => res.data);
  },

  getById(id) {
    return apiClient.get(`/jobs/${id}`).then((res) => res.data);
  },

  searchJobs(keyword) {
    return apiClient.get('/jobs', { params: { q: keyword } }).then((res) => res.data);
  },

  create(data) {
    return apiClient.post('/jobs', data).then((res) => res.data);
  },

  update(id, data) {
    return apiClient.put(`/jobs/${id}`, data).then((res) => res.data);
  },

  delete(id) {
    return apiClient.delete(`/jobs/${id}`).then((res) => res.data);
  },

  // --- MỞ RỘNG THÊM (KHÔNG LÀM ẢNH HƯỞNG CODE CŨ) ---

  // Lọc công việc theo slug danh mục con (VD: lap-trinh-phan-mem)
  getByCategorySlug(slug) {
    return apiClient.get('/jobs', { params: { category_slug: slug } }).then((res) => res.data);
  },

  // Lọc danh sách công việc HOT
  getHotJobs() {
    return apiClient.get('/jobs', { params: { is_hot: true } }).then((res) => res.data);
  },

  // Lọc công việc thuộc 1 công ty cụ thể
  getByCompanyId(companyId) {
    return apiClient.get('/jobs', { params: { 'company.id': companyId } }).then((res) => res.data);
  }
};


/* ==========================================================================
   2. CATEGORY GROUPS API (Bổ sung để load Menu TopCV)
   ========================================================================== */
export const categoryGroupApi = {
  // Lấy toàn bộ danh mục cấp 1 & cấp 2 cho Hero Section
  getAll() {
    return apiClient.get('/category_groups').then((res) => res.data);
  },

  // Lấy 1 nhóm danh mục theo ID
  getById(id) {
    return apiClient.get(`/category_groups/${id}`).then((res) => res.data);
  }
};


/* ==========================================================================
   3. COMPANY API (Bổ sung để làm trang Công ty)
   ========================================================================== */
export const companyApi = {
  getAll(params) {
    return apiClient.get('/companies', { params }).then((res) => res.data);
  },

  getById(id) {
    return apiClient.get(`/companies/${id}`).then((res) => res.data);
  },

  // Lấy các công ty đã xác thực (VERIFIED)
  getVerifiedCompanies() {
    return apiClient.get('/companies', { params: { verification_tier: 'VERIFIED' } }).then((res) => res.data);
  }
};

// Export mặc định jobApi để đảm bảo code cũ dùng `import jobApi from '...'` vẫn hoạt động bình thường!
export default jobApi;