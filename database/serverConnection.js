import { connect } from "mongoose";

// ! configurations for connecting to database
const serverConnection = connect("mongodb://localhost:27017/ecommerce")
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