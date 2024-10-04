import axios from "axios";

import { API_SERVICES } from "@/common/config/api-services";

const axiosClients = {
    default: axios.create()
};

export const getAxiosClient = (apiService) => {
    if (!apiService) {
        return axiosClients.default;
    }

    if (!axiosClients[apiService]) {
        let baseURL;

        switch (apiService) {
            case API_SERVICES.DummyJson:
                baseURL = process.env.NEXT_PUBLIC_DUMMY_JSON_BASE_URL;
                break;
            default:
                throw new Error(`Unknown service type: ${apiService}`);
        }

        axiosClients[apiService] = axios.create({
            baseURL,
        });
    }

    return axiosClients[apiService];
};
