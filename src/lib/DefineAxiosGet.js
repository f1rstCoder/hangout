import axios from 'axios'

export const getAxios = (url, params = {}) => {
	return axios({
		url: url,
		method: "GET",
		params: params
	})
		.then(res => res.data)
		.catch(err => console.error("This is getAxios err: ", err))
}

