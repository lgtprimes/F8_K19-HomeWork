import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './CardDetails.module.css';

// SVG Icons nội bộ - Bọc React.memo để tối ưu hiệu năng re-render
const Icons = {
  Location: React.memo(() => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
  )),
  Badge: React.memo(() => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-5.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
    </svg>
  )),
  Clock: React.memo(() => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
    </svg>
  )),
  Send: React.memo(() => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
    </svg>
  )),
  Heart: React.memo(() => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.72-8.72 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  )),
  Bell: React.memo(() => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
    </svg>
  )),
  Users: React.memo(() => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
    </svg>
  )),
  Grid: React.memo(() => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z"/>
    </svg>
  )),
  ExternalLink: React.memo(() => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
    </svg>
  )),
  GraduationCap: React.memo(() => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>
    </svg>
  )),
  Briefcase: React.memo(() => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/>
    </svg>
  ))
};

function CardDetails({ job }) {
  const navigate = useNavigate();
  const location = useLocation();

  if (!job) return null;

  // Hàm xử lý hiển thị mức lương nâng cao
  const formatSalary = (salary) => {
    if (!salary || salary.type === 'AGREEMENT' || salary.is_negotiable) {
      return 'Thỏa thuận';
    }
    if (salary.type === 'RANGE') {
      const min = salary.min ? (salary.min / 1000000).toFixed(0) : '0';
      const max = salary.max ? (salary.max / 1000000).toFixed(0) : '0';
      return `${min} - ${max} triệu`;
    }
    if (salary.min) {
      return `${salary.min.toLocaleString('vi-VN')} VND`;
    }
    return 'Thỏa thuận';
  };

  // Hàm định dạng ngày tháng
  const formatDate = (isoString) => {
    if (!isoString) return 'Chưa cập nhật';
    const date = new Date(isoString);
    return isNaN(date.getTime()) ? 'Chưa cập nhật' : date.toLocaleDateString('vi-VN');
  };

  // Hàm định dạng hình thức làm việc
  const formatJobType = (type) => {
    const jobTypes = {
      FULL_TIME: 'Toàn thời gian',
      PART_TIME: 'Bán thời gian',
      HYBRID: 'Linh hoạt (Hybrid)',
      REMOTE: 'Làm từ xa (Remote)',
      INTERNSHIP: 'Thực tập'
    };
    return jobTypes[type] || type || 'Chưa cập nhật';
  };

  const handleApplyClick = () => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      alert('Bạn cần đăng nhập để ứng tuyển công việc này!');
      navigate('/login', { state: { from: location.pathname } });
      return;
    }
    
    // Xử lý chuyển hướng ứng tuyển hoặc mở modal ứng tuyển tại đây
    if (job.id) {
      navigate(`/apply/${job.id}`);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.layoutGrid}>
        
        {/* ================= CỘT TRÁI: CHI TIẾT CÔNG VIỆC ================= */}
        <div className={styles.leftColumn}>
          
          {/* Card Header Công Việc */}
          <div className={styles.jobHeaderCard}>
            <h1 className={styles.jobTitle}>{job.title}</h1>
            
            <div className={styles.salaryRow}>
              <span className={styles.salaryText}>{formatSalary(job.salary)}</span>
              <a href="#market-salary" className={styles.marketSalaryLink}>
                Xem mức lương thị trường cho vị trí này &rsaquo;
              </a>
            </div>

            <div className={styles.metaGrid}>
              <div className={styles.metaItem}>
                <div className={styles.iconCircle}>
                  <Icons.Location />
                </div>
                <div className={styles.metaContent}>
                  <span className={styles.metaLabel}>Địa điểm</span>
                  <span className={styles.metaValue}>
                    {job.work_location?.[0]?.city_name || 'Toàn quốc'}
                  </span>
                </div>
              </div>

              <div className={styles.metaItem}>
                <div className={styles.iconCircle}>
                  <Icons.Badge />
                </div>
                <div className={styles.metaContent}>
                  <span className={styles.metaLabel}>Kinh nghiệm</span>
                  <span className={styles.metaValue}>{job.experience_level || 'Không yêu cầu'}</span>
                </div>
              </div>

              <div className={styles.metaItem}>
                <div className={styles.iconCircle}>
                  <Icons.Clock />
                </div>
                <div className={styles.metaContent}>
                  <span className={styles.metaLabel}>Hạn ứng tuyển</span>
                  <span className={styles.metaValue}>{formatDate(job.deadline)}</span>
                </div>
              </div>
            </div>

            <div className={styles.actionRow}>
              <button onClick={handleApplyClick} className={styles.btnApply}>
                <Icons.Send /> Ứng tuyển ngay
              </button>
              <button className={styles.btnSave}>
                <Icons.Heart /> Lưu tin
              </button>
            </div>
          </div>

          {/* Card Tổng quan */}
          <div className={styles.card}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Tổng quan</h2>
              <a href="#similar" className={styles.notifyLink}>
                <Icons.Bell /> Gửi tôi việc làm tương tự
              </a>
            </div>

            <div className={styles.overviewGroup}>
              <span className={styles.overviewLabel}>Yêu cầu:</span>
              <div className={styles.tagList}>
                {job.experience_level && <span className={styles.tag}>{job.experience_level}</span>}
                <span className={styles.tag}>
                  {!job.gender || job.gender === 'NOT_REQUIRED' ? 'Không yêu cầu giới tính' : job.gender}
                </span>
              </div>
            </div>

            <div className={styles.overviewGroup}>
              <span className={styles.overviewLabel}>Chuyên môn:</span>
              <div className={styles.tagList}>
                {job.category && <span className={styles.tag}>{job.category}</span>}
                {job.specialty && <span className={styles.tag}>{job.specialty}</span>}
              </div>
            </div>
          </div>

          {/* Mô tả công việc */}
          {job.description_html && (
            <div className={styles.card}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Mô tả công việc</h2>
              </div>
              <div 
                className={styles.htmlContent}
                dangerouslySetInnerHTML={{ __html: job.description_html }} 
              />
            </div>
          )}

          {/* Yêu cầu ứng viên */}
          {job.requirements_html && (
            <div className={styles.card}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Yêu cầu ứng viên</h2>
              </div>
              <div 
                className={styles.htmlContent}
                dangerouslySetInnerHTML={{ __html: job.requirements_html }} 
              />
            </div>
          )}

          {/* Quyền lợi */}
          {job.benefits_html && (
            <div className={styles.card}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Quyền lợi</h2>
              </div>
              <div 
                className={styles.htmlContent}
                dangerouslySetInnerHTML={{ __html: job.benefits_html }} 
              />
            </div>
          )}

        </div>

        {/* ================= CỘT PHẢI: CÔNG TY & THÔNG TIN CHUNG ================= */}
        <div className={styles.rightColumn}>
          
          {/* Card Thông tin Công ty */}
          {job.company && (
            <div className={styles.companyCard}>
              <div className={styles.companyHeader}>
                {job.company.logo_url && (
                  <img 
                    src={job.company.logo_url} 
                    alt={job.company.company_name || 'Company Logo'} 
                    className={styles.companyLogo} 
                  />
                )}
                <h3 className={styles.companyName}>{job.company.company_name || 'Chưa cập nhật'}</h3>
              </div>

              <div className={styles.companyInfoList}>
                <div className={styles.companyInfoItem}>
                  <span className={styles.infoIcon}><Icons.Users /></span>
                  <span>Quy mô: <strong>{job.company.company_size || 'Chưa cập nhật'}</strong></span>
                </div>
                <div className={styles.companyInfoItem}>
                  <span className={styles.infoIcon}><Icons.Grid /></span>
                  <span>Lĩnh vực: <strong>{job.company.category || 'Chưa cập nhật'}</strong></span>
                </div>
                <div className={styles.companyInfoItem}>
                  <span className={styles.infoIcon}><Icons.Location /></span>
                  <span>
                    Địa điểm: {job.company.address_list?.[0]?.address_detail || job.company.headquarters_address || 'Chưa cập nhật'}
                  </span>
                </div>
              </div>

              {job.company.website && (
                <a 
                  href={job.company.website} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={styles.btnCompanyPage}
                >
                  Xem trang công ty <Icons.ExternalLink />
                </a>
              )}
            </div>
          )}

          {/* Card Thông tin chung */}
          <div className={styles.card}>
            <div className={styles.sectionHeader} style={{ marginBottom: '20px' }}>
              <h2 className={styles.sectionTitle}>Thông tin chung</h2>
            </div>

            <div className={styles.generalInfoList}>
              <div className={styles.generalInfoItem}>
                <div className={styles.generalIcon}><Icons.Badge /></div>
                <div className={styles.generalText}>
                  <span className={styles.generalLabel}>Cấp bậc</span>
                  <span className={styles.generalValue}>{job.job_level || 'Nhân viên'}</span>
                </div>
              </div>

              <div className={styles.generalInfoItem}>
                <div className={styles.generalIcon}><Icons.GraduationCap /></div>
                <div className={styles.generalText}>
                  <span className={styles.generalLabel}>Học vấn</span>
                  <span className={styles.generalValue}>{job.education_level || 'Không yêu cầu'}</span>
                </div>
              </div>

              <div className={styles.generalInfoItem}>
                <div className={styles.generalIcon}><Icons.Users /></div>
                <div className={styles.generalText}>
                  <span className={styles.generalLabel}>Số lượng tuyển</span>
                  <span className={styles.generalValue}>{job.quantity ? `${job.quantity} người` : 'Chưa cập nhật'}</span>
                </div>
              </div>

              <div className={styles.generalInfoItem}>
                <div className={styles.generalIcon}><Icons.Briefcase /></div>
                <div className={styles.generalText}>
                  <span className={styles.generalLabel}>Hình thức làm việc</span>
                  <span className={styles.generalValue}>
                    {formatJobType(job.job_type)}
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default CardDetails;