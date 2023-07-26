
export const getLists = (accessToken) => {
    const base = process.env.BASE_URL;
    const url = `${base}` + `/lists/`;

    return fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
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


export const createList = (accessToken, {name}) => {
    const base = process.env.BASE_URL;
    const url = `${base}` + `/lists/`;

    return fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'cache': 'no-store'
        },
        body: JSON.stringify({
            name: name
        })
    }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Failed to fetch data from API');
        }
    })
}

export const deleteList = (accessToken, pk) => {
    const base = process.env.BASE_URL;
    const url = `${base}` + `/lists/` + pk;

    return fetch(url, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'cache': 'no-store'
        }
    })
}

export const updateList = (accessToken, pk, {name}) => {
    const base = process.env.BASE_URL;
    const url = `${base}` + `/lists/` + pk;

    return fetch(url, {
        method: 'PATCH',
        headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "cache": "no-store",
        },
        body: JSON.stringify({
            name: name
        })
    }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            return response.json().then(data => {
                // Assuming the error message is in the "message" field of the response
                const errorMessage = data.message || 'Unknown error occurred';
                throw new Error(errorMessage);
            });
        }
    })
    .catch(error => {
        // Handle the error here, you can log it or display it to the user.
        console.error('API Error:', error.message);
        // You can also re-throw the error to propagate it further up the chain if needed.
        throw error;
    });
}

export const getList = (accessToken, {slug}) => {
    const base = process.env.BASE_URL;
    const url = base + `/lists/${slug}`;

    return fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'cache': 'no-store'
        }
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            return response.json().then(data => {
                // Assuming the error message is in the "message" field of the response
                const errorMessage = data.message || 'Unknown error occurred';
                throw new Error(errorMessage);
            });
        }
    })
    .catch(error => {
        // Handle the error here, you can log it or display it to the user.
        console.error('API Error:', error.message);
        // You can also re-throw the error to propagate it further up the chain if needed.
        throw error;
    });
}