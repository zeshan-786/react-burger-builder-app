 import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://react-burger-builder-app-demo-default-rtdb.firebaseio.com/'
})

export default instance
