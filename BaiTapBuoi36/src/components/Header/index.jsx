import styles from './Header.module.css'
import { BrandFilter, CategoryTabs, ProductGrid } from '../../components'

export default function Header() {

    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <button className={`${styles.buttonTab} ${styles.activeButtonTab}`}>ĐIỆN THOẠI</button>
                <div className={styles.separate}></div>
                <button className={styles.buttonTab}>MÁY TÍNH BẢNG</button>
            </nav>
            <CategoryTabs />
            <BrandFilter />
            <ProductGrid />
            
        </header>
    )
}