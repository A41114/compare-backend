import  express  from "express";
import bodyParser from "body-parser";
import viewEngine from"./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from './config/connectDB'
import cors from 'cors'

require('dotenv').config();


let app = express();
// Cho phép tất cả các nguồn
// const PORT = 3000;
app.use(cors({ credentials: true, origin: true}));
// app.use(cors({ credentials: true, origin: true }));

app.use(express.json());

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});



//config app
app.use(bodyParser.json({limit:"500mb"}));
app.use(bodyParser.urlencoded({ extended: true}))

viewEngine(app);
initWebRoutes(app);

connectDB();

let port = process.env.PORT || 6969;
//nếu chưa gán port ở file env thì gán bằng 6969


app.listen(port, ()=>{
    //callback
    console.log("Backend Nodejs is running on the port : "+port )
})