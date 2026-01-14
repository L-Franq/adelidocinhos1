const express = require("express");
const path = require("path");
const app = express();
const PORT = 8080 || process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

require("./databases/init");

const mainRoute = require("./routes/main");
const dashboardRoute = require("./routes/dashboardRoutes");
const fullCalendar = require("./routes/fullCalendarRoute");

app.use(mainRoute);
app.use(dashboardRoute);
app.use(fullCalendar);



app.listen(PORT, () => console.log(`App running in ${PORT} port`));
