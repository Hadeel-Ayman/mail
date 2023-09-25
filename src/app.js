const express = require("express");
const app = express();
app.use(express.json());
const port = process.env.PORT || 5000;
const emailRouter = require("../Route/emailRoute");
require("../db/db");

app.use("/api/email", emailRouter);


app.listen(port, () => {
    console.log("This Application is running On Localhost  " + port);
});