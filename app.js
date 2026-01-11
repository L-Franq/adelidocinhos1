const express = require("express");
const app = express();
const PORT = 8080 || process.env.PORT;
app.use(express.json());
app.use(express.static("public"));

require("./databases/init");

const mainRoute = require("./routes/main");
app.use(mainRoute);

const dashboardRoute = require("./routes/dashboardRoutes");
app.use(dashboardRoute);


app.listen(PORT, () => console.log(`App running in ${PORT} port`));
