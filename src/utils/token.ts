export const token = {
    getAccess(){
        return window.localStorage.getItem('accessToken') || ''
    }
}