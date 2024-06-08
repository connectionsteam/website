import axios from "axios";
import Cookies from "js-cookie";

export const api = axios.create({
    baseURL: "/api",
    headers: {
        Authorization: Cookies.get("discord_user"),
    },
});