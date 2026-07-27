import styles from './ProductCard.module.css'

export default function ProductCard() {
    return (
        <div className={styles.swipperSlide}>
            <div className={styles.productCard}>
                <a href='#' className={styles.productHeader}>
                    <span className={styles.productImgWrapper}>
                        <img className={styles.productImg} src="https://cdn2.cellphones.com.vn/insecure/rs:fill:300:300/q:100/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-galaxy-z-fold-8-violet-01.jpg" alt="" />
                    </span>
                    <div className={styles.productInfo}>
                        <h3 className={styles.productName}>Samsung Galaxy Z Fold8 Ultra 5G 12GB 256GB</h3>
                        <div className={styles.productPreOrder}>Hàng đặt trước</div>
                        <div className={styles.ProductPrice}>
                            <p>52.990.000đ</p>
                        </div>
                        <div className={styles.productMemberShip}>
                            Smember giảm đến 
                            <span>530.000đ</span>
                        </div>
                        <div className={styles.productInstallment}>
                            <div>Trả góp 0% - 0đ phụ phí - 0đ trả trước - kỳ hạn đến 12 tháng</div>
                        </div>
                    </div>
                    <div className={styles.labelDiscount}>
                        <span>Giảm 5%</span>
                    </div>
                    <div className={styles.labelInstallment}>
                        <span>Trả góp 0%</span>
                    </div>
                </a>
                <div className={styles.productFooter}>
                    <div className={styles.shipTime}>
                        <svg class="h-4 shrink-0 min-[375px]:h-5 md:h-6" width="14" height="22" viewBox="0 0 14 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14 22L13.9992 21.9834C13.9448 21.9801 13.8901 21.9782 13.8353 21.9737C12.6234 21.8772 11.4279 21.4711 9.7776 20.8255C8.80068 20.4498 7.78912 19.979 6.78007 19.4155C6.92073 19.4229 7.01566 19.4241 7.03624 19.4223C8.01353 19.3971 9.54199 19.8142 10.7488 18.7543C12.0384 17.6217 13.7982 16.732 13.7982 16.732C13.7982 16.732 10.3831 16.562 8.09308 15.6535C5.64221 14.6806 3.37291 12.582 0 13.1036C2.17647 9.123 4.58021 8.65209 7.03707 8.17245C7.87367 8.00776 8.719 7.84257 9.57249 7.54936C9.58052 7.54855 9.58831 7.54329 9.59638 7.54253C9.79531 7.48637 9.98515 7.41098 10.1656 7.32216C10.2056 7.30409 10.2417 7.2866 10.2817 7.26853C10.326 7.25005 10.366 7.22187 10.4012 7.18954C10.6598 7.03047 10.8878 6.83965 11.0774 6.63275C11.5071 6.16568 11.7453 5.59771 11.7125 5.06283C11.6759 4.46467 11.5702 3.96016 11.2158 3.50168C10.8923 3.07487 10.3628 2.72889 9.48188 2.43783C8.98425 2.27053 8.18863 2.36362 7.28254 2.60263C8.04273 2.13658 8.80545 1.70881 9.55107 1.34181C11.1628 0.548351 12.6684 0.0384752 13.8353 0.00688323C14.0039 0.00228017 13.8331 -0.00278636 14 0.00181152V0.0327282V22Z" fill="#D9D9D9"></path><path d="M14 22L13.9992 21.9834C13.9448 21.9801 13.8901 21.9782 13.8353 21.9737C12.6234 21.8772 11.4279 21.4711 9.7776 20.8255C8.80068 20.4498 7.78912 19.979 6.78007 19.4155C6.92073 19.4229 7.01566 19.4241 7.03624 19.4223C8.01353 19.3971 9.54199 19.8142 10.7488 18.7543C12.0384 17.6217 13.7982 16.732 13.7982 16.732C13.7982 16.732 10.3831 16.562 8.09308 15.6535C5.64221 14.6806 3.37291 12.582 0 13.1036C2.17647 9.123 4.58021 8.65209 7.03707 8.17245C7.87367 8.00776 8.719 7.84257 9.57249 7.54936C9.58052 7.54855 9.58831 7.54329 9.59638 7.54253C9.79531 7.48637 9.98515 7.41098 10.1656 7.32216C10.2056 7.30409 10.2417 7.2866 10.2817 7.26853C10.326 7.25005 10.366 7.22187 10.4012 7.18954C10.6598 7.03047 10.8878 6.83965 11.0774 6.63275C11.5071 6.16568 11.7453 5.59771 11.7125 5.06283C11.6759 4.46467 11.5702 3.96016 11.2158 3.50168C10.8923 3.07487 10.3628 2.72889 9.48188 2.43783C8.98425 2.27053 8.18863 2.36362 7.28254 2.60263C8.04273 2.13658 8.80545 1.70881 9.55107 1.34181C11.1628 0.548351 12.6684 0.0384752 13.8353 0.00688323C14.0039 0.00228017 13.8331 -0.00278636 14 0.00181152V0.0327282V22Z" fill="#3B82F6"></path>
                        </svg>
                        <div className={styles.timeTitle}>
                            <i class="fa-regular fa-truck"></i>
                            <div>2 Giờ</div>
                        </div>
                    </div>
                    <div className={styles.rating}>
                        <i class="fa-solid fa-star"></i>
                        <span>5</span>
                    </div>
                    <button className={styles.favoriteBtn}>
                        <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="group-hover:animate-heartbeat size-5.5" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                    </button>
                </div>
            </div>
        </div>
    )
}