import styles from './LoginForm.module.css';
import { BasicButton, InputField, SocialLogin } from '../index.jsx';
import clsx from 'clsx';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../../api/authApi';

function LoginForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // response từ axiosClient đã là data trả về từ Server
            const data = await authApi.login(formData);

            if (data && data.access_token) {
                // Lưu token vào localStorage với key 'accessToken'
                localStorage.setItem('accessToken', data.access_token);
                
                alert('Đăng nhập thành công!');
                
                // Chuyển hướng về trang chủ
                navigate('/');
            } else {
                setError('Không nhận được access_token từ máy chủ!');
            }

        } catch (err) {
            console.error('Lỗi đăng nhập:', err);

            const errorMessage = 
                err.response?.data?.detail || 
                err.detail || 
                'Đăng nhập thất bại. Vui lòng kiểm tra lại email hoặc mật khẩu!';
            
            setError(typeof errorMessage === 'string' ? errorMessage : 'Đăng nhập thất bại!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.login}>
            <form onSubmit={handleSubmit} className={styles.formLogin}>
                <SocialLogin />
                <div className={styles.loginSeperate}>
                    <div className={styles.loginSeperateLine}></div>
                    <div className={styles.loginSeperateText}>Hoặc đăng nhập bằng email</div>
                    <div className={styles.loginSeperateLine}></div>
                </div>

                {error && (
                    <div style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>
                        {error}
                    </div>
                )}

                <div className={styles.loginEmail}>
                    <InputField 
                        label="Email" 
                        type="email" 
                        name="email" 
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Nhập email" 
                        required
                    />
                    <InputField 
                        label="Password" 
                        type="password" 
                        name="password" 
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Nhập mật khẩu"
                        extraLabel={<a href="/forgot-password">Quên mật khẩu</a>}
                        required
                    />
                    <div className={clsx(styles.formGroupBtn)}>
                        <BasicButton
                            type="submit"
                            disabled={loading}
                            className={styles.btnSubmit}
                        >
                            {loading ? 'Đang xử lý...' : 'Đăng nhập \u2192'}
                        </BasicButton>
                    </div>
                </div>
            </form>

            <div className={styles.optionAuth}>
                <span className={styles.optionAuthText}>Bạn chưa có tài khoản?</span>
                <a href="/register" className={styles.optionAuthLink}>Đăng ký ngay</a>
            </div>

            <div className={styles.support}>
                <span className={styles.supportText}>Bạn gặp khó khăn khi tạo tài khoản? </span>
                <span className={styles.supportHotline}>
                    Vui lòng gọi tới số
                    <span className={styles.hotline}> 1900 068 889 | Nhánh 2 </span>
                    (giờ hành chính).
                </span>
            </div>
        </div>
    );
}

export default LoginForm;