import { Request } from "express";

declare module "express" {
    interface Request {
        query: {
            [key: string]: string | undefined;
        };

        // defaults
    }
}