import styles from './HeroSection.module.css';
import { HeroContent } from '../../index';
function HeroSection() {


    return (
        <div className={styles.heroSection}>
            <h1 className={styles.title}>TopCV - Tạo CV, Tìm việc làm, Tuyển dụng hiệu quả</h1>
            <HeroContent />
        </div>
    )
}

export default HeroSection;