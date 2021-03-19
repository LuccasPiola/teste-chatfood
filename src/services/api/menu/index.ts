import axios from 'axios'

const menuAPI = axios.create({
  baseURL: 'https://chatfood-cdn.s3.eu-central-1.amazonaws.com/',
})

export default menuAPI
