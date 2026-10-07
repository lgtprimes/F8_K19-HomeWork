import styles from './RegisterForm.module.css';
import { BasicButton, InputField } from '../index.jsx';
import clsx from 'clsx';
import { useState } from 'react';
import { authApi } from '../../api/authApi';
import { useNavigate, Link } from 'react-router-dom';

function RegisterForm() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    // Chỉ sử dụng 1 State duy nhất quản lý thông báo lỗi chung
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(''); // Clear lỗi cũ mỗi lần submit

        if (password !== confirmPassword) {
            setErrorMessage('Mật khẩu xác nhận không khớp. Vui lòng kiểm tra lại!');
            return;
        }

        const payload = {
            email: email.trim(),
            password: password,
            full_name: fullName.trim()
        };

        setLoading(true);

        try {
            const res = await authApi.register(payload);
            const token = res?.access_token || res?.data?.access_token;
            if (token) {
                localStorage.setItem('accessToken', token);
            }
            navigate(token ? '/' : '/login', { replace: true });
        } catch (err) {
            console.log('=== REGISTER ERROR ===', err);

            // Bắt lỗi email đã tồn tại (409) hoặc các lỗi khác và hiển thị câu thông báo chung
            if (err?.code === 409 || err?.response?.status === 409) {
                setErrorMessage('Email đã được đăng ký! Vui lòng chọn email khác.');
            } else if (err?.message) {
                setErrorMessage(err.message);
            } else {
                setErrorMessage('Thông tin đăng ký không hợp lệ. Vui lòng thử lại!');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.login}>
            <form onSubmit={handleSubmit} className={styles.formLogin}>
                
                {/* 1 TẤM BẢNG THÔNG BÁO LỖI DUY NHẤT Ở ĐẦU FORM */}
                {errorMessage && (
                    <div className={styles.errorBanner}>
                        {errorMessage}
                    </div>
                )}

                <div className={styles.loginEmail}>
                    <InputField 
                        label="Họ và tên" 
                        type="text" 
                        value={fullName}
                        onChange={(e) => {
                            setFullName(e?.target ? e.target.value : e);
                            if (errorMessage) setErrorMessage('');
                        }}
                        placeholder="Nhập họ và tên" 
                        required
                        disabled={loading}
                    />
                    <InputField 
                        label="Email" 
                        type="email" 
                        value={email}
                        onChange={(e) => {
                            setEmail(e?.target ? e.target.value : e);
                            if (errorMessage) setErrorMessage('');
                        }}
                        placeholder="Nhập email" 
                        required
                        disabled={loading}
                    />
                    <InputField 
                        label="Mật khẩu" 
                        type="password" 
                        value={password}
                        onChange={(e) => {
                            setPassword(e?.target ? e.target.value : e);
                            if (errorMessage) setErrorMessage('');
                        }}
                        placeholder="Nhập mật khẩu"
                        required
                        disabled={loading}
                    />
                    <InputField 
                        label="Xác nhận mật khẩu" 
                        type="password" 
                        value={confirmPassword}
                        onChange={(e) => {
                            setConfirmPassword(e?.target ? e.target.value : e);
                            if (errorMessage) setErrorMessage('');
                        }}
                        placeholder="Nhập lại mật khẩu"
                        required
                        disabled={loading}
                    />

                    <div className={clsx(styles.formGroupBtn)}>
                        <BasicButton type="submit" className={styles.btnSubmit} disabled={loading}>
                            {loading ? 'Đang xử lý...' : <>Đăng ký &#8594;</>}
                        </BasicButton>
                    </div>
                </div>
            </form>

            <div className={styles.optionAuth}>
                <span className={styles.optionAuthText}>Bạn đã có tài khoản?</span>
                <Link to="/login" className={styles.optionAuthLink}>Đăng nhập ngay</Link>
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

export default RegisterForm;