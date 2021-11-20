import axios from 'axios';

export default () => {
    return axios.creat({
        baseURL: 'http://localhost:3000/'
    })
}