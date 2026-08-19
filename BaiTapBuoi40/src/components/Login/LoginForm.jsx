import styles from './LoginForm.module.css'
import {BasicButton, InputField, SocialLogin} from '../index.jsx';
import clsx from 'clsx';

function LoginForm() {


    return (
        <div className={styles.login}>
            <form action="" className={styles.formLogin}>
                <SocialLogin />
                <div className={styles.loginSeperate}>
                    <div className={styles.loginSeperateLine}></div>
                    <div className={styles.loginSeperateText}>Hoặc đăng nhập bằng email</div>
                    <div className={styles.loginSeperateLine}></div>
                </div>
                <div className={styles.loginEmail}>
                    <InputField 
                        label="Email" 
                        type="email" 
                        name="email" 
                        placeholder="Nhập email" 
                    />
                    <InputField 
                        label="Password" 
                        type="password" 
                        name="password" 
                        placeholder="Nhập mật khẩu"
                        extraLabel={<a href="/forgot-password">Quên mật khẩu</a>}
                    />
                    <div className={clsx(styles.formGroupBtn)}>
                        <BasicButton
                            className={styles.btnSubmit}
                        >
                            Đăng nhập &rarr;
                        </BasicButton>
                    </div>
                </div>
            </form>
            <div className={styles.optionAuth}>
                <span className={styles.optionAuthText}>Bạn chưa có tài khoản?</span>
                <a className={styles.optionAuthLink}>Đăng ký ngay</a>
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
    )
}

export default LoginForm;