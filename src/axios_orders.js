 import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://react-burger-app-zee.firebaseio.com/'
})

export default instance
