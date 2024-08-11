import { connect } from "mongoose";

// ! configurations for connecting to database
const serverConnection = connect(process.env.DATABASE_URL)
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