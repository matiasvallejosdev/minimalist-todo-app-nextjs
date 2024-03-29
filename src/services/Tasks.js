
export const getTasks = (accessToken, {slug}) => {
    let url = '';
    if(slug == "upcoming"){
        const base = process.env.BASE_URL
        url = `${base}` + `/tasks/upcoming`
    } else{
        const base = process.env.BASE_URL
        url = `${base}` + `/tasks?list=${slug}`
    }
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

export const countTasks = (accessToken, {slug}) => {
    const base = process.env.BASE_URL;
    const url = `${base}` + `/tasks/count?list=${slug}`

    return fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            'cache': 'no-store'
        }
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

export const updateTask = async (accessToken, id, data) => {
    const base = process.env.BASE_URL
    const url = `${base}` + `/tasks/${id}/`

    return fetch(url, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            'cache': 'no-store',
        },
        body: JSON.stringify(data)
    }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Failed to fetch data from API');
        }
    })
}

export const deleteTask = async (accessToken, id) => {
    const base = process.env.BASE_URL;
    const url = `${base}` + `/tasks/${id}/`;

    return fetch(url, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            'cache': 'no-store',
        },
    })
}

export const createSimpleTask = (accessToken, data) => {
    const base = process.env.BASE_URL;
    const url = `${base}` + `/tasks/`;

    return fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            'cache': 'no-store',
        },
        body: JSON.stringify(data)
    }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Failed to fetch data from API');
        }
    })
}