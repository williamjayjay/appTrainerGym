import axios from "axios";
import { AppError } from "@utils/AppError";

 const api = axios.create({
  baseURL: 'http://localhost:3333',
  timeout: 6000
});


 api.interceptors.response.use((response) => response, (error) => {

  console.log(error.response)
  if(error.response && error.response.data) {
    return Promise.reject(new AppError(error.response.data.message))
  } else {
    return Promise.reject(error)
  }

})

export { api };