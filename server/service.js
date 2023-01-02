// Ze'ev Ben-Bassat

/* Server Side */

let mongo_client = require('mongodb').MongoClient;
const URL = "mongodb://localhost:27017/";

let express = require('express');
let service = express();

const JWT    = require('jsonwebtoken');
const BCRYPT = require('bcrypt');

const HOST  = "localhost";
const PORT  =  8080;

const WebSocket = require('ws');
const wss = new WebSocket.Server({port: 8082});

/***********/
/* Mongodb */
/***********/

mongo_client.connect(URL, function(error, new_database) {
    if (error) throw error;

    // בסיס הנתונים
    const restaurant = new_database.db("restaurant");

    service.use(express.json());
    service.use(express.urlencoded({extended: true}));
    
    service.use(function (request, response, next) {
        response.setHeader("Access-Control-Allow-Origin"     , "http://localhost:4200");
        response.setHeader("Access-Control-Allow-Methods"    , "POST, GET");
        response.setHeader("Access-Control-Allow-Headers"    , "X-Requested-With,content-type");
        response.setHeader("Access-Control-Allow-Credentials", true);
        response.setHeader("Content-type"                    , "application/json")
        next();
    });
    
    // ניתוב ונתונים
    service.post('/register', (request, response) => {

        // הצפנת סיסמא, יצירת טוקן, והכנסת המשתמש לבסיס הנתונים
        BCRYPT.hash(String(request.body.data.user_password), 10, function(error, hash) {

            const user = {user_email: String(request.body.data.user_email), user_password: hash, flag: true};

            restaurant.collection("users").insertOne(user, function (error) {if (error) throw error;});

            const token = JWT.sign(user.user_email, "shhhhh");
        
            response.json({user_email: user.user_email, token: token});
        });
    });

    service.post('/login', (request, response) => {
        const user_email    = String(request.body.data.user_email);
        const user_password = String(request.body.data.user_password);

        // איחזור משתמש אם קיים ובדיקת הסיסמא
        restaurant.collection("users").find({}).toArray(function (error, result) {
            if (error)
                throw error;
        
            let index = 0, users = result;
                
            while (index < users.length) {
                if (user_email === users[index].user_email) {
                    BCRYPT.compare(user_password, users[index].user_password, function(error, result) {
                        if (result) {
                            const user = {user_email: user_email, flag: true, token: ""};

                            const token = JWT.sign(user.user_email, "shhhhh");
                            user.token  = token;
                            
                            response.json({user_email: user.user_email, flag: user.flag, token: user.token});
                        }
                    });
                }
                
                index++;
            }
        })
    });

    service.post('/orders', (request, response) => {
        restaurant.collection("orders").insertMany(request.body.data, function (error) {if (error) throw error;});
        response.json(request.body.data);
    });

    service.get('/previous-orders', (request, response) => {
        restaurant.collection("orders").find({}).toArray(function (error, result) {
            if (error)
                throw error;

            response.json(result);
        })
    });

    service.listen(PORT, HOST);
});

/*************/
/* Websocket */
/*************/

wss.on("connection", ws => {
    
    console.log("New client connected!");

    // תגובה למסר שמקבלים מהלקוח
    ws.on("message", message => {    
        switch (Number(message)) {
            case 1:
                ws.send(`Opening hours are: 24 hours a day`);
                break;

            case 2:
                ws.send(`Our address is: The Internet`);
                break;
            
            default:
                ws.send(`Option does not exist`);
                break;
        }
    });

    ws.on("close", () => {
        console.log("Client has disconnected!");
    });
});