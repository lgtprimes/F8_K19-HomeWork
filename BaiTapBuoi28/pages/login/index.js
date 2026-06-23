import { login } from '../../plugins/api.js'

const loginForm = document.querySelector(".register-form");

async function onLogin(e) {
    e.preventDefault();

    const username = document.querySelector("input[name='username']").value;
    const password = document.querySelector("input[name='password']").value;
    
    const response = await login(username, password);
    const { accessToken, refreshToken } = response;
    if(accessToken && refreshToken) {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        alert("Login successfully");
    } else {
        alert("Login fail, your username or password incorrect, please check it!");
        return;
    }
    window.location.href = "http://127.0.0.1:5500/F8_K19-HomeWork/BaiTapBuoi28/index.html";
}

loginForm.addEventListener("submit", onLogin);
