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
  connectionLimit: 10,
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
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
  })
);
app.use((req, res, next) => {
  if (!req.session.originalUrl) {
    req.session.originalUrl = req.originalUrl;
  }
  next();
});

app.set("view engine", "ejs");
app.use(express.static("public"));

const PORT = process.env.APP_PORT || 3000;

app.get("/", async (req, res) => {
  const conn = await connect();
  const parts = await conn.query("SELECT * FROM parts");
  conn.release();
  res.render("home", {
    parts,
    login: req.session.user || {},
    error: null,
    originalUrl: req.session.originalUrl,
  });
  req.session.originalUrl = null;
});

app.post("/login", async (req, res) => {
  const { userName, passWord, redirectTo } = req.body;
  const conn = await connect();
  const userQuery =
    "SELECT * FROM users WHERE username = ? AND user_password = ?";
  const users = await conn.query(userQuery, [userName, passWord]);
  req.session.user = users[0];
  conn.release();
  res.redirect(redirectTo || "/");
});

app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Error logging out");
    }
    res.redirect("/");
  });
});

app.get("/admin", async (req, res) => {
  const conn = await connect();
  conn.release(); // Release the connection back to the pool
  res.render("admin", { orders });
});

app.post("/filtered", async (req, res) => {
  const conn = await connect();

  let query = "SELECT * FROM parts";
  const filters = [];
  const queryParams = [];

  if (req.body.component) {
    const components = Array.isArray(req.body.component)
      ? req.body.component
      : [req.body.component];
    filters.push(`component_type IN (${components.map(() => "?").join(", ")})`);
    queryParams.push(...components);
  }

  if (req.body.manufacturer) {
    const manufacturers = Array.isArray(req.body.manufacturer)
      ? req.body.manufacturer
      : [req.body.manufacturer];
    filters.push(
      `manufacturer_id IN (${manufacturers.map(() => "?").join(", ")})`
    );
    queryParams.push(...manufacturers);
  }

  if (filters.length > 0) {
    query += " WHERE " + filters.join(" AND ");
  }

  const parts = await conn.query(query, queryParams);

  conn.release(); // Release the connection back to the pool
  if (filters.length === 0) {
    res.redirect("/");
  } else {
    res.render("home", { parts, login: req.session.user || {}, error: null });
  }
});

app.post("/cart", async (req, res) => {
  const conn = await connect();
  const shoppingCart = await conn.query(
    "SELECT username, products_selected FROM users"
  );
  conn.release(); // Release the connection back to the pool
  res.render("cart", {
    shoppingCart,
    login: req.session.user || {},
    originalUrl: req.session.originalUrl,
  });
  req.session.originalUrl = null; // Clear the original URL after rendering
});

// Tell the server to listen on our specified port
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
