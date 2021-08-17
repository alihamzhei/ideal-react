import axios from "axios";
import { toast } from 'react-toastify';


const instance = axios.create({
  baseURL: ' http://127.0.0.1:8000/api/v1/',
  Accepted: 'application/json',
  ContentType: 'application/json'
});

instance.defaults.timeout = 2500;
instance.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('token');

let setHeader = () => {
  instance.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('token');
}


instance.interceptors.request.use(function (config) {
  return config;
}, function (error) {

  return Promise.reject(error.response);
});

instance.interceptors.response.use(function (response) {
  return response;
}, function (error) {

  if (error && error.response) {
    switch (error.response.status) {
      case 422:
        for (const property in error.response.data.errors) {
          toast.error(error.response.data.errors[property].toString());
        }
        break;

      default:
        break;
    }
  }

  return Promise.reject(error.response);
});
export  {instance , setHeader};