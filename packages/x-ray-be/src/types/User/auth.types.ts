/* eslint-disable @typescript-eslint/no-namespace */
import { Request as ExpressRequest } from 'express';

declare global {
    namespace Express {
        interface Request {
            user: {
                id: string;
                email: string;
                firstName: string;
                lastName: string;
            };
        }
    }
}
