const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
const emailRouter = require("../Route/emailRoute");
const port = process.env.PORT || 5000;
require("../db/db");

app.use("/api/email", emailRouter);
app.use(cors({
    origin: "http://localhost::3000",
    methods:["GET", "POST", "PUT", "DELETE"],
}))
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });

// Start your server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
