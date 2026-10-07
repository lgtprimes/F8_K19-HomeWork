import { useState, useEffect } from "react";
import { AdminLayout } from "../../layouts";
import { CompanyManagement } from "../../components";
import { jobApi } from "../../api/jobApi";

function CompaniesPage() {
  const [companyData, setCompanyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    jobApi
      .getAll()
      .then((data) => {
        if (Array.isArray(data)) {
          setCompanyData({ companies: data });
          console.log(setCompanyData({ companies: data }));
          
        } else {
          setCompanyData(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi khi tải danh sách công ty:", err);
        setError("Không thể tải dữ liệu từ máy chủ!");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <AdminLayout>
        <div style={{ padding: "20px", textAlign: "center" }}>
          Đang tải danh sách công ty...
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div style={{ padding: "20px", textAlign: "center", color: "red" }}>
          {error}
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <CompanyManagement initialData={companyData} />
    </AdminLayout>
  );
}

export default CompaniesPage;