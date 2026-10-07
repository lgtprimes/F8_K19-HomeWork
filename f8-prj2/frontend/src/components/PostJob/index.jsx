import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import axiosClient from '../../api/axiosClient';
import styles from './PostJob.module.css';
import clsx from 'clsx';
const tinymceConfig = {
    height: 250,
    menubar: false,
    plugins: ['lists', 'link', 'code'],
    toolbar: 'undo redo | bold italic | bullist numlist | link code'
};

function PostJob() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const [formData, setFormData] = useState({
        title: '',
        category: '',
        specialty: '',
        job_type: 'FULL_TIME',
        experience_level: 'MIDDLE',
        gender: 'Không xác định',
        quantity: 1,
        salary: {
            type: 'RANGE',
            min: 10000000,
            max: 20000000,
            currency: 'VND',
            is_negotiable: false
        },
        work_location: [
            { city_id: 1, city_name: 'Hồ Chí Minh', address_detail: '' }
        ],
        deadline: '',
        is_hot: false,
        description_html: '',
        requirements_html: '',
        benefits_html: ''
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : type === 'number' ? (value === '' ? '' : Number(value)) : value
        }));
    };

    const handleEditorChange = (field, content) => {
        setFormData((prev) => ({ ...prev, [field]: content }));
    };

    const handleSalaryChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            salary: {
                ...prev.salary,
                [name]: type === 'checkbox' ? checked : type === 'number' ? (value === '' ? 0 : Number(value)) : value
            }
        }));
    };

    const handleLocationChange = (index, field, value) => {
        const updatedLocations = [...formData.work_location];
        updatedLocations[index] = {
            ...updatedLocations[index],
            [field]: field === 'city_id' ? (value === '' ? 1 : Number(value)) : value
        };
        setFormData((prev) => ({ ...prev, work_location: updatedLocations }));
    };

    const handleAddLocation = () => {
        setFormData((prev) => ({
            ...prev,
            work_location: [...prev.work_location, { city_id: 1, city_name: 'Hồ Chí Minh', address_detail: '' }]
        }));
    };

    const handleRemoveLocation = (index) => {
        if (formData.work_location.length === 1) return;
        setFormData((prev) => ({
            ...prev,
            work_location: prev.work_location.filter((_, i) => i !== index)
        }));
    };

    const isEditorEmpty = (htmlString) => !htmlString || htmlString.replace(/<[^>]*>/g, '').trim() === '';

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            isEditorEmpty(formData.description_html) ||
            isEditorEmpty(formData.requirements_html) ||
            isEditorEmpty(formData.benefits_html)
        ) {
            setErrorMessage('Vui lòng điền đầy đủ Mô tả, Yêu cầu và Quyền lợi.');
            return;
        }

        let deadlineISO = null;
        if (formData.deadline) {
            const d = new Date(formData.deadline);
            d.setHours(23, 59, 59, 999);
            deadlineISO = d.toISOString();
        }

        const isNegotiable = Boolean(formData.salary.is_negotiable);

        const payload = {
            title: formData.title.trim(),
            category: formData.category.trim(),
            specialty: (formData.specialty || '').trim(),
            job_type: formData.job_type,
            experience_level: formData.experience_level,
            gender: formData.gender,
            quantity: Number(formData.quantity) || 1,
            salary: {
                type: isNegotiable ? 'AGREEMENT' : formData.salary.type,
                min: isNegotiable ? null : (Number(formData.salary.min) || 0),
                max: isNegotiable ? null : (Number(formData.salary.max) || 0),
                currency: formData.salary.currency || 'VND',
                is_negotiable: isNegotiable
            },
            work_location: formData.work_location.map((loc) => ({
                city_id: Number(loc.city_id) || 1,
                city_name: (loc.city_name || '').trim(),
                address_detail: (loc.address_detail || '').trim()
            })),
            deadline: deadlineISO,
            is_hot: Boolean(formData.is_hot),
            description_html: formData.description_html || '',
            requirements_html: formData.requirements_html || '',
            benefits_html: formData.benefits_html || ''
        };

        try {
            setLoading(true);
            setErrorMessage('');
            await axiosClient.post('/employer/jobs', payload);
            setSuccessMessage('Đăng tin thành công!');
            setTimeout(() => navigate('/'), 1500);
        } catch (error) {
            const detail = error.response?.data?.detail;
            if (Array.isArray(detail)) {
                setErrorMessage(
                    detail.map((item) => `• ${item.loc ? item.loc.join('.') : 'Lỗi'}: ${item.msg}`).join('\n')
                );
            } else {
                setErrorMessage(error.response?.data?.message || detail || 'Dữ liệu không hợp lệ!');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.postJobContainer}>
            <div className={styles.postJobHeader}>
                <h2 className={styles.postJobTitle}>Đăng Tin Tuyển Dụng Mới</h2>
                <p className={styles.postJobSubtitle}>Điền thông tin chi tiết để thu hút ứng viên tiềm năng</p>
            </div>

            {errorMessage && <div className={styles.alertDanger}>{errorMessage}</div>}
            {successMessage && <div className={styles.alertSuccess}>{successMessage}</div>}

            <form onSubmit={handleSubmit} className={styles.jobForm}>
                {/* 1. THÔNG TIN CHUNG */}
                <div className={styles.formSection}>
                    <div className={styles.sectionHeader}>
                        <h3 className={styles.sectionTitle}>1. Thông tin chung</h3>
                    </div>

                    <div className={styles.formGrid}>
                        <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                            <label className={styles.formLabel}>Tiêu đề vị trí tuyển dụng <span className={styles.required}>*</span></label>
                            <input type="text" className={styles.formInput} name="title" value={formData.title} onChange={handleChange} placeholder="Ví dụ: Senior Frontend Developer (ReactJS)" required />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Danh mục <span className={styles.required}>*</span></label>
                            <input type="text" className={styles.formInput} name="category" placeholder="Ví dụ: Công nghệ thông tin" value={formData.category} onChange={handleChange} required />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Chuyên môn</label>
                            <input type="text" className={styles.formInput} name="specialty" placeholder="Ví dụ: ReactJS, Frontend" value={formData.specialty} onChange={handleChange} />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Hình thức làm việc</label>
                            <select className={styles.formSelect} name="job_type" value={formData.job_type} onChange={handleChange}>
                                <option value="FULL_TIME">Full-time</option>
                                <option value="PART_TIME">Part-time</option>
                                <option value="INTERNSHIP">Internship</option>
                                <option value="FREELANCE">Freelance</option>
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Cấp bậc</label>
                            <select className={styles.formSelect} name="experience_level" value={formData.experience_level} onChange={handleChange}>
                                <option value="INTERN">Intern</option>
                                <option value="FRESHER">Fresher</option>
                                <option value="JUNIOR">Junior</option>
                                <option value="MIDDLE">Middle</option>
                                <option value="SENIOR">Senior</option>
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Yêu cầu giới tính</label>
                            <select className={styles.formSelect} name="gender" value={formData.gender} onChange={handleChange}>
                                <option value="ANY">Không yêu cầu giới tính</option>
                                <option value="MALE">Nam</option>
                                <option value="FEMALE">Nữ</option>
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Số lượng tuyển</label>
                            <input type="number" className={styles.formInput} name="quantity" min="1" value={formData.quantity} onChange={handleChange} />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Hạn nộp hồ sơ <span className={styles.required}>*</span></label>
                            <input type="date" className={styles.formInput} name="deadline" value={formData.deadline} onChange={handleChange} required />
                        </div>
                    </div>
                </div>

                {/* 2. MỨC LƯƠNG */}
                <div className={styles.formSection}>
                    <div className={styles.sectionHeader}>
                        <h3 className={styles.sectionTitle}>2. Mức lương</h3>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.checkboxLabel}>
                            <input type="checkbox" className={styles.checkboxInput} name="is_negotiable" checked={formData.salary.is_negotiable} onChange={handleSalaryChange} />
                            Lương thỏa thuận
                        </label>
                    </div>

                    {!formData.salary.is_negotiable && (
                        <div className={styles.formGrid} style={{ marginTop: '1rem' }}>
                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>Mức lương tối thiểu (VND)</label>
                                <input type="number" className={styles.formInput} name="min" placeholder="10,000,000" value={formData.salary.min} onChange={handleSalaryChange} />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>Mức lương tối đa (VND)</label>
                                <input type="number" className={styles.formInput} name="max" placeholder="20,000,000" value={formData.salary.max} onChange={handleSalaryChange} />
                            </div>
                        </div>
                    )}
                </div>

                {/* 3. ĐỊA ĐIỂM LÀM VIỆC */}
                <div className={styles.formSection}>
                    <div className={styles.sectionHeader}>
                        <h3 className={styles.sectionTitle}>3. Địa điểm làm việc</h3>
                        <button type="button" className={styles.btnSecondarySm} onClick={handleAddLocation}>+ Thêm địa điểm</button>
                    </div>

                    <div className={styles.locationList}>
                        {formData.work_location.map((loc, index) => (
                            <div key={index} className={styles.locationItem}>
                                <div className={styles.locationCity}>
                                    <input type="text" className={styles.formInput} placeholder="Thành phố" value={loc.city_name} onChange={(e) => handleLocationChange(index, 'city_name', e.target.value)} required />
                                </div>
                                <div className={styles.locationAddress}>
                                    <input type="text" className={styles.formInput} placeholder="Địa chỉ chi tiết (VD: Tầng 5, Tòa nhà ABC...)" value={loc.address_detail} onChange={(e) => handleLocationChange(index, 'address_detail', e.target.value)} required />
                                </div>
                                {formData.work_location.length > 1 && (
                                    <button type="button" className={styles.btnDangerIcon} onClick={() => handleRemoveLocation(index)} title="Xóa địa điểm">
                                        ✕
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* 4. NỘI DUNG CHI TIẾT */}
                <div className={styles.formSection}>
                    <div className={styles.sectionHeader}>
                        <h3 className={styles.sectionTitle}>4. Chi tiết công việc</h3>
                    </div>

                    <div className={styles.editorGroup}>
                        <label className={styles.formLabel}>Mô tả công việc <span className={styles.required}>*</span></label>
                        <Editor apiKey="r0vi1jg533ah1cl2ub3xp27eenrw36aijmk86cnk1mf2xuza" value={formData.description_html} init={tinymceConfig} onEditorChange={(c) => handleEditorChange('description_html', c)} />
                    </div>

                    <div className={styles.editorGroup}>
                        <label className={styles.formLabel}>Yêu cầu ứng viên <span className={styles.required}>*</span></label>
                        <Editor apiKey="r0vi1jg533ah1cl2ub3xp27eenrw36aijmk86cnk1mf2xuza" value={formData.requirements_html} init={tinymceConfig} onEditorChange={(c) => handleEditorChange('requirements_html', c)} />
                    </div>

                    <div className={styles.editorGroup}>
                        <label className={styles.formLabel}>Quyền lợi <span className={styles.required}>*</span></label>
                        <Editor apiKey="r0vi1jg533ah1cl2ub3xp27eenrw36aijmk86cnk1mf2xuza" value={formData.benefits_html} init={tinymceConfig} onEditorChange={(c) => handleEditorChange('benefits_html', c)} />
                    </div>
                </div>

                <button type="submit" className={clsx(styles.btnPrimary, styles.btnSubmitForm)} disabled={loading}>
                    {loading ? 'Đang gửi...' : 'Đăng tin tuyển dụng'}
                </button>
            </form>
        </div>
    );
}

export default PostJob;