const API_URL = 'https://dummyjson.com';

async function getNewAccessToken() {
    const refreshToken = localStorage.getItem('refreshToken');
    if(!refreshToken) {
        alert('No refresh token found');
        return;
    }

    try {
        const res = await fetch(`${API_URL}/auth/refresh`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json", 
            },
            body: JSON.stringify({refreshToken: refreshToken})
        
        });
        const data = await res.json();
        const {accessToken, refreshToken: newRefreshToken} = data;

        if(accessToken && newRefreshToken) {
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', newRefreshToken);
        }

    } catch {
        alert('get data failed');
    }
}

async function login(username, password) {
    try {
        const res = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json", 
            },
            body: JSON.stringify({
                username, 
                password
            })
        
        })
        const data = await res.json();
        return data;

    } catch(err) {
        alert('get data failed')
        console.error("Error:", err);
    }
}

async function get(endpoint) {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        alert('get data failed')
        return
    }

    try {
        const response = await fetch(`${API_URL}/${endpoint}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
        });

        if(response.status === 401) {
            await getNewAccessToken();
            return await get(endpoint);
        }

        return await response.json();
    } catch {
        alert('get data failed')

    }
}

async function post(endpoint, body) {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        alert('get data failed')
        return
    }

    try {
        const response = await fetch(`${API_URL}/${endpoint}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(body)
        });

        if(response.status === 401) {
            await getNewAccessToken();
            return await post(endpoint, body);
        }

        return await response.json();
    } catch {
        alert('get data failed')

    }
}

export { login, get, post }