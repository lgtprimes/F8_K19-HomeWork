import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Lấy ID công việc từ URL (ví dụ: /job/job-001)
import { CardDetails } from "../../components"; 
import { MainLayout } from "../../layouts";
import { jobApi } from "../../api/jobApi";

function CardDetailsPage() {
  const { slug } = useParams(); // Lấy param id từ Route
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobDetail = async () => {
      if(!slug) {
        setError('Không tìm thấy đường dẫn công việc.')
        setLoading(false);
        return
      }
      console.log(">>> Slug nhận từ URL:", slug);
      try {
        setLoading(true);
        setError(null);

        const res = await jobApi.getBySlug(slug);
        console.log(">>> Raw Response từ API:", res);
        const jobData = res?.data || res;
        console.log(jobData);
        
        setJob(jobData)

      } 
      catch(err) {
        console.error("Lỗi khi tải chi tiết công việc:", err);
        setError("Không thể tải thông tin công việc. Vui lòng thử lại sau!");
      }
      finally {
        setLoading(false);
      }
    };

    fetchJobDetail();
  }, [slug]);

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