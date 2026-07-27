import styles from './SideBarBanner.module.css'

export default function SideBarBanner() {

    return (
        <div className={styles.bannerContainer}>
            <a href="#">
                <img className={styles.banner} src="https://cdn2.cellphones.com.vn/insecure/rs:fill:321:795/q:100/plain/https://media-asset.cellphones.com.vn/page_configs/01KWE8EDQE54YXMHVKP0GA8HJD.png" alt="" />
            </a>
            <a href="#">
                <img className={styles.banner} src="https://cdn2.cellphones.com.vn/insecure/rs:fill:321:795/q:100/plain/https://media-asset.cellphones.com.vn/page_configs/01KY6D038YDEXJFQVF2DJS6MDJ.png" alt="" />
            </a>
        </div>
    )
}