import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import router from "./routers/router";

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: true}))
app.use(cors({
    origin: "well-something.com"
}))
app.use('/api', router)

export default app