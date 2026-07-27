import { ProductCard } from '../../../components'

import styles from './ProductGrid.module.css'

export default function ProductGrid() {

    return (
        <div className={styles.container}>
            <button className={`${styles.btnSlide} ${styles.btnPrev}`}>
                <i class="fa-solid fa-angle-left"></i>
            </button>
            <div className={styles.swipperWapper}>
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
            </div>
            <button className={`${styles.btnSlide} ${styles.btnNext}`}>
                <i class="fa-solid fa-angle-right"></i>
            </button>
        </div>
    )
}