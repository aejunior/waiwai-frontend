const baseURL = import.meta.env.VITE_BASE_URL;
import axios, { AxiosResponse } from "axios";

const AxiosClient = () => {

    const AxiosInstance = axios.create({
        baseURL: baseURL,
        headers: {
            "Content-Type": "application/json",
        },
    });

    return AxiosInstance;
}

export default AxiosClient;