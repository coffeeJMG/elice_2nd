/* eslint-disable prettier/prettier */
import axios from "axios";

// 토큰이 로컬스토리지에서 getItem 으로 변경될 예정

const token = () => {
    return localStorage.getItem("token");
};

// baseURL 은 변수에 공통으로 사용할 경로 설정후 :id 이런식으로 추가하고
// 사용할 때는 ${변수} 이런 방법 예상
export const instance = axios.create({
    baseURL: "http://34.64.69.226:5000/api",
    timeout: 1000,
});

instance.interceptors.request.use(
    (config) => {
        config.headers.Authorization = `Bearer ${token()}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const adminInstance = axios.create({
    baseURL: "http://34.64.69.226:5000/api",
    timeout: 1000,
});

adminInstance.interceptors.request.use(
    (config) => {
        config.headers.Authorization = `Bearer ${token()}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
