import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import router from "./routers/router";
import { Authentication, Authorization } from "./middlewares/auth.middleware";
import { CRUD, Role, Table } from "./models/permission";

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: "well-something.com"
}))
app.use('/static', Authentication, Authorization(Role.Customer, [{ Table: Table.image, CRUD: CRUD.OnlyRead }]), express.static("./public"))
app.use('/api', router)

export default app