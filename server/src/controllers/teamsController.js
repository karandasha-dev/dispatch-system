import pool from "../config/db.js";
import { io } from "../server.js";

export const getTeams = async (req, res) => {
  try {
    const teams = await pool.query("SELECT * FROM teams");

    res.status(200).json(teams.rows);
  } catch (error) {
    res.status(500).json({
      message: "Помилка сервера",
    });
  }
};

export const createTeam = async (req, res) => {
  try {
    const { name, members, phone, district, status } = req.body;

    const newTeam = await pool.query(
      `
      INSERT INTO teams
      (name, members, phone, district, status)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
      `,
      [name, members, phone, district, status],
    );

    io.emit("teamCreated", newTeam.rows[0]);

    res.status(201).json(newTeam.rows[0]);
  } catch (error) {
    res.status(500).json({
      message: "Помилка сервера",
    });
  }
};

export const updateTeam = async (req, res) => {
  try {
    const teamId = Number(req.params.id);
    const { status } = req.body;

    const updatedTeam = await pool.query(
      `
      UPDATE teams
      SET status = $1
      WHERE id = $2
      RETURNING *
      `,
      [status, teamId],
    );

    if (updatedTeam.rows.length === 0) {
      return res.status(404).json({
        message: "Бригаду не знайдено",
      });
    }

    io.emit("teamUpdated", updatedTeam.rows[0]);

    res.json(updatedTeam.rows[0]);
  } catch (error) {
    res.status(500).json({
      message: "Помилка сервера",
    });
  }
};

export const deleteTeam = async (req, res) => {
  try {
    const teamId = Number(req.params.id);

    await pool.query(
      `
      UPDATE requests
      SET team_id = NULL
      WHERE team_id = $1
      `,
      [teamId],
    );

    const deletedTeam = await pool.query(
      `
      DELETE FROM teams
      WHERE id = $1
      RETURNING *
      `,
      [teamId],
    );

    if (deletedTeam.rows.length === 0) {
      return res.status(404).json({
        message: "Бригаду не знайдено",
      });
    }

    io.emit("teamDeleted", teamId);

    res.json({
      message: "Бригаду видалено",
      deleted: deletedTeam.rows[0],
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Помилка сервера",
    });
  }
};
