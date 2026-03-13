require("dotenv").config();

const express = require("express");
const path = require("path");
const helmet = require("helmet");
const app = express();
const session = require("express-session");
const PORT = process.env.PORT || 8080;
const HOST = "0.0.0.0";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.set('trust proxy', 1)
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,
      httpOnly: true,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24,
    },
  }),
);

app.use(helmet());

const criarTabelas = require("./databases/init");
const semearAdm = require("./databases/seed");

async function startAPP() {
  try {
    await criarTabelas();
    await semearAdm();

    app.listen(PORT, HOST, () => {
      console.log(`App running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Falha ao iniciar app", error)
  }
}

startAPP();

const mainRoute = require("./routes/main");
const admRoute = require("./routes/admRoutes");
const fullCalendar = require("./routes/fullCalendarRoute");
const userAuthRoutes = require("./routes/userRoutes");
const whoamiRoute = require("./routes/whoIS");

app.use(mainRoute);
app.use("/adm", admRoute);
app.use("/agenda", fullCalendar);
app.use("/user", userAuthRoutes);
app.use(whoamiRoute);

app.listen(PORT, HOST, () => console.log(`App running on port ${PORT}`));
