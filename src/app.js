const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
const emailRouter = require("../Route/emailRoute");
const port = process.env.PORT || 5000;
require("../db/db");

app.use("/api/email", emailRouter);
app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: 'GET,PUT,PATCH,POST,DELETE',
        // credentials: true, // Enable cookies and credentials for the request (if needed)
    })
);


// Start your server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
