import cors from "cors";
import { Request } from "express";
import multer from "multer";

export const corsOptions: cors.CorsOptions = {
    origin: process.env.FE_URL || "*",
    credentials: true,
    preflightContinue: true,
    optionsSuccessStatus: 200,
};


export const filePath = `${process.cwd()}/packages/x-ray-be/src/Xrays/`
export const fileStorage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb): void => {
        cb(null, filePath)
    },
    filename: (req: Request, file: Express.Multer.File, cb): void => cb(null, `${Date.now()}_${file.originalname}`),
});
export const upload = multer({
    storage: fileStorage,
    fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) return cb(new Error("Only image files are allowed!"));

        cb(null, true);
    },
})