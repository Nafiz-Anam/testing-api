const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

//route import
const authRoute = require("./routes/auth");
const billRouter = require("./routes/billing");

const port = process.env.PORT || 5000;
const app = express();

//middle-wares
const corsOptions = {
    origin: [
        "*",
        "https://ph-instructor-task.netlify.app",
        "http://ph-instructor-task.netlify.app",
        "http://localhost:3001",
        "http://localhost:3000",
    ],
    credentials: true,
    optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());

//mongodb connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.3t2vk.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
async function run() {
    try {
        // mongoose connection here
        mongoose.connect(
            uri,
            { useNewUrlParser: true, useUnifiedTopology: true },
            () => console.log("Mongoose is connected")
        );
        //api endpoint
        app.use("/api", authRoute);
        app.use("/api", billRouter);
    } finally {
        // await client.close();
    }
}

run().catch(console.dir);

app.get("/", (req, res) => {
    res.send("Ph-instructor-task-API");
});

app.listen(port, () => {
    console.log(`listening at ${port}`);
});
