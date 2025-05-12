const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const todoRoute = require("./routes/todo");
const errorhandler = require("./middlewares/errorHandler");
const connectDb = require('./config/db');

connectDb();
app.use(cors());
app.use(express.json());
app.use(express.static('public'))


app.use("/api/todo",todoRoute)
app.use("/profile",require("./routes/profile"))
app.use(errorhandler)


const PORT=process.env.PORT  ;
app.listen(PORT,()=> {console.log(`Server running on ${PORT}`)})
