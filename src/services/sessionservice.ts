import axios from "axios";
import { ISessionInfo } from "../commons/types";
import { ISessionService } from "./types";

export const RestSessionService: ISessionService = {
    async getSessionInfo(url: string): Promise<ISessionInfo> {
        try {
            const response = await axios.get<ISessionInfo>(url, {
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