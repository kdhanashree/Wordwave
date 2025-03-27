import axios from 'axios'

const axiosInstance = axios.create({
    baseURL : "https://wordwave-fxoa.onrender.com/",
    withCredentials:true
});

export default axiosInstance;