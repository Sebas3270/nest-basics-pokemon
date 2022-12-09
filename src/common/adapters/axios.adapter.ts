import { Injectable } from "@nestjs/common";
import axios from "axios";
import { HttpAdapter } from "../interfaces/http-adapter.interface";

@Injectable()
export class AxiosAdapter implements HttpAdapter{

    private readonly axios = axios;

    async get<T>(url: string): Promise<T> {
        try {
            const { data } = await this.axios.get<T>(url);
            return data;
        } catch (error) {
            throw new Error(`Unexpected error occured, check console logs`)
        }
    }

}