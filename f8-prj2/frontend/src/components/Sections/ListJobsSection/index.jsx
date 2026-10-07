
import { useEffect, useState } from 'react';
import styles from './ListJobsSection.module.css'
import { jobApi } from '../../../api/jobApi.js';
import formatSalary from '../../../utils/formatSalary/index.js'
import { Link } from 'react-router-dom'

function ListJobsSection() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJobs = async () => {
        try {
            setLoading(true);
            // Gọi API GET /jobs
            const res = await jobApi.getAll(); 
            console.log(res);
            
            // Lấy đúng mảng 'data' bên trong Object trả về
            setJobs(res.data || []); 
        } catch (error) {
            console.error('Lỗi khi tải danh sách việc làm:', error);
        } finally {
            setLoading(false);
        }
        };

        fetchJobs();
    }, []);

  if (loading) return <p>Đang tải danh sách công việc...</p>;

    const tmpUrl = 'https://cdn-new.topcv.vn/unsafe/200x/https://static.topcv.vn/company_logos/qN2lo96bft2Llg9c4rBhTS7iBbNpUkMP_1785468751____7344c70d959b8a79ac29890c9e86b10b.png'

    return (
        <section>
            <div className='container'>
                <h2 className={styles.title}>Danh sách công việc</h2>
                <div className={styles.wrapper}>
                    <div className={styles.listItem}>
                        {jobs.map((job, index) => (
                            <div key={index} className={styles.item}>
                                <Link  to={`/cards/${job.slug}`} className={styles.bodyItem} style={{ textDecoration: "none" }}>
                                    <span>
                                        <div className={styles.companyLogo}>
                                            <div className={styles.avatar}>
                                                <img src={tmpUrl} alt="" />
                                            </div>
                                        </div>
                                    </span>
                                    <div className={styles.heading}>
                                        <h3>
                                            <span className={styles.jobLink}>
                                                <div></div>
                                                <strong className={styles.jobTitle}>{job.title}</strong>
                                            </span>
                                        </h3>
                                        <span className={styles.companyName}>
                                            <span>{job.company.company_name}</span>
                                        </span>
                                    </div>
                                </Link>
                                <div className={styles.footerItem}>
                                    <div className={styles.jobDetail}>
                                        <div className={styles.salary}>{formatSalary(job.salary)}</div>
                                        <div className={styles.address}>{job.work_location[0].city_name}</div>
                                    </div>
                                    <div className={styles.jobLike}>
                                        <a href="">
                                            <button className={styles.saveJobs}>
                                                <i className="fa-regular fa-heart"></i>
                                            </button>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ListJobsSection;