export const api = process.env.REACT_APP_API;
export const uploads = process.env.REACT_APP_API_UPLOADS;

export const requestConfig = (method, data, token = null, image = null) => {

    let config

    if (image) {
        config = {
            method,
            body: data,
            headers: {},
        }
    } else if (method === "DELETE" || data === null) {
        config = {
            method,
            headers: {},
        }
    } else {
        config = {
            method,
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json"
            },
        }
    }

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
}