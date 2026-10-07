import axiosClient from "./axiosClient";

export const jobApi = {
    getAll: (params) => axiosClient.get('/jobs', { params }),
    getBySlug: (slug) => axiosClient.get(`/jobs/${slug}`),
    apply: (jobId, data) => axiosClient.get(`jobs/${jobId}/apply`, data)
}
