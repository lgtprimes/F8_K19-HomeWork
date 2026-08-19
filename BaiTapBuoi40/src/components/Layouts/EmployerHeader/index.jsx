import MenuIcon from '@mui/icons-material/Menu';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import EditIcon from '@mui/icons-material/Edit';
import NavigationIcon from '@mui/icons-material/Navigation';
import ChatIcon from '@mui/icons-material/Chat';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import styles from './EmployerHeader.module.css';

function EmployerHeader() {
  return (
    <header className={styles.headerContainer}>
      {/* Khối bên trái */}
      <div className={styles.leftSection}>
        <button className={styles.menuBtn} aria-label="Toggle Menu">
          <MenuIcon />
        </button>
        <div className={styles.logoContainer}>
          <span className={styles.logoText}>top<span className={styles.logoTie}>cv</span>®</span>
        </div>
      </div>

      {/* Khối bên phải */}
      <div className={styles.rightSection}>
        {/* HR Insider */}
        <button className={`${styles.navPill} ${styles.hideOnMobile}`}>
          <BookmarkIcon className={styles.navIcon} />
          <span className={styles.navText}>HR Insider</span>
        </button>

        {/* Đăng tin */}
        <button className={styles.navPill}>
          <EditIcon className={styles.navIcon} />
          <span className={styles.navText}>Đăng tin</span>
        </button>

        {/* Tìm CV */}
        <button className={styles.navPill}>
          <NavigationIcon className={styles.navIcon} style={{ transform: 'rotate(90deg)' }} />
          <span className={styles.navText}>Tìm CV</span>
        </button>

        {/* Connect */}
        <button className={`${styles.navPill} ${styles.hideOnMobile}`}>
          <ChatIcon className={styles.navIcon} />
          <span className={styles.navText}>Connect</span>
        </button>

        {/* Insights (có dot đỏ) */}
        <button className={`${styles.navPill} ${styles.hideOnMobile}`}>
          <div className={styles.iconBadgeWrapper}>
            <LightbulbIcon className={styles.navIcon} />
            <span className={styles.dotBadge}></span>
          </div>
          <span className={styles.navText}>Insights</span>
        </button>

        {/* Thông báo (Badge count = 2) */}
        <button className={styles.navPill} style={{ padding: '8px 10px' }}>
          <div className={styles.iconBadgeWrapper}>
            <NotificationsIcon className={styles.navIcon} />
            <span className={styles.badge}>2</span>
          </div>
        </button>

        {/* Giỏ hàng (Badge count = 0) */}
        <button className={styles.navPill} style={{ padding: '8px 10px' }}>
          <div className={styles.iconBadgeWrapper}>
            <ShoppingCartIcon className={styles.navIcon} />
            <span className={styles.badge}>0</span>
          </div>
        </button>

        {/* User Account Dropdown */}
        <button className={styles.userBtn}>
          <div className={styles.userAvatar}>
            <PersonIcon style={{ fontSize: 20 }} />
          </div>
          <ArrowDropDownIcon style={{ color: '#ffffff', fontSize: 18 }} />
        </button>
      </div>
    </header>
  );
}

export default EmployerHeader;