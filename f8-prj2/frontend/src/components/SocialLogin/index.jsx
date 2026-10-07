// import clsx from "clsx"
import styles from './SocialList.module.css'
import { BasicButton } from '../index.jsx'
const socialRows = [
    [
        {
            name: 'Google',
            logo: 'https://static.topcv.vn/v4/image/auth/icon/google-icon.svg',
            text: 'Đăng nhập bằng Google'
        }
    ],
    [   
        {
            name: 'Facebook',
            logo: 'https://static.topcv.vn/v4/image/auth/icon/facebook-icon.svg',
            text: 'Facebook'
        },
        {
            name: 'Linkedin',
            logo: 'https://static.topcv.vn/v4/image/auth/icon/linkedin-icon.svg',
            text: 'Linkedin'
        },
        
    ]
]

function SocialLogin() {


    return (
        <div className={styles.socialList}>
            {socialRows.map((row, rowIndex) => (
                <div className={styles.socialListRow} key={rowIndex}>
                    {row.map((social) => (
                        <BasicButton
                            key={social.name}
                            variant='outline'
                            as='a'
                        >
                            <img 
                                className={styles.logoBtn} 
                                src={social.logo} 
                                alt={social.name} 
                            />
                            <span 
                                className={styles.textBtn}
                            >
                                {social.text}
                            </span>
                        </BasicButton>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default SocialLogin