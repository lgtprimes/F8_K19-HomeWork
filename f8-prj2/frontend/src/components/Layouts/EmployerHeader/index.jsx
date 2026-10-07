import { useState, useRef, useEffect } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import ChatIcon from '@mui/icons-material/Chat';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import styles from './EmployerHeader.module.css';
import { useNavigate } from 'react-router-dom';

function EmployerHeader() {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    // Xử lý xóa Token/Session tại đây nếu có
    // localStorage.removeItem('token');
    setIsDropdownOpen(false);
    navigate('/login');
  };

  return (
    <header className={styles.headerContainer}>
      {/* Khối bên trái */}
      <div className={styles.leftSection}>
        <button className={styles.menuBtn} aria-label="Toggle Menu">
          <MenuIcon style={{ fontSize: 22 }} />
        </button>
        
        <div onClick={() => navigate('/')} className={styles.logoContainer}>
          <span className={styles.logoText}>
            top<span className={styles.logoTie}>cv</span>®
          </span>
          <span className={styles.employerBadge}>Employer</span>
        </div>
      </div>

      {/* Khối bên phải */}
      <div className={styles.rightSection}>
        {/* Connect */}
        <button className={`${styles.navPill} ${styles.hideOnMobile}`}>
          <ChatIcon className={styles.navIcon} />
          <span className={styles.navText}>Connect</span>
        </button>

        {/* Insights */}
        <button className={`${styles.navPill} ${styles.hideOnMobile}`}>
          <div className={styles.iconBadgeWrapper}>
            <LightbulbIcon className={styles.navIcon} />
            <span className={styles.dotBadge}></span>
          </div>
          <span className={styles.navText}>Insights</span>
        </button>

        <div className={styles.divider}></div>

        {/* Thông báo */}
        <button className={styles.iconBtn} aria-label="Notifications">
          <NotificationsIcon className={styles.navIcon} />
          <span className={styles.badge}>2</span>
        </button>

        {/* Giỏ hàng */}
        <button className={styles.iconBtn} aria-label="Shopping Cart">
          <ShoppingCartIcon className={styles.navIcon} />
          <span className={`${styles.badge} ${styles.zeroBadge}`}>0</span>
        </button>

        {/* User Account Dropdown Container */}
        <div className={styles.userDropdownWrapper} ref={dropdownRef}>
          <button 
            className={`${styles.userBtn} ${isDropdownOpen ? styles.activeUserBtn : ''}`}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <div className={styles.userAvatar}>
              <PersonIcon style={{ fontSize: 18 }} />
            </div>
            <ArrowDropDownIcon className={`${styles.arrowIcon} ${isDropdownOpen ? styles.rotateArrow : ''}`} />
          </button>

          {/* Menu thả xuống */}
          {isDropdownOpen && (
            <div className={styles.dropdownMenu}>

              <button className={styles.dropdownItem} onClick={() => { setIsDropdownOpen(false); navigate('/employer/register'); }}>
                <span>Đăng ký Tài khoản</span>
              </button>

              <button className={styles.dropdownItem} onClick={() => { setIsDropdownOpen(false); navigate('/settings'); }}>
                <SettingsIcon className={styles.dropdownIcon} />
                <span>Cài đặt tài khoản</span>
              </button>

              <div className={styles.menuDivider}></div>

              <button className={`${styles.dropdownItem} ${styles.logoutItem}`} onClick={handleLogout}>
                <LogoutIcon className={styles.dropdownIcon} />
                <span>Đăng xuất</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default EmployerHeader;