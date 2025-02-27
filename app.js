import express from 'express';
import mariadb from 'mariadb';
import { validateForm } from './services/validation.js';
import dotenv from 'dotenv';

dotenv.config();

//Define our database credentials
const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

//Define function to connect to the DB
async function connect() {
    try {
        const conn = await pool.getConnection();
        console.log('Connected to the database!')
        return conn;
    } catch (err) {
        console.log(`Error connecting to the database ${err}`)
    }
}

const app = express();

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.use(express.static('public'));

const PORT = process.env.APP_PORT || 3000;

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/admin', async (req, res) => {

    const conn = await connect();
    const orders = await conn.query('SELECT * FROM orders')
    console.log(orders);

    // res.render('order-summary', { orders });
});

//Tell the server to listen on our specified port
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
