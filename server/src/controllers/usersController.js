import pool from "../config/db.js";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
  try {
    const users = await pool.query(`SELECT id, name, email, role FROM users`);
    res.status(201).json(users.rows);
  } catch (error) {
    res.status(500).json({
      message: "Помилка сервера",
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const userId = Number(req.params.id);
    const { password, name, email, role } = req.body;

    const currentUser = await pool.query(`SELECT * FROM users WHERE id = $1`, [
      userId,
    ]);

    if (currentUser.rows.length === 0) {
      return res.status(404).json({
        message: "Користувача не знайдено",
      });
    }

    const user = currentUser.rows[0];

    let password_hash = await bcrypt.hash(password, 10);

    const updatedUser = await pool.query(
      `UPDATE users SET name=$1, email=$2, role = $3,
         password_hash = $4 WHERE id=$5 RETURNING id, name, email, role`,
      [
        name || user.name,
        email || user.email,
        role || user.role,
        password_hash,
        userId,
      ],
    );

    res.status(201).json(updatedUser.rows[0]);
  } catch (error) {
    res.status(500).json({
      message: "Помилка сервера",
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = Number(req.params.id);

    const deletedUser = await pool.query(
      `DELETE FROM users WHERE id = $1 RETURNING *`,
      [userId],
    );

    if (deletedUser.rows.length === 0) {
      return res.status(404).json({
        message: "Користувача не знайдено",
      });
    }

    res.json({
      message: "Користувача видалено",
    });
  } catch (error) {
    res.status(500).json({
      message: "Помилка сервера",
    });
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, password, email, role } = req.body;

    const users = await pool.query(`SELECT * FROM users WHERE email = $1`, [
      email,
    ]);
    if (users.rows.length) {
      return res.status(409).json({
        message: "Користвувач існує",
      });
    }

    const password_hash = await bcrypt.hash(password, 10);

    const newUser = await pool.query(
      `INSERT INTO users (name,
         email,
         password_hash,
         role,
         must_change_password,
         is_active
       ) VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING id, name, email, role, must_change_password, is_active, created_at
      `,
      [name, email, password_hash, role, true, true],
    );

    res.status(201).json(newUser.rows[0]);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Помилка сервера",
      error: error.message,
    });
  }
};
