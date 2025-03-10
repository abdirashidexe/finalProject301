import express from "express";
import mariadb from "mariadb";
import session from "express-session";
import dotenv from "dotenv";

dotenv.config();

// Define our database credentials
const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// Define function to connect to the DB
async function connect() {
  try {
    const conn = await pool.getConnection();
    console.log("Connected to the database!");
    return conn;
  } catch (err) {
    console.log(`Error connecting to the database ${err}`);
  }
}

const app = express();

app.use(express.urlencoded({ extended: true }));

// Set up login stuff
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
  })
);

app.set("view engine", "ejs");
app.use(express.static("public"));

const PORT = process.env.APP_PORT || 3000;

app.get("/", async (req, res) => {
  const conn = await connect();
  const parts = await conn.query("SELECT * FROM parts");
  res.render("home", { parts, login: req.session.user || {}, error: null });
});

app.post("/login", async (req, res) => {
  const { userName, passWord } = req.body;
  const conn = await connect();
  const userQuery =
    "SELECT * FROM users WHERE username = ? AND user_password = ?";
  const users = await conn.query(userQuery, [userName, passWord]);

  // just nuke the session.
  app.post("/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).send("Error logging out");
      }
      res.redirect("/");
    });
  });

  if (users.length > 0) {
    req.session.user = users[0];
    res.redirect("/");
  } else {
    const parts = await conn.query("SELECT * FROM parts");
    res.render("home", {
      parts,
      login: {},
      error: "Invalid username or password",
    });
  }
});

app.get("/admin", async (req, res) => {
  const conn = await connect();
  const orders = await conn.query("SELECT * FROM shopping_cart");
  res.render("admin", { orders });
});

app.get("/confirmed", (req, res) => {
  res.render("confirmed");
});

app.get("/Advanced_Filters", (req, res) => {
  res.render("filters");
});

app.get("/cart", async (req, res) => {
  const conn = await connect();
  const shoppingCart = await conn.query("SELECT * FROM shopping_cart");
  res.render("cart", { shoppingCart });
});

// Tell the server to listen on our specified port
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
