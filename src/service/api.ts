import axios from "axios";

export const api = axios.create({
    baseURL: "https://todo-backend-production-3543.up.railway.app"
})