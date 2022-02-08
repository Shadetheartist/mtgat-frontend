import axios from 'axios'

const backendURL = process.env.VUE_APP_BACKEND_URL

const instance = axios.create({
	baseURL: `http://${backendURL}/backend`,
	timeout: 2000
});

export default instance