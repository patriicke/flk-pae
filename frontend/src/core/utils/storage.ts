export const storage = {
    getToken: () =>
        JSON.parse(window.localStorage.getItem('access_token') as string),
    setToken: (value: string) =>
        window.localStorage.setItem('access_token', JSON.stringify(value)),
    removeToken: () => window.localStorage.removeItem('access_token'),
};
