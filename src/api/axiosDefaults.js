import axios from "axios"

axios.defaults.baseURL = 'https://drf-api-app-2cb9957fb29d.herokuapp.com/'
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true
