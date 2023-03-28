import cors from "cors"

export const corsOptions: cors.CorsOptions = {
    origin: process.env.FE_URL || "*",
    credentials: true,
    preflightContinue: true,
    optionsSuccessStatus: 200,
}
