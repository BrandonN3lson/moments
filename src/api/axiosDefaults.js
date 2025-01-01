import axios from "axios"

axios.defaults.baseURL = 'https://drf-api-app-2cb9957fb29d.herokuapp.com/'
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true


// axios interceptors to allow the user to be logged in longer, basically renews the access token
// if it has expired to prevent the user logging in every 5 min
export const axiosReq = axios.create()
export const axiosRes = axios.create()