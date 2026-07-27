import styles from './BrandFilter.module.css'


export default function BrandFilter() {


    return (
        <div className={styles.container}>
            <div className={styles.swiperContainer}>
                <button title='Previous' className={`${styles.btnSlide} ${styles.btnPrev}`}><i class="fa-solid fa-angle-left"></i></button>
                <nav className={styles.swiperWrapper}>
                    <div className={styles.swiperSlide}>
                        <a href="#">Apple</a>
                    </div>
                    <div className={styles.swiperSlide}>
                        <a href="#">Samsung</a>
                    </div>
                    <div className={styles.swiperSlide}>
                        <a href="#">Xiaomi</a>
                    </div>
                    <div className={styles.swiperSlide}>
                        <a href="#">OPPO</a>
                    </div>
                    <div className={styles.swiperSlide}>
                        <a href="#">TECNO</a>
                    </div>
                    <div className={styles.swiperSlide}>
                        <a href="#">HONOR</a>
                    </div>
                    <div className={styles.swiperSlide}>
                        <a href="#">Nubia</a>
                    </div>
                    <div className={styles.swiperSlide}>
                        <a href="#">Sony</a>
                    </div>
                    <div className={styles.swiperSlide}>
                        <a href="#">Nokia</a>
                    </div>
                    <div className={styles.swiperSlide}>
                        <a href="#">Infinix</a>
                    </div>
                    <div className={styles.swiperSlide}>
                        <a href="#">Nothing Phone</a>
                    </div>
                    <div className={styles.swiperSlide}>
                        <a href="#">Masstel</a>
                    </div>
                    <div className={styles.swiperSlide}>
                        <a href="#">Realme</a>
                    </div>
                    <div className={styles.swiperSlide}>
                        <a href="#">Itel</a>
                    </div>
                    <div className={styles.swiperSlide}>
                        <a href="#">Vivo</a>
                    </div>
                </nav>
                <button title='Next' className={`${styles.btnSlide} ${styles.btnNext}`}><i class="fa-solid fa-angle-right"></i></button>
            </div>
            <a className={styles.viewAll} href="">
                <span>Xem tất cả</span>
                <i class="fa-solid fa-angle-right"></i>
            </a>
        </div>
    )
}