
import styles from "./RegisterPage.module.css"
import { RegisterForm } from '../../components/index'

function RegisterPage() {

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
                    <RegisterForm />
                </div>
            </div>
        </div>
    )
}

export default RegisterPage;