import { Response } from "express";

export const responseObject = (status: number, res: Response, object: object) => {
    return res.status(status).json({ object })
}

export const errorMessage = (status: number, res: Response, message: string) => {
    return res.status(status).json({
        errors: [
            {
                msg: message,
                location: "body"
            }
        ]
    })
}
