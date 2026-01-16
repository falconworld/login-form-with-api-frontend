
const API_BASE = '/api/accounts';

const api = {
    async request(endpoint, options = {}) {
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers
        };

        const token = localStorage.getItem('authToken');
        if (token) {
            headers['Authorization'] = `Token ${token}`;
        }

        let response, data;

        try {
            response = await fetch(`${API_BASE}${endpoint}`, {
                ...options,
                headers
            });

            data = await response.json();
        } catch {
            throw 'Network error. Please check your connection.';
        }

        if (!response.ok) {
            throw data;
        }

        return data;
    },

    login(data) {
        return this.request('/auth/login/', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    },

    register(data) {
        return this.request('/auth/register/', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }
};
