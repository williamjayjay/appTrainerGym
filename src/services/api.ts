    import axios from "axios";
    import { AppError } from "@utils/AppError";

    const api = axios.create({
      baseURL: process.env.EXPO_PUBLIC_API_URL,
      timeout: Number(process.env.EXPO_PUBLIC_SMALL_TIMEOUT)
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