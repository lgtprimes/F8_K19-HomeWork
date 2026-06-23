import { get } from './plugins/api.js'

async function getProfile() {
    const profile = await get('auth/me')
    console.log(profile)
}

async function init() {
    const accessToken = localStorage.getItem('accessToken')
    const refreshToken = localStorage.getItem('refreshToken')

    if (!accessToken || !refreshToken) {
        window.location.href = 'http://127.0.0.1:5500/F8_K19-HomeWork/BaiTapBuoi28/pages/login/index.html'
    }

    await getProfile();
}

init();