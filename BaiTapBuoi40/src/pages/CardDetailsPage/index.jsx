import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Lấy ID công việc từ URL (ví dụ: /job/job-001)
import { CardDetails } from "../../components"; 
import { MainLayout } from "../../layouts";
import jobApi from "../../api/jobApi";

function CardDetailsPage() {
  const { id } = useParams(); // Lấy param id từ Route
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobDetail = async () => {
      try {
        setLoading(true);
        // Nếu không có id trên URL, mặc định lấy job-001 để test
        const jobId = id || "job-001"; 
        
        // Gọi API lấy thông tin chi tiết công việc
        const data = await jobApi.getById(jobId);
        setJob(data);
      } catch (err) {
        console.error("Lỗi khi tải chi tiết công việc:", err);
        setError("Không thể tải thông tin công việc. Vui lòng thử lại sau!");
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetail();
  }, [id]);

  return (
    <MainLayout>
      {/* Hiển thị giao diện theo trạng thái API */}
      {loading && (
        <div style={{ textAlign: "center", padding: "50px 0" }}>
          <p>Đang tải thông tin việc làm...</p>
        </div>
      )}

      {error && (
        <div style={{ textAlign: "center", padding: "50px 0", color: "red" }}>
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && job && (
        <CardDetails job={job} />
      )}
    </MainLayout>
  );
}

export default CardDetailsPage;