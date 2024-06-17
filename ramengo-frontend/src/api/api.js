
const API_URL = window.location.hostname === 'localhost'
    ? 'http://localhost:8000/api'
    : 'https://tech-code-rv.fly.dev/api';
const API_KEY = "ZtVdh8XQ2U8pWI2gmZ7f796Vh8GllXoN7mr0djNf";

export function fetchBroths() {
    return fetch(`${API_URL}/broths`, {
        method: 'GET',
        headers: { 'x-api-key': API_KEY }
    }).then(response => {
        if (!response.ok) {
            throw new Error(`Network response was not ok (${response.status})`);
        }
        return response.json();
    }).catch(error => {
        console.error('Error fetching broths:', error);
        throw error;
    });
}

export function fetchProteins() {
    return fetch(`${API_URL}/proteins`, {
        method: 'GET',
        headers: { 'x-api-key': API_KEY }
    }).then(response => {
        if (!response.ok) {
            throw new Error(`Network response was not ok (${response.status})`);
        }
        return response.json();
    }).catch(error => {
        console.error('Error fetching proteins:', error);
        throw error;
    });
}


export function createOrder(brothId, proteinId) {
    return fetch('https://api.tech.redventures.com.br/orders/generate-id', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'ZtVdh8XQ2U8pWI2gmZ7f796Vh8GllXoN7mr0djNf'
        },
        body: JSON.stringify({ brothId, proteinId })
    }).then(response => {
        if (!response.ok) {
            return response.json().then(errorData => {
                throw new Error(`Network response was not ok: ${errorData.message}`);
            });
        }
        return response.json();
    }).catch(error => {
        console.error('Error creating order:', error);
        throw error;
    });
}