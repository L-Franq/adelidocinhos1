const express = require("express");
const path = require("path");
const app = express();
const PORT = 8080 || process.env.PORT;
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

require("./databases/init");

const mainRoute = require("./routes/main");
app.use(mainRoute);

const dashboardRoute = require("./routes/dashboardRoutes");
app.use(dashboardRoute);

app.listen(PORT, () => console.log(`App running in ${PORT} port`));
