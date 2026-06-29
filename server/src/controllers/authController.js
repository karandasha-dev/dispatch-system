import pool from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userResult = await pool.query(
      `SELECT * FROM users WHERE email = $1`,
      [email],
    );

    if (userResult.rows.length === 0) {
      return res.status(401).json({
        message: "Користувача не знайдено",
      });
    }

    const user = userResult.rows[0];

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Неправильний пароль",
      });
    }

    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        must_change_password: user.must_change_password,
      },
      token,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Помилка сервера",
      error: error.message,
    });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const userId = req.user.id;

    const userResult = await pool.query(`SELECT * FROM users WHERE id = $1`, [
      userId,
    ]);

    if (userResult.rows.length === 0) {
      return res.status(404).json({
        message: "Користувача не знайдено",
      });
    }

    const user = userResult.rows[0];

    const isPasswordValid = await bcrypt.compare(
      oldPassword,
      user.password_hash,
    );
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Старий пароль неправильний",
      });
    }

    const password_hash = await bcrypt.hash(newPassword, 10);

    const updatedUser = await pool.query(
      `
      UPDATE users 
      SET password_hash = $1, 
          must_change_password = false 
      WHERE id = $2
      RETURNING id, name, email, role, must_change_password
      `,
      [password_hash, userId],
    );

    res.json({
      user: updatedUser.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      message: "Помилка сервера",
      error: error.message,
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const userId = req.user.id;
    const currentUser = await pool.query(
      "SELECT id, name, email, role, must_change_password FROM users WHERE id = $1 ",
      [userId],
    );

    res.json({
      user: currentUser.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      message: "Помилка сервера",
      error: error.message,
    });
  }
};
