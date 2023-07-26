/*
Service to manage authentication and authorization
*/

export const getConnection = (token) => {
    const base = process.env.BASE_URL;
    const url = `${base}` + `/auth/connection/`;
    return fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'cache': 'no-store'
        }
    }).then(response => {
        return !!response.ok;
    }).catch(err => {
        console.log(err);
        return JSON.stringify({ success: false, message: 'authentication failed' });
    });
}

export const postLogin = (dataJson) => {
    const base = process.env.BASE_URL;
    const url = `${base}` + `/auth/token/`;

    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'cache': 'no-store'
        },
        body: JSON.stringify(dataJson)
    }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Failed to fetch data from API');
        }
    })
}

export const getUserMe = (token) => {
    const base = process.env.BASE_URL;
    const url = `${base}` + `/auth/me/`;

    return fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'cache': 'no-store'
        }
    }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Failed to fetch data from API');
        }
    })
}