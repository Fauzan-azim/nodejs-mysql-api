const express = require("express");
const app = express();

require("dotenv").config();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const authRouter = require("./routes/auth.router");

app.use("/auth", authRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT,() => {
  console.log(`Server is running on  port ${PORT}`);
});
