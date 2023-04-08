import express from "express"
import cors from "cors"
import session from "express-session"
import dotenv from "dotenv";
import db from "./config/Database.js";
import SequelizeStore from 'connect-session-sequelize'
import UserRoute from './routes/UserRoute.js';
import ComponentRoute from './routes/ComponentRoute.js'
import AuthRoute from './routes/AutenticationRoute.js'

dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore ({
    db:db
})
// INICIALIZAR LA BD
// (async () => {
//     await db.sync();
// })();

app.use(session({
    secret: process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    store: store,
    cookie : {
        secure: 'auto'
    }
}))

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));

app.use(express.json());
app.use(UserRoute);
app.use(ComponentRoute);
app.use(AuthRoute);

//store.sync();

app.listen(process.env.PORT, () =>{
    console.log(`Server up and running ${process.env.PORT}....`)
})