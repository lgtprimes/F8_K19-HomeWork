import styles from './CategoryTabs.module.css'

export default function CategoryTabs() {

    return (
        <nav className={styles.swiperWrapper}>
            <button title='Previous' className={`${styles.btnSlide} ${styles.btnPrev}`}><i class="fa-solid fa-angle-left"></i></button>
            <div className={styles.containerTabs}>
                <a className={styles.tabItem} href="">
                    <img src="https://cdn2.cellphones.com.vn/insecure/rs:fill:96:96/q:90/plain/https://cellphones.com.vn/media/wysiwyg/Web/icon/mobile-gamning.png" alt="" />
                    <p>Điện thoại chơi game</p>
                </a>
                <a className={styles.tabItem} href="">
                    <img src="https://cdn2.cellphones.com.vn/insecure/rs:fill:96:96/q:90/plain/https://cellphones.com.vn/media/wysiwyg/Web/icon/mobile-pin.png" alt="" />
                    <p>Điện thoại pin trâu</p>
                </a>
                <a className={styles.tabItem} href="">
                    <img src="https://cdn2.cellphones.com.vn/insecure/rs:fill:96:96/q:90/plain/https://cellphones.com.vn/media/wysiwyg/Web/icon/mobile-5g_1.png" alt="" />
                    <p>Điện thoại 5G</p>
                </a>
                <a className={styles.tabItem} href="">
                    <img src="https://cdn2.cellphones.com.vn/insecure/rs:fill:96:96/q:90/plain/https://cellphones.com.vn/media/wysiwyg/Web/icon/mobile-chup-anh.png" alt="" />
                    <p>Điện thoại chụp ảnh đẹp</p>
                </a>
                <a className={styles.tabItem} href="">
                    <img src="https://cdn2.cellphones.com.vn/insecure/rs:fill:96:96/q:90/plain/https://cellphones.com.vn/media/wysiwyg/Web/icon/mobile-gap_1.png" alt="" />
                    <p>Điện thoại gập</p>
                </a>
                <a className={styles.tabItem} href="">
                    <img src="https://cdn2.cellphones.com.vn/insecure/rs:fill:96:96/q:90/plain/https://cellphones.com.vn/media/wysiwyg/dien-thoai-ai-icon-cate.png" alt="" />
                    <p>Điện thoại A1</p>
                </a>
                <a className={styles.tabItem} href="">
                    <img src="https://cdn2.cellphones.com.vn/insecure/rs:fill:96:96/q:90/plain/https://cellphones.com.vn/media/wysiwyg/dien-thoai-pho-thong-icon-cate.png" alt="" />
                    <p>Điện thoại phổ thông</p>
                </a>
            </div>
            <button title='Next' className={`${styles.btnSlide} ${styles.btnNext}`}><i class="fa-solid fa-angle-right"></i></button>
        </nav>
    )
}   