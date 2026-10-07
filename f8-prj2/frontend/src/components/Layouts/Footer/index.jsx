import styles from './Footer.module.css';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';

function Footer() {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footerContent}>
        {/* Cột 1: Thông tin công ty */}
        <div className={styles.footerCol}>
          <div className={styles.logoContainer}>
            <span className={styles.logoText}>
              top<span className={styles.logoTie}>cv</span>®
            </span>
            <span className={styles.employerBadge}>Employer</span>
          </div>
          <p className={styles.companyDescription}>
            Nền tảng Công nghệ Nhân sự hàng đầu Việt Nam. Giúp nhà tuyển dụng tối ưu hóa quy trình thu hút và quản trị nhân tài.
          </p>
          <div className={styles.contactList}>
            <div className={styles.contactItem}>
              <PhoneIcon className={styles.contactIcon} />
              <span>Hotline: (024) 6680 5588</span>
            </div>
            <div className={styles.contactItem}>
              <EmailIcon className={styles.contactIcon} />
              <span>Email: hotro@topcv.vn</span>
            </div>
            <div className={styles.contactItem}>
              <LocationOnIcon className={styles.contactIcon} />
              <span>Tầng 3, Khách sạn Thể Thao, Hà Nội</span>
            </div>
          </div>
        </div>

        {/* Cột 2: Sản phẩm & Dịch vụ */}
        <div className={styles.footerCol}>
          <h3 className={styles.colTitle}>Sản phẩm & Dịch vụ</h3>
          <ul className={styles.linkList}>
            <li><a href="#post-job">Đăng tin tuyển dụng</a></li>
            <li><a href="#search-cv">Tìm hồ sơ ứng viên</a></li>
            <li><a href="#brand">Quảng bá thương hiệu</a></li>
            <li><a href="#test">TopCV Skill Assessment</a></li>
            <li><a href="#pricing">Bảng giá dịch vụ</a></li>
          </ul>
        </div>

        {/* Cột 3: Giải pháp HR */}
        <div className={styles.footerCol}>
          <h3 className={styles.colTitle}>Giải pháp Nhân sự</h3>
          <ul className={styles.linkList}>
            <li><a href="#shiring">SHiring - Quản trị tuyển dụng</a></li>
            <li><a href="#happytime">HappyTime - Chấm công & Nền tảng HR</a></li>
            <li><a href="#insights">Báo cáo thị trường tuyển dụng</a></li>
            <li><a href="#events">Sự kiện & Webinar</a></li>
            <li><a href="#blog">Góc nhà tuyển dụng</a></li>
          </ul>
        </div>

        {/* Cột 4: Kết nối & Ứng dụng */}
        <div className={styles.footerCol}>
          <h3 className={styles.colTitle}>Kết nối với TopCV</h3>
          <div className={styles.socialGroup}>
            <a href="#facebook" className={styles.socialBtn} aria-label="Facebook"><FacebookIcon /></a>
            <a href="#linkedin" className={styles.socialBtn} aria-label="LinkedIn"><LinkedInIcon /></a>
            <a href="#youtube" className={styles.socialBtn} aria-label="YouTube"><YouTubeIcon /></a>
          </div>
          <div className={styles.newsletterGroup}>
            <p className={styles.newsletterTitle}>Đăng ký nhận bản tin HR</p>
            <div className={styles.inputWrapper}>
              <input type="email" placeholder="Email của bạn" className={styles.emailInput} />
              <button className={styles.submitBtn}>Gửi</button>
            </div>
          </div>
        </div>
      </div>

      {/* Thanh bản quyền phía dưới */}
      <div className={styles.bottomBar}>
        <div className={styles.bottomContent}>
          <p>© 2014 - 2026 Công ty Cổ phần TopCV Việt Nam. All rights reserved.</p>
          <div className={styles.policyLinks}>
            <a href="#terms">Điều khoản dịch vụ</a>
            <span className={styles.dot}>•</span>
            <a href="#privacy">Chính sách bảo mật</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;