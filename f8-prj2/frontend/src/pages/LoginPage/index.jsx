import styles from './LoginPage.module.css'
import { LoginForm } from '../../components/index.jsx'

function LoginPage() {


    return (
        <div className={styles.loginPage}>
            <div className={styles.authForm}>
                <div className={styles.container}>
                    <header>
                        <a className={styles.headerLink} href="">
                            <img className={styles.logo} src="https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/v4/image/logo/topcv-logo.png" alt="TopCVLogo" />
                            <h2 className={styles.title}>Chào mừng bạn quay trở lại</h2>
                        </a>
                    </header>
                    <LoginForm />
                </div>
            </div>
        </div>
    )
}

export default LoginPage