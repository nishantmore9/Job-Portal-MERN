import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./src/utils/db.js"
import userRouter from "./src/router/user.routes.js"
import companyRouter from "./src/router/company.routes.js"
import jobRouter from './src/router/job.routes.js'
import applicationRouter from "./src/router/application.routes.js"

dotenv.config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cookieParser())
const corsOptions = {
  origin : "http//localhost:5173",
  credentials : true
}
app.use(cors(corsOptions))

app.use("/api/v1/user", userRouter)
app.use("/api/v1/company", companyRouter)
app.use("/api/v1/job", jobRouter)
app.use("/api/v1/application", applicationRouter)

const PORT = process.env.PORT || 4000

connectDB()
 .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started at PORT : ${PORT}`);
    })
 })
 .catch((error) => {
    console.log(`error:${error.message}`);
 })
