// ! handling uncaughtException
process.on("uncaughtException", (error) => {
    console.log("uncaughtException Error Occured", error)
})

import serverConnection from "./database/serverConnection.js"
import bootstrap from './src/bootstrap.js';
import express from "express"
import dotenv from "dotenv"
const app = express()
const port = process.env.port || 3000
dotenv.config({ path: "./config/.env" })

app.use(express.json())
app.use(express.static("uploads"))
bootstrap(app)

// ! handling unhandledRejection
process.on("unhandledRejection", (error) => {
    console.log("unhandledRejection Error Occured", error)
})

// ! test server connection
app.listen(port, () => console.log(`server running at port ${port}`))