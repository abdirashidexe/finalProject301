// Im IMPORTING!!!!
import express from "express";
import mariadb from "mariadb";
import session from "express-session";
import dotenv from "dotenv";

// my env
dotenv.config();

// Unique to everyone.
// Connection Limit ensures there arent a million connections
// lookin at the database at the same time. Its probably bad or somethin.
// Too bad we aint doin that.
const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  connectionLimit: 10,
});

// IM CONNECTINGGGG
async function connect() {
  try {
    const conn = await pool.getConnection();
    console.log("Connected to the database!");
    return conn;
  } catch (err) {
    console.log(`Error connecting to the database ${err}`);
  }
}

// Very deeply self explanatory
const app = express();

// Magical words that for some reason make the website work.
app.use(express.urlencoded({ extended: true }));

// Deep magic. Technically saving my secret key in plaintext is
// the worst thing I, or anyone, could do.
// I also do that with my passwords for the users.
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
  })
);

// This is so that when you log in, you go back to the page you were on.
// I barely use it. I will use it more in the future.
app.use((req, res, next) => {
  if (!req.session.originalUrl) {
    req.session.originalUrl = req.originalUrl;
  }
  next();
});

// Kill HTML and EJS shall rise more powerful than you could ever imagine.
app.set("view engine", "ejs");
app.use(express.static("public"));

const PORT = process.env.APP_PORT || 3000;

// Home page
// I have rerouted abunch of stuff to go BACK to the home page.
// Logout? Home page. Filtered Page? Home page. Cart? Actually the cart.
app.get("/", async (req, res) => {
  const conn = await connect();
  const parts = await conn.query("SELECT * FROM parts");
  conn.release();
  res.render("home", {
    parts,
    login: req.session.user || {},
    error: null,
  });
});

// Big beefy boy responsible for login logic.
// We define what we are looking for in the modal, query the database,
// and if we find it, you get rerouted to home and it says welcome.
// If not, it takes you to /login which is nearly identical to the home page
// except it says "Invalid username or password" in red ONLY if you click login again.
// I need to fix that...
app.post("/login", async (req, res) => {
  const { userName, passWord, redirectTo } = req.body;
  const conn = await connect();
  const userQuery =
    "SELECT * FROM users WHERE username = ? AND user_password = ?";
  const users = await conn.query(userQuery, [userName, passWord]);

  if (users.length > 0) {
    req.session.user = users[0];
    conn.release();
    res.redirect(redirectTo || "/");
  } else {
    conn.release();
    // big dumb and ugly. fix.
    res.render("home", {
      parts: [],
      login: {},
      error: "Invalid username or password",
      originalUrl: req.session.originalUrl,
    });
  }
});

// Fucking nuke the session. You are no longer logged in. Womp womp.
app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Error logging out");
    }
    res.redirect("/");
  });
});

// theoritcally admin should not have any user login information.
// thankfully that means we dont need to log in or use sessions.
app.get("/admin", async (req, res) => {
  const conn = await connect();
  const data = await conn.query("SELECT * FROM users;");
  conn.release(); // I AM RELEASING!!!!!
  res.render("admin", { data });
});

// Another big beefy boy. Filtering logic. You would think it would be easy.
// It is not.
// The user has to select their filters. They can select multiple filters.
// We store those filters in an array. Then we gotta check if multiple filters are picked
// or if one is. We Build a big fuckin query depending on whats goin on and then
// process it.
// fun side adventure - if user selected no filters, we redirect back to /
// which is frickin' epic. I love redirecting!!!
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

  conn.release(); // I AM RELEASING!!!!!

  if (filters.length === 0) {
    res.redirect("/");
  } else {
    res.render("home", { parts, login: req.session.user || {}, error: null });
  }
});

// The actual bane of my existance. This took me a majority of the time I have been working.
// This works along side the tocart.js file in the public/scripts folder.
// which procs when you click the "Add to Cart" button.
// technically, you need to recieve something here if you want to view the cart.
// Actually you need two things.
// if you want to view the cart after selecting nothin, you actually get two -1s.
// they dont do nuffin.
// regardless, it works if the user is logged in or not.
// guests can add to cart and view cart. they just cant save their cart.
// users can add to cart, view to cart, and save between sessions.
// This is an ugly mf. It works. OORAH.
// I learnt ALOT about sessions, how they work, and I probably hate myself the
// more I think about doing a really tough concept. Building a STORE??
app.post("/cart", async (req, res) => {
  const { partIds } = req.body;
  console.log("Received partIds:", partIds);
  const conn = await connect();
  let parts = [];
  try {
    const userId = req.session.user ? req.session.user.id : null;
    // user logged in.
    if (userId) {
      // previously selected parts
      const userQuery = `SELECT products_selected FROM users WHERE id = ?`;
      const userResult = await conn.query(userQuery, [userId]);
      let previousParts = userResult[0].products_selected
        ? userResult[0].products_selected.split(",").map((id) => id.trim())
        : [];
      // Merge with newly selected parts and remove duplicates
      const mergedParts = Array.from(
        new Set([...previousParts, ...(partIds || [])])
      );
      // Update the database with the merged list of parts
      const updateQuery = `UPDATE users SET products_selected = ? WHERE id = ?`;
      await conn.query(updateQuery, [mergedParts.join(", "), userId]);
      // Retrieve the parts details for rendering
      const selectQuery = `SELECT * FROM parts WHERE id IN (${mergedParts
        .map(() => "?")
        .join(", ")})`;
      parts = await conn.query(selectQuery, mergedParts);
    }
    // User is not logged in and we are dealing with a guest. We will be only
    // sending them locally stored data that disappears on refresh.
    else if (partIds && partIds.length > 0) {
      const selectQuery = `SELECT * FROM parts WHERE id IN (
      ${partIds.map(() => "?").join(", ")})`;
      parts = await conn.query(selectQuery, partIds);
    }
    conn.release(); // I AM RELEASING!!!!!
  } catch (err) {
    // I AM RELEASING!!!!!
    conn.release();
    console.error("Error executing query:", err);
    return res
      .status(500)
      .json({ success: false, message: "Error executing query" });
  }

  res.render("cart", { parts, login: req.session.user || {} });
});

// local host moment *vine boom*
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
