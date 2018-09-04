const api = 'http://localhost:50867/api';

const setHeaders = () => {
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    };

    return headers;
}

const constructUrl = (params) => {
    var urlParam = [];
    for (var param in params) {
        urlParam.push(`${param}=${params[param]}`);
    }
    return '?' + urlParam.join('&');
}

const promiseMethod = (res) => {
    if (res.ok) {

        if (res.status === 204) {
            return;
        }

        if (res.status === 201) {
            return;
        }

        return res.json();
    }

    // TODO: throw a valid error, a error model based on api
    throw new Error("Something went wrong bruchacho");
}

export const get = (path, params) => {
    let url = api + path;

    if (params) {
        url += constructUrl(params);
    }

    return fetch(url, { method: 'GET', headers: setHeaders() })
        .then(promiseMethod);
}

export const post = (path, body) => {
    let url = api + path;
    return fetch(url, { method: 'POST', body: JSON.stringify(body), headers: setHeaders() })
        .then(promiseMethod);
}

export const put = (path, body) => {
    let url = api + path;
    return fetch(url, { method: 'PUT', body: JSON.stringify(body), headers: setHeaders() })
        .then(promiseMethod);
}

export const del = (path) => {
    let url = api + path;
    return fetch(url, { method: 'DELETE', headers: setHeaders() })
        .then(promiseMethod);
}