import { useEffect, useState } from 'react';
import { 
    Box, 
    Container, 
    Typography, 
    TextField, 
    Button, 
    Paper, 
    Grid,
    InputAdornment,
    IconButton,
    Alert,
    CircularProgress
} from '@mui/material';
import { 
    Business, 
    Badge, 
    LocationOn, 
    Email, 
    Phone, 
    Language, 
    Lock, 
    Visibility, 
    VisibilityOff 
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import  axiosClient  from '../../api/axiosClient'
import styles from './EmployeeRegisterPage.module.css';

function EmployeeRegisterPage() {
const navigate = useNavigate();

    // State quản lý ẩn/hiện cho từng ô mật khẩu riêng biệt
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // State lưu dữ liệu form
    const [formData, setFormData] = useState({
        tax_code: '',
        company_name: '',
        international_name: '',
        short_name: '',
        director: '',
        headquarters_address: '',
        email: '',
        phone_number: '',
        website: '',
        password: '',
        confirm_password: ''
    });

    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(true); // Trạng thái chờ kiểm tra dữ liệu ban đầu
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Hàm giải mã JWT Token (lấy thông tin user mà không cần gọi API /me)
    const parseJwt = (token) => {
        try {
            return JSON.parse(atob(token.split('.')[1]));
        } catch (err) {
            console.log(err);
            return null;
        }
    };

    useEffect(() => {
        const checkExistingCompany = async () => {
            try {
                // 1. Lấy token và giải mã để lấy thông tin tài khoản đang đăng nhập
                const token = localStorage.getItem('accessToken');
                const decodedToken = token ? parseJwt(token) : null;

                const currentUserId = decodedToken?.id || decodedToken?.sub || decodedToken?.user_id;
                const currentUserEmail = decodedToken?.email;

                // 2. Gọi API lấy danh sách công ty
                const res = await axiosClient.get('/companies');
                const companies = res.data || res || [];

                // 3. Kiểm tra xem user này đã có công ty chưa
                const hasCompany = companies.some(
                    (company) =>
                        (currentUserId && company.user_id === currentUserId) ||
                        (currentUserEmail && company.email === currentUserEmail)
                );

                if (hasCompany) {
                    // Đã đăng ký công ty -> Chuyển thẳng sang trang đăng tin
                    navigate('/employer/post-job', { replace: true });
                    return;
                }
            } catch (error) {
                console.error('Lỗi kiểm tra thông tin công ty:', error);
            } finally {
                setPageLoading(false);
            }
        };

        checkExistingCompany();
    }, [navigate]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        if (errorMessage) setErrorMessage('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 1. Kiểm tra mật khẩu
        if (formData.password !== formData.confirm_password) {
            return setErrorMessage('Mật khẩu xác nhận không khớp!');
        }

        setLoading(true);
        setErrorMessage('');
        setSuccessMessage('');

        try {
            // 2. Gửi dữ liệu đăng ký công ty
            await axiosClient.post('/companies/register', formData);

            setSuccessMessage('Đăng ký thành công! Đang chuyển hướng...');
            setTimeout(() => navigate('/employer/post-job'), 1500);

        } catch (error) {
            const status = error.response?.status;
            const serverMsg = error.response?.data?.detail || error.response?.data?.message;

            // Nếu Backend trả về lỗi do đã đăng ký công ty trước đó
            if (status === 400 || status === 409) {
                setErrorMessage('Tài khoản này đã đăng ký công ty! Đang chuyển hướng...');
                setTimeout(() => navigate('/employer/post-job'), 1500);
                return;
            }

            setErrorMessage(serverMsg || 'Đăng ký thất bại, vui lòng thử lại!');
        } finally {
            setLoading(false);
        }
    };

    if (pageLoading) {
        return (
            <div style={{ textAlign: 'center', padding: '50px' }}>
                Đang kiểm tra thông tin tài khoản...
            </div>
        );
    }
    return (
        <Box className={styles.registerContainer}>
            <Container maxWidth="md" sx={{ py: 6 }}>
                <Paper elevation={0} className={styles.registerCard}>
                    <Box sx={{ textAlign: 'center', mb: 4 }}>
                        <Typography variant="h4" className={styles.title}>
                            Đăng ký tài khoản Nhà tuyển dụng
                        </Typography>
                        <Typography variant="body2" className={styles.subtitle}>
                            Tiếp cận hàng triệu ứng viên chất lượng cao cùng hệ thống của chúng tôi
                        </Typography>
                    </Box>

                    {errorMessage && (
                        <Alert severity="error" sx={{ mb: 3, borderRadius: '8px' }}>
                            {errorMessage}
                        </Alert>
                    )}
                    {successMessage && (
                        <Alert severity="success" sx={{ mb: 3, borderRadius: '8px' }}>
                            {successMessage}
                        </Alert>
                    )}

                    <Box 
                        component="form" 
                        onSubmit={handleSubmit} 
                        noValidate
                        sx={{
                            '& .MuiFormLabel-asterisk': {
                                color: '#ff4d4f',
                                fontWeight: 'bold',
                            }
                        }}
                    >
                        <Grid container spacing={3}>
                            <Grid xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Tên doanh nghiệp"
                                    name="company_name"
                                    value={formData.company_name}
                                    onChange={handleChange}
                                    placeholder="Ví dụ: Công ty Cổ phần Công nghệ F8"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Business color="action" />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>

                            <Grid xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Mã số thuế"
                                    name="tax_code"
                                    value={formData.tax_code}
                                    onChange={handleChange}
                                    placeholder="Nhập mã số thuế"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Badge color="action" />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>

                            <Grid xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Tên quốc tế (Tiếng Anh)"
                                    name="international_name"
                                    value={formData.international_name}
                                    onChange={handleChange}
                                />
                            </Grid>

                            <Grid xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Tên viết tắt"
                                    name="short_name"
                                    value={formData.short_name}
                                    onChange={handleChange}
                                />
                            </Grid>

                            <Grid xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Người đại diện pháp luật / Giám đốc"
                                    name="director"
                                    value={formData.director}
                                    onChange={handleChange}
                                />
                            </Grid>

                            <Grid xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Số điện thoại liên hệ"
                                    name="phone_number"
                                    value={formData.phone_number}
                                    onChange={handleChange}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Phone color="action" />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>

                            <Grid xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Địa chỉ trụ sở chính"
                                    name="headquarters_address"
                                    value={formData.headquarters_address}
                                    onChange={handleChange}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LocationOn color="action" />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>

                            <Grid xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    type="email"
                                    label="Email doanh nghiệp"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Email color="action" />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>

                            <Grid xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Website công ty"
                                    name="website"
                                    value={formData.website}
                                    onChange={handleChange}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Language color="action" />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>

                            {/* Ô Mật khẩu */}
                            <Grid xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    type={showPassword ? 'text' : 'password'}
                                    label="Mật khẩu"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Lock color="action" />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>

                            {/* Ô Xác nhận mật khẩu */}
                            <Grid xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    label="Xác nhận mật khẩu"
                                    name="confirm_password"
                                    value={formData.confirm_password}
                                    onChange={handleChange}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Lock color="action" />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    edge="end"
                                                >
                                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                        </Grid>

                        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                            <Button 
                                variant="outlined" 
                                color="inherit"
                                onClick={() => navigate('/')}
                                sx={{ borderRadius: '8px', px: 4, textTransform: 'none', fontWeight: 600 }}
                            >
                                Hủy
                            </Button>
                            <Button 
                                type="submit" 
                                variant="contained" 
                                disabled={loading}
                                className={styles.submitBtn}
                                sx={{ borderRadius: '8px', px: 5, textTransform: 'none', fontWeight: 600 }}
                            >
                                {loading ? <CircularProgress size={24} color="inherit" /> : 'Hoàn tất đăng ký'}
                            </Button>
                        </Box>
                        <Box sx={{ mt: 3, textAlign: 'center' }}>
                            <Typography variant="body2" color="text.secondary">
                                Bạn đã có tài khoản?{' '}
                                <Link 
                                    component="button"
                                    type="button"
                                    variant="body2" 
                                    onClick={() => navigate('/login')}
                                    sx={{ fontWeight: 600, textDecoration: 'none', cursor: 'pointer' }}
                                >
                                    Đăng nhập
                                </Link>
                            </Typography>
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
}

export default EmployeeRegisterPage;