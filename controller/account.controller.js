const query = require("../database/index");
const bcrypt = require("bcrypt");

const accountController = {
  updateNIK: async (req, res) => {
    const { NIK, id } = req.body;
    if (!NIK) {
      return res.status(400).json({ error: "NIK Kosong" });
    }
    try {
      const updateQuery = "UPDATE users SET NIK = ? WHERE id = ?";
      await query(updateQuery, [NIK, id]);

      return res.json({ success: true, message: "Update successful" });
    } catch (error) {
      console.error("Error during update:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  updateAccount: async (req, res) => {
    const { email, fullname, new_password, id } = req.body;
    if (!email || !fullname || !new_password) {
      return res
        .status(400)
        .json({ error: "Email, name, and new_password are required" });
    }
    try {
      const hashedPassword = await bcrypt.hash(new_password, 10);

      const updateQuery =
        "UPDATE users SET email = ?, fullname = ?, password = ? WHERE id = ?";
      await query(updateQuery, [email, fullname, hashedPassword, id]);

      return res.json({ success: true, message: "Update successful" });
    } catch (error) {
      console.error("Error during update:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getAccount: async (req, res) => {
    const userId = req.params.id;

    try {
      const userQuery =
        "SELECT id, email, fullname, password FROM users WHERE id = ?";
      const [user] = await query(userQuery, [userId]);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Omit the password field for security reasons
      const userData = {
        id: user.id,
        email: user.email,
        fullname: user.fullname,
        password: user.password,
      };

      return res.json(userData);
    } catch (error) {
      console.error("Error during account retrieval:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = accountController;
