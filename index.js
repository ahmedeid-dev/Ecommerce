// ! handling uncaughtException
process.on("uncaughtException", (error) => {
    console.log("uncaughtException Error Occured", error)
})

import serverConnection from "./database/serverConnection.js"
import bootstrap from './src/bootstrap.js';
import express from "express"

const app = express()
const port = 3000

app.use(express.json())
bootstrap(app)

// ! handling unhandledRejection
process.on("unhandledRejection", (error) => {
    console.log("unhandledRejection Error Occured", error)
})

// ! test server connection
app.listen(port, () => console.log(`server running at port ${port}`))