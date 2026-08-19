    import * as React from 'react';
    import AppBar from '@mui/material/AppBar';
    import Box from '@mui/material/Box';
    import Toolbar from '@mui/material/Toolbar';
    import IconButton from '@mui/material/IconButton';
    import Typography from '@mui/material/Typography';
    import Menu from '@mui/material/Menu';
    import MenuIcon from '@mui/icons-material/Menu';
    import Container from '@mui/material/Container';
    // import Avatar from '@mui/material/Avatar';
    import Button from '@mui/material/Button';
    // import Tooltip from '@mui/material/Tooltip';
    import MenuItem from '@mui/material/MenuItem';
    // import AdbIcon from '@mui/icons-material/Adb';
    import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
    import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
    import { BasicButton } from '../../index.jsx'
    import styles from './Header.module.css'
    import clsx from 'clsx';
    import { useNavigate } from 'react-router-dom';

    const pages = ['Việc làm', 'Tạo CV', 'Công cụ', 'Cẩm nang nghề nghiệp', 'TopCV'];
    // const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

    function Header() {
        const navigate = useNavigate();
        const [anchorElNav, setAnchorElNav] = React.useState(null);
        // const [anchorElUser, setAnchorElUser] = React.useState(null);
        const [hovered, setHovered] = React.useState(null);

        const handleOpenNavMenu = (event) => {
            setAnchorElNav(event.currentTarget);
        };
        // const handleOpenUserMenu = (event) => {
        //     setAnchorElUser(event.currentTarget);
        // };

        const handleCloseNavMenu = () => {
            setAnchorElNav(null);
        };

        // const handleCloseUserMenu = () => {
        //     setAnchorElUser(null);
        // };

        return (
            <AppBar position="sticky" sx={{
                backgroundColor: '#ffffff',
                boxShadow: 'none',
                borderBottom: '1px solid #e9eaec'
            }}>
            <Container maxWidth="2xl" sx={{ margin: 0}}>
                <Toolbar sx={{ height: 72 }} disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                        pr: '20px',
                        display: { xs: 'none', md: 'flex' },
                        fontFamily: 'monospace',
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                        height: '72px'
                        }}
                    >
                        <img src="https://static.topcv.vn/v4/image/logo/topcv-logo-7.png" alt="" />
                    </Typography>
                        
                    {/* Responsive Menu */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenNavMenu}
                        color="inherit"
                        >
                        <MenuIcon />
                        </IconButton>
                        <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{ display: { xs: 'block', md: 'none' } }}
                        >
                        {pages.map((page) => (
                            <MenuItem key={page} onClick={handleCloseNavMenu}>
                                <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                            </MenuItem>
                        ))}
                        </Menu>
                    </Box>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                        mr: 2,
                        display: { xs: 'flex', md: 'none' },
                        flexGrow: 1,
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                        <Button
                            disableRipple disableFocusRipple
                            key={page}
                            onClick={handleCloseNavMenu}
                            onMouseEnter={() => setHovered(page)}
                            onMouseLeave={() => setHovered(null)}
                            sx={{ 
                                px: '16px', py: '26px', 
                                color: '#263A4D', 
                                display: 'flex', 
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '14px', lineHeight: 1.4, fontWeight: 600, letterSpacing: '0.235px',
                                textTransform: 'none',
                                height: '72px',
                                gap: '4px',
                                '&:hover': {
                                    backgroundColor: 'transparent',
                                    color: 'var(--success)'
                                },
                            }}
                        >
                            {page}
                            {page !== 'TopCV' && (
                                hovered === page ? (
                                    <KeyboardArrowUpIcon sx={{ fontSize: 16 }} />
                                ) :
                                    (<KeyboardArrowDownIcon sx={{ fontSize: 16 }} />)
                            )}
                            {page === 'TopCV' && (
                                <Box
                                    className="job-pro-icon"
                                    sx={{
                                    ml: 0.5,
                                    alignItems: 'center',
                                    borderRadius: '111px',
                                    color: '#513101',
                                    display: 'flex',
                                    fontFamily: 'Inter, sans-serif',
                                    fontSize: '12px',
                                    background: 'var(--Linear, linear-gradient(259deg, #ffb94b -3.83%, #ffe7bf 44.19%, #ffb94b 92.22%))',
                                    fontWeight: 600,
                                    height: '24px',
                                    justifyContent: 'center',
                                    letterSpacing: '.01em',
                                    lineHeight: '14.52px',
                                    textAlign: 'center',
                                    width: '40px',
                                    position: 'relative',
                                    '&::after': {
                                        // background: 'linear-gradient(90deg, #e88a1e 0, transparent)',
                                        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                                        WebkitMaskComposite: 'xor',
                                        borderRadius: 'inherit',
                                        content: '""',
                                        inset: 0,
                                        padding: '1px',
                                        pointerEvents: 'none',
                                        position: 'absolute',
                                    },
                                    }}
                                >
                                    <span>Pro</span>
                                </Box>
                            )}
                        </Button>
                        ))}
                    </Box>
                    {/* <Box sx={{ flexGrow: 0, }}>
                        <Tooltip title="Open settings" sx={{display: { xs: 'none', md: 'flex' }}}>
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                        </IconButton>
                            
                        </Tooltip>
                            
                        <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                        >
                        {settings.map((setting) => (
                            <MenuItem key={setting} onClick={handleCloseUserMenu}>
                            <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                            </MenuItem>
                        ))}
                        </Menu>
                    </Box> */}
                    <Box sx={{ flexGrow: 0, 
                        display: { xs: 'none', md: 'flex' }, 
                        alignItems: 'center', 
                        gap: '12px',
                        height: '72px',
                        
                        }}>
                        <BasicButton variant={'primaryOutline'} className={styles.loginBtn}>
                            Đăng Ký
                        </BasicButton>
                        <BasicButton 
                            className={styles.loginBtn}
                            onClick={() => navigate('/login')}
                        >
                            Đăng nhập
                        </BasicButton>
                        <BasicButton 
                            variant='outline' 
                            className={clsx(styles.loginBtn, styles.findFileBtn)}
                            onClick={() => navigate('/employer/post-job')}
                        >
                            Đăng tuyển tìm hồ sơ
                        </BasicButton>
                    </Box>
                    
                </Toolbar>
            </Container>
            </AppBar>
        );
    }
    export default Header;
