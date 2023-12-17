const query = require("../database/index");
const bcrypt = require("bcrypt");

const authController = {
  register: async (req, res) => {
    const { fullname, email, password, no_hp } = req.body;

    if (!fullname || !email || !password || !no_hp) {
      return res.status(400).json({ error: "All fields are required" });
    }

    try {
      const emailExistsQuery = "SELECT * FROM users WHERE email = ?";
      const emailExists = await query(emailExistsQuery, [email]);

      if (emailExists.length > 0) {
        return res.status(400).json({ error: "Email is already registered" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const registerQuery =
        "INSERT INTO users (fullname, email, password, no_hp) VALUES (?, ?, ?, ?)";
      await query(registerQuery, [fullname, email, hashedPassword, no_hp]);

      return res.json({ success: true, message: "Registration successful" });
    } catch (error) {
      console.error("Error during registration:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    try {
      const userQuery = "SELECT * FROM users WHERE email = ?";
      const user = await query(userQuery, [email]);

      if (user.length > 0) {
        // Compare the provided password with the hashed password in the database
        const passwordMatch = await bcrypt.compare(password, user[0].password);

        if (passwordMatch) {
          return res.json({ success: true, user: user[0] });
        } else {
          return res.status(401).json({ error: "Invalid email or password" });
        }
      } else {
        return res.status(401).json({ error: "Invalid email or password" });
      }
    } catch (error) {
      console.error("Error during login:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = authController;
