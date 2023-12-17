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
};

module.exports = accountController;
