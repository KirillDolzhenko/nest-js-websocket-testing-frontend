export default {
    websocket: {
        url: import.meta.env.VITE_URL_WEBSOCKET
    },
    http: {
        url: {
            core: import.meta.env.VITE_URL_HTTP
        }
    },
    frontend: {
        subdir: import.meta.env.VITE_URL_SUBDIR,
    }

}