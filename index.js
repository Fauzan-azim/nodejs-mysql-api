const express = require("express");
const app = express();

require("dotenv").config();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const authRouter = require("./routes/auth.router");
const accountRouter = require("./routes/account.router");

app.use("/auth", authRouter);
app.use("/account", accountRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
