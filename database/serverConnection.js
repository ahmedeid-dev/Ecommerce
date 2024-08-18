import { connect } from "mongoose";
import dotenv from "dotenv"
dotenv.config({ path: "./config/.env" })

// ! configurations for connecting to database
const serverConnection = connect(process.env.MONGO_ATLAS_URL)
    .then(() => {
        // ! if connection is successfull
        console.log("database Connected Successfully")
    })
    .catch((error) => {
        // ! if connection is not successfull
        console.log("Error while connecting to database", error);
    })

// ! exporting serverConnection
export default serverConnection;