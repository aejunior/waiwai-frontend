import axios, { AxiosResponse } from "axios";
import AuthContext from "../contexts/AuthContext";
import { useContext } from "react";

const baseURL = import.meta.env.VITE_BASE_URL;

// const AxiosClient = () => {
    // const authContext = useContext(AuthContext);
    // return console.log("ola")
    const AxiosInstance = axios.create({
        baseURL: baseURL,
        headers: {
            "Content-Type": "application/json",
        },
    });

    // AxiosInstance.interceptors.request.use((request) => {
    //     if (!request.headers?.Authorization && authContext.data.accessToken)
    //         request.headers.Authorization = `Bearer ${authContext.data.accessToken}`;
    //     return request;
    // });

    // AxiosInstance.interceptors.response.use(
    //     (response: AxiosResponse) => response,
    //     async (error) => {
    //         if (
    //             error.response?.status === 401 &&
    //             !error.config?.headers["NO_RETRY_HEADER"]
    //         ) {
    //             const config = error?.config;
    //             authContext.logout();

    //             config.headers["NO_RETRY_HEADER"] = "true";
    //             return AxiosInstance(config);
    //         }
    //         return Promise.reject(error);
    //     }
    // );
    // return AxiosInstance;
};

// export default AxiosClient;
