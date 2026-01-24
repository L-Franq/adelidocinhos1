const express = require("express");
const path = require("path");
const app = express();
const session = require("express-session");
const PORT = process.env.PORT || 8080;
const HOST = "0.0.0.0";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "segredo-super-secreto",
    resave: false,
    saveUninitialized: false,
  }),
);

require("./databases/init");

const mainRoute = require("./routes/main");
const admRoute = require("./routes/admRoutes");
const fullCalendar = require("./routes/fullCalendarRoute");
const userAuthRoutes = require("./routes/userRoutes");

app.use(mainRoute);
app.use("/adm", admRoute);
app.use("/agenda", fullCalendar);
app.use("/user", userAuthRoutes);

app.listen(PORT, HOST, () => console.log(`App running in ${PORT} port`));
