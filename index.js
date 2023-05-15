const express = require("express");
const app = express();
const PORT = 8081 || process.env.PORT;
const moviesController = require("./controller/movies.controller");
const usersController = require("./controller/users.controller");
const authController = require("./controller/auth.controller");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const specs = require("./config/swagger");

app.use(morgan("combined"));
app.use(bodyParser.json());
app.use("/movies", moviesController);
app.use("/users", usersController);
app.use("/auth", authController);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

app.get("/ping", (req, res) => {
  res.json({ ping: true });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
