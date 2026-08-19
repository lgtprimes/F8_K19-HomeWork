import { useState, useMemo } from 'react';
import { 
  Building2, Search, ShieldCheck, ShieldAlert, 
  Eye, CheckCircle, XCircle, MapPin, ExternalLink, Mail, Phone 
} from 'lucide-react';
import styles from './CompanyManagement.module.css';

function CompanyManagement({ initialData }) {
  const [companies, setCompanies] = useState(initialData?.companies || []);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [tierFilter, setTierFilter] = useState('ALL');
  const [selectedCompany, setSelectedCompany] = useState(null);

  // Lọc dữ liệu
  const filteredCompanies = useMemo(() => {
    return companies.filter(comp => {
      const matchSearch = 
        comp.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        comp.tax_code.includes(searchTerm) ||
        comp.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchStatus = statusFilter === 'ALL' || comp.status === statusFilter;
      const matchTier = tierFilter === 'ALL' || comp.verification_tier === tierFilter;

      return matchSearch && matchStatus && matchTier;
    });
  }, [companies, searchTerm, statusFilter, tierFilter]);

  // Thống kê nhanh
  const stats = useMemo(() => ({
    total: companies.length,
    approved: companies.filter(c => c.status === 'APPROVED').length,
    pending: companies.filter(c => c.status === 'PENDING').length,
  }), [companies]);

  // Xử lý Duyệt / Chuyển về chờ duyệt
  const handleUpdateStatus = (id, newStatus) => {
    setCompanies(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
    if (selectedCompany?.id === id) {
      setSelectedCompany(prev => ({ ...prev, status: newStatus }));
    }
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Quản lý Doanh nghiệp</h1>
          <p className={styles.subtitle}>Quản lý thông tin và xét duyệt các công ty trên hệ thống</p>
        </div>
      </div>

      {/* Thẻ Thống kê nhanh */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div>
            <p className={styles.statLabel}>Tổng doanh nghiệp</p>
            <p className={styles.statValue}>{stats.total}</p>
          </div>
          <div className={`${styles.iconWrapper} ${styles.iconBlue}`}><Building2 size={24} /></div>
        </div>
        <div className={styles.statCard}>
          <div>
            <p className={styles.statLabel}>Đã phê duyệt</p>
            <p className={`${styles.statValue} ${styles.statValueApproved}`}>{stats.approved}</p>
          </div>
          <div className={`${styles.iconWrapper} ${styles.iconEmerald}`}><ShieldCheck size={24} /></div>
        </div>
        <div className={styles.statCard}>
          <div>
            <p className={styles.statLabel}>Chờ xét duyệt</p>
            <p className={`${styles.statValue} ${styles.statValuePending}`}>{stats.pending}</p>
          </div>
          <div className={`${styles.iconWrapper} ${styles.iconAmber}`}><ShieldAlert size={24} /></div>
        </div>
      </div>

      {/* Thanh Tìm kiếm & Bộ lọc */}
      <div className={styles.toolbar}>
        <div className={styles.searchWrapper}>
          <Search className={styles.searchIcon} size={18} />
          <input
            type="text"
            placeholder="Tìm theo tên công ty, Mã số thuế, Email..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.filterGroup}>
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className={styles.selectInput}
          >
            <option value="ALL">Tất cả trạng thái</option>
            <option value="APPROVED">Đã duyệt (APPROVED)</option>
            <option value="PENDING">Chờ duyệt (PENDING)</option>
          </select>

          <select
            value={tierFilter}
            onChange={e => setTierFilter(e.target.value)}
            className={styles.selectInput}
          >
            <option value="ALL">Tất cả cấp xác thực</option>
            <option value="VERIFIED">Đã xác thực (VERIFIED)</option>
            <option value="UNVERIFIED">Chưa xác thực (UNVERIFIED)</option>
          </select>
        </div>
      </div>

      {/* Bảng Danh sách Công ty */}
      <div className={styles.tableContainer}>
        <div className={styles.responsiveTable}>
          <table className={styles.table}>
            <thead className={styles.thead}>
              <tr>
                <th className={styles.th}>Doanh nghiệp</th>
                <th className={styles.th}>Mã số thuế</th>
                <th className={styles.th}>Quy mô</th>
                <th className={styles.th}>Xác thực</th>
                <th className={styles.th}>Trạng thái</th>
                <th className={styles.thRight}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredCompanies.map(comp => (
                <tr key={comp.id} className={styles.tbodyTr}>
                  <td className={styles.td}>
                    <div className={styles.companyCell}>
                      <img 
                        src={comp.logo_url} 
                        alt={comp.short_name} 
                        className={styles.logo}
                      />
                      <div>
                        <div className={styles.companyName}>{comp.company_name}</div>
                        <div className={styles.companySub}>{comp.category} • {comp.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className={styles.td}>
                    <span className={styles.taxCode}>{comp.tax_code}</span>
                  </td>
                  <td className={styles.td}>{comp.company_size}</td>
                  <td className={styles.td}>
                    {comp.verification_tier === 'VERIFIED' ? (
                      <span className={styles.badgeVerified}>
                        <ShieldCheck size={14} /> VERIFIED
                      </span>
                    ) : (
                      <span className={styles.badgeUnverified}>
                        UNVERIFIED
                      </span>
                    )}
                  </td>
                  <td className={styles.td}>
                    {comp.status === 'APPROVED' ? (
                      <span className={styles.statusApproved}>
                        <span className={styles.dotApproved}></span> Đã duyệt
                      </span>
                    ) : (
                      <span className={styles.statusPending}>
                        <span className={styles.dotPending}></span> Chờ duyệt
                      </span>
                    )}
                  </td>
                  <td className={styles.tdRight}>
                    <div className={styles.actionGroup}>
                      <button
                        onClick={() => setSelectedCompany(comp)}
                        className={styles.iconBtn}
                        title="Xem chi tiết"
                      >
                        <Eye size={18} />
                      </button>
                      {comp.status === 'PENDING' && (
                        <button
                          onClick={() => handleUpdateStatus(comp.id, 'APPROVED')}
                          className={styles.btnApproveSm}
                        >
                          Duyệt
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Chi tiết Doanh nghiệp */}
      {selectedCompany && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            {/* Modal Header */}
            <div className={styles.modalHeader}>
              <div className={styles.modalHeaderInfo}>
                <img src={selectedCompany.logo_url} alt="" className={styles.modalLogo} />
                <div>
                  <h3 className={styles.modalTitle}>{selectedCompany.company_name}</h3>
                  <p className={styles.modalSub}>MST: {selectedCompany.tax_code} | Đại diện: {selectedCompany.director}</p>
                </div>
              </div>
              <button onClick={() => setSelectedCompany(null)} className={styles.closeBtn}>×</button>
            </div>

            {/* Modal Body */}
            <div className={styles.modalBody}>
              <div className={styles.infoGrid}>
                <div>
                  <span className={styles.infoLabel}>Email liên hệ</span>
                  <div className={styles.infoValue}><Mail size={14}/>{selectedCompany.email}</div>
                </div>
                <div>
                  <span className={styles.infoLabel}>Số điện thoại</span>
                  <div className={styles.infoValue}><Phone size={14}/>{selectedCompany.phone_number}</div>
                </div>
                <div>
                  <span className={styles.infoLabel}>Website</span>
                  <a href={selectedCompany.website} target="_blank" rel="noreferrer" className={`${styles.infoValue} ${styles.link}`}>
                    {selectedCompany.website} <ExternalLink size={12}/>
                  </a>
                </div>
                <div>
                  <span className={styles.infoLabel}>Quy mô</span>
                  <div>{selectedCompany.company_size}</div>
                </div>
              </div>

              <div>
                <span className={styles.infoLabel}>Trụ sở chính</span>
                <p className={styles.addressText}>
                  <MapPin size={16} style={{ shrink: 0, marginTop: '2px', color: '#94a3b8' }}/> 
                  {selectedCompany.headquarters_address}
                </p>
              </div>

              <div>
                <span className={styles.infoLabel}>Giới thiệu công ty</span>
                <div 
                  className={styles.descriptionBox} 
                  dangerouslySetInnerHTML={{ __html: selectedCompany.description_html }} 
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className={styles.modalFooter}>
              {selectedCompany.status === 'PENDING' ? (
                <button
                  onClick={() => handleUpdateStatus(selectedCompany.id, 'APPROVED')}
                  className={styles.btnApprove}
                >
                  <CheckCircle size={16} /> Phê duyệt công ty
                </button>
              ) : (
                <button
                  onClick={() => handleUpdateStatus(selectedCompany.id, 'PENDING')}
                  className={styles.btnReject}
                >
                  <XCircle size={16} /> Chuyển về Chờ duyệt
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CompanyManagement;