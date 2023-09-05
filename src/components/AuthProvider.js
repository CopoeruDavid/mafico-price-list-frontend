const authProvider = {
    login: ({ username, password }) => {
        const request = new Request('http://192.168.1.63:8000/auth/signin/', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        });
        return fetch(request)
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(auth => {
                localStorage.setItem('token', auth.json()['token']);
                return { redirectTo: false };
            })
            .catch(() => {
                throw new Error('Network error')
            });
    },
    logout: () => {
        localStorage.setItem('not_authenticated', true);
        localStorage.removeItem('role');
        localStorage.removeItem('token');
        return Promise.resolve();
    },
    checkError: ({ status }) => {
        return status === 401 || status === 403
            ? Promise.reject()
            : Promise.resolve();
    },
    checkAuth: () => {
        return localStorage.getItem('token')
            ? Promise.reject()
            : Promise.resolve();
    },
    getPermissions: () => {
        const role = localStorage.getItem('role');
        return Promise.resolve(role);
    },
};

export default authProvider