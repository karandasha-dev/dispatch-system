import pool from "../config/db.js";
import { io } from "../server.js";

export const getRequests = async (req, res) => {
  try {
    const requests = await pool.query(`
  SELECT
  requests.comment,
    requests.id,
    requests.client_name AS "clientName",
    requests.phone,
    requests.address,
    requests.service_type AS "serviceType",
    requests.request_date AS "date",
    requests.request_time AS "time",
    requests.complexity,
    requests.status,
    requests.team_id AS "teamId",

    requests.lat,
    requests.lng,

    teams.name AS "teamName",
    teams.phone AS "teamPhone",
    teams.district AS "teamDistrict",
    teams.status AS "teamStatus"

  FROM requests

  LEFT JOIN teams
  ON requests.team_id = teams.id
`);

    res.json(requests.rows);
  } catch (error) {
    res.status(500).json({
      message: "Помилка сервера",
    });
  }
};

export const createRequest = async (req, res) => {
  try {
    const {
      clientName,
      phone,
      address,
      serviceType,
      date,
      time,
      complexity,
      status,
      teamId,
      comment,
      lat,
      lng,
    } = req.body;

    const newRequest = await pool.query(
      `
      INSERT INTO requests (
        client_name,
        phone,
        address,
        service_type,
        request_date,
        request_time,
        complexity,
        status,
        team_id,
        comment,
        lat,
        lng
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING  id,
  client_name AS "clientName",
  phone,
  address,
  service_type AS "serviceType",
  request_date AS "date",
  request_time AS "time",
  complexity,
  status,
  team_id AS "teamId",
  comment,
lat,
lng
      `,
      [
        clientName,
        phone,
        address,
        serviceType,
        date,
        time,
        complexity,
        status,
        teamId || null,
        comment || null,
        lat || null,
        lng || null,
      ],
    );

    const createdRequest = await pool.query(
      `
      SELECT
        requests.id,
        requests.client_name AS "clientName",
        requests.phone,
        requests.address,
        requests.service_type AS "serviceType",
        requests.request_date AS "date",
        requests.request_time AS "time",
        requests.complexity,
        requests.status,
        requests.team_id AS "teamId",
        comment,
        requests.lat,
        requests.lng,

        teams.name AS "teamName",
        teams.phone AS "teamPhone",
        teams.district AS "teamDistrict",
        teams.status AS "teamStatus"

      FROM requests
      LEFT JOIN teams
      ON requests.team_id = teams.id
      WHERE requests.id = $1
      `,
      [newRequest.rows[0].id],
    );

    io.emit("requestCreated", createdRequest.rows[0]);

    res.status(201).json(createdRequest.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Помилка сервера",
    });
  }
};

export const updateRequest = async (req, res) => {
  try {
    const requestId = Number(req.params.id);
    const { status } = req.body;

    const updatedRequest = await pool.query(
      `
      UPDATE requests
      SET status = $1
      WHERE id = $2
      RETURNING id
      `,
      [status, requestId],
    );

    if (updatedRequest.rows.length === 0) {
      return res.status(404).json({
        message: "Заявку не знайдено",
      });
    }

    const requestWithTeam = await pool.query(
      `
      SELECT
        requests.id,
        requests.client_name AS "clientName",
        requests.phone,
        requests.address,
        requests.service_type AS "serviceType",
        requests.request_date AS "date",
        requests.request_time AS "time",
        requests.complexity,
        requests.status,
        requests.team_id AS "teamId",
        comment,
        requests.lat,
        requests.lng,

        teams.name AS "teamName",
        teams.phone AS "teamPhone",
        teams.district AS "teamDistrict",
        teams.status AS "teamStatus"

      FROM requests
      LEFT JOIN teams
      ON requests.team_id = teams.id
      WHERE requests.id = $1
      `,
      [updatedRequest.rows[0].id],
    );

    io.emit("requestUpdated", requestWithTeam.rows[0]);

    res.json(requestWithTeam.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Помилка сервера",
    });
  }
};

export const deleteRequest = async (req, res) => {
  try {
    const requestId = Number(req.params.id);

    const deletedRequest = await pool.query(
      `
      DELETE FROM requests
      WHERE id = $1
        RETURNING
  id,
  client_name AS "clientName",
  phone,
  address,
  service_type AS "serviceType",
  request_date AS "date",
  request_time AS "time",
  complexity,
  status,
  team_id AS "teamId"
      `,
      [requestId],
    );

    if (deletedRequest.rows.length === 0) {
      return res.status(404).json({
        message: "Заявку не знайдено",
      });
    }

    io.emit("requestDeleted", requestId);

    res.json({
      message: "Заявку видалено",
      deleted: deletedRequest.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      message: "Помилка сервера",
    });
  }
};
