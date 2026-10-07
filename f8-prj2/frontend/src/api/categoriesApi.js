import axiosClient from "./axiosClient";

export const categoriesApi = {
    // GET /api/v1/categories - Lấy danh sách tất cả ngành nghề/danh mục
    getAll: () => {
        return axiosClient.get('/categories')
    }
}