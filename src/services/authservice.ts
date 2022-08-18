import axios from "axios";
import { IAuthState } from "../commons/types";
import { IAuthService } from "./types";

export const RestAuthService: IAuthService = {
    async startFlow(url): Promise<IAuthState>  {
        try {
            const response = await axios.get<IAuthState>(url, {
                responseType: "json",
                withCredentials: true,
            });
            return response.data;
        }
        catch(err: unknown) {
            console.log(err);
            throw err;
        }
    },

    async submitCallbacks(url, data): Promise<IAuthState>  {
        try {
            const response = await axios.post<IAuthState>(url, data, {
                responseType: "json",
                withCredentials: true,
            });
            return response.data;
        }
        catch(err: unknown) {
            console.log(err);
            throw err;
        }
    }
}

