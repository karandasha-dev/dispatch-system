import axios from "axios";

const baseUrl = "http://localhost:5000/api/requests";
const teamsUrl = "http://localhost:5000/api/teams";
const authUrl = "http://localhost:5000/api/auth";
const usersUrl = "http://localhost:5000/api/users";

export const getRequests = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export const addRequests = async (newRequest) => {
  const response = await axios.post(baseUrl, newRequest);
  return response.data;
};

export const delRequest = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response.data;
};

export const editStatus = async (id, updatedRequest) => {
  const response = await axios.patch(`${baseUrl}/${id}`, updatedRequest);
  return response.data;
};

export const getTeams = async () => {
  const response = await axios.get(teamsUrl);
  return response.data;
};

export const addTeam = async (newTeam) => {
  const response = await axios.post(teamsUrl, newTeam);
  return response.data;
};

export const updTeam = async (id, updatedTeam) => {
  const response = await axios.patch(`${teamsUrl}/${id}`, updatedTeam);
  return response.data;
};

export const delTeam = async (id) => {
  const response = await axios.delete(`${teamsUrl}/${id}`);
  return response.data;
};

export const logUser = async (userData) => {
  const response = await axios.post(`${authUrl}/login`, userData);
  return response.data;
};

export const addUser = async (newUser) => {
  const response = await axios.post(usersUrl, newUser);
  return response.data;
};

export const getUsers = async () => {
  const response = await axios.get(usersUrl);
  return response.data;
};

export const updUser = async (id, updatedUser) => {
  const response = await axios.patch(`${usersUrl}/${id}`, updatedUser);
  return response.data;
};

export const delUser = async (id) => {
  const response = await axios.delete(`${usersUrl}/${id}`);
  return response.data;
};

export const getMe = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(`${authUrl}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const changePassword = async (passwordData) => {
  const token = localStorage.getItem("token");

  const response = await axios.patch(
    `${authUrl}/change-password`,
    passwordData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};
