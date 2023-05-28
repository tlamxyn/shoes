import express from "express";
import cors from "cors";

import router from "./routers/router";

const app = express()

app.use(express.json())
app.use(cors({
    origin: "well-something.com"
}))
app.use('/api', router)

export default app