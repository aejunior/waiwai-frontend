import axios, { AxiosResponse } from "axios";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const AxiosClient = () => {
    const authContext = useContext(AuthContext);

    const AxiosInstance = axios.create({
        baseURL: baseURL,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
    });

    AxiosInstance.interceptors.request.use((request) => {
        if (!request.headers?.Authorization && authContext.data.accessToken)
            request.headers.Authorization = `Bearer ${authContext.data.accessToken}`;
        return request;
    });

    AxiosInstance.interceptors.response.use(
        (response: AxiosResponse) => response,
        async (error) => {
            if (
                error.response?.status === 401 &&
                !error.config?.headers["NO_RETRY_HEADER"]
                //  && authContext.data.refreshToken
            ) {
                const config = error?.config;

                // try {
                //     const result = await axios.post<AuthResponseType>(
                //         "http://localhost:8080/api/auth/refresh",
                //         {},
                //         {
                //             headers: {
                //                 Authorization: `Bearer ${authContext.userInfo.refreshToken}`,
                //             },
                //         }
                //     );

                //     authContext.login({
                //         avatar: result.data.userAvatar,
                //         token: result.data.accessToken,
                //         refreshToken: result.data.refreshToken,
                //         username: result.data.userName
                //     });

                //     config.headers.Authorization = `Bearer ${result.data.accessToken}`;
                // } catch (err) {
                authContext.logout();
                // }

                config.headers["NO_RETRY_HEADER"] = "true";
                return AxiosInstance(config);
            }
            return Promise.reject(error);
        }
    );
    return AxiosInstance;
};

export default AxiosClient;

// class WaiwaiApi {

//     readonly connection = axios.create({
//         baseURL: baseURL,
//     });
//     private accessToken: string;
//     private refreshToken: string;

//     constructor(accessToken: string = '', refreshToken: string = '') {
//         this.accessToken = accessToken;
//         this.refreshToken = refreshToken;
//     }

//     /**
//      * @param {User} user - Objeto de tipo User.
//      * @returns {Promise<Token>} Promise com token de acesso.
//      */
//     async signup(user: User): Promise<Token> {
//         let response = await this.connection.post('/auth/signup', user);
//         let token = response.data;
//         return token;
//     }

//     /**
//      * @param {Credentials} credentials - Objeto de tipo Credentials.
//      * @returns {Promise<Token>} Promise com token de acesso.
//      */
//     async signin(credentials: Credentials): Promise<Token> {
//         let response = await this.connection.post('/auth/signin', credentials);
//         let token = response.data;
//         return token;
//     }

//     // Palavras

//     async getWords(): Promise<any> { }

//     async getWord(): Promise<any> { }

//     async postWord(): Promise<any> { }

//     async putWord(): Promise<any> { }

//     async deleteWord(): Promise<any> { }

//     // Palavras Significados

//     async getMeaningsByWordId(): Promise<any> { }

//     async postMeaningByWordId(): Promise<any> { }

//     // Significados

//     async getMeaning(): Promise<any> { }

//     async putMeaning(): Promise<any> { }

//     async deleteMeaning(): Promise<any> { }

//     // Categorias

//     async getCategories(): Promise<any> { }

//     async getCategory(): Promise<any> { }

//     async postCategory(): Promise<any> { }

//     async putCategory(): Promise<any> { }

//     async deleteCategory(): Promise<any> { }

//     // Referências

//     async getReferences(): Promise<any> { }

//     async getReference(): Promise<any> { }

//     async postReference(): Promise<any> { }

//     async putReference(): Promise<any> { }

//     async deleteReference(): Promise<any> { }

//     // Palavra Anexos

//     async getAttachmentsByWordId(): Promise<any> { }

//     async postAttachmentByWordId(): Promise<any> { }

//     // Anexos

//     async getAttachment(): Promise<any> { }

//     async deleteAttachment(): Promise<any> { }

// }

// export default WaiwaiApi;
