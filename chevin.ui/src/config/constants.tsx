const Constants = {
    accessToken: 'Chevin.accessToken',
    refreshToken: 'Chevin.refreshToken',
    schemaVersion: 'Chevin.schemaVersion',

    rootUrl: process.env.REACT_APP_ROOT_URL ? process.env.REACT_APP_ROOT_URL : '',
    apiEndpoint: process.env.REACT_APP_API_ENDPOINT ? process.env.REACT_APP_API_ENDPOINT : '',
    authEndpoint: process.env.REACT_APP_AUTH_ENDPOINT ? process.env.REACT_APP_AUTH_ENDPOINT : '',
}

export default Constants;