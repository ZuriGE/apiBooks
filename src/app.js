const express = require("express");
const cors = require("cors");
const userRouters = require("./routers/user.routers");
const bookRouters = require("./routers/book.routers");
const errorHandling = require("./error/errorHandling");

const app = express();

app.set("port", process.env.PORT || 3000);

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(bookRouters);
app.use(userRouters);
app.use((req, res, next) => {
	res.status(404).json({ error: true, codigo: 404, message: "Endpoint not found" });
});

app.use(errorHandling);

module.exports = app;
