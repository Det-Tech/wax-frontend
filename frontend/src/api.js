import axios from 'axios'

export default {
    // Need better naming
    getData (url, data) {
        return axios.post(url, data)
    }
}
