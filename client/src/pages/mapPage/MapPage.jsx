import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useSelector, useDispatch } from "react-redux";
import MapClickHandler from "./MapClickHandler";
import RequestForm from "../requestsPage/RequestForm";
import { useNavigate } from "react-router-dom";
import { fetchRequests } from "../../requests/requestsThunk";
import { fetchTeams } from "../../teams/TeamsThunk";

const MapPage = () => {
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTeams());
    dispatch(fetchRequests());
  }, [dispatch]);

  const nav = useNavigate();
  const { list: teams } = useSelector((state) => state.teams);
  const { list: requests } = useSelector((state) => state.requests);

  return (
    <div className="map-page">
      <div className="map-header">
        <h1 className="map-title">Карта бригад</h1>
        <p className="map-subtitle">
          Відображення розташування мобільних бригад та активних заявок
        </p>
      </div>

      <div className="map-wrapper">
        <MapContainer
          center={[50.4501, 30.5234]}
          zoom={12}
          className="leaflet-map"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MapClickHandler
            isCreateMode={isCreateMode}
            setSelectedPosition={setSelectedPosition}
            setSelectedAddress={setSelectedAddress}
          />
          {teams
            .filter(
              (team) =>
                Number.isFinite(Number(team.lat)) &&
                Number.isFinite(Number(team.lng)),
            )
            .map((team) => (
              <Marker
                key={team.id}
                position={[Number(team.lat), Number(team.lng)]}
              >
                <Popup>
                  <strong>Бригада №{team.name}</strong>
                  <br />
                  Район: {team.district}
                  <br />
                  Статус: {team.status === "available" ? "Вільна" : "Зайнята"}
                </Popup>
              </Marker>
            ))}

          {requests
            .filter(
              (request) =>
                Number.isFinite(Number(request.lat)) &&
                Number.isFinite(Number(request.lng)),
            )
            .map((request) => (
              <Marker
                key={request.id}
                position={[Number(request.lat), Number(request.lng)]}
              >
                <Popup>
                  <strong>Заявка №{request.id}</strong>
                  <br />
                  Клієнт: {request.clientName}
                  <br />
                  Адреса: {request.address}
                  <br />
                  Статус: {request.status}
                  <br />
                  Бригада: {request.teamName || "Не призначена"}
                  <br />
                  Коментар: {request.comment || "Немає"}
                </Popup>
              </Marker>
            ))}

          {selectedPosition?.lat && selectedPosition?.lng && (
            <Marker position={[selectedPosition.lat, selectedPosition.lng]}>
              <Popup>Вибрана точка для заявки</Popup>
            </Marker>
          )}
        </MapContainer>
        <button
          onClick={() => {
            setIsCreateMode(!isCreateMode);
            setSelectedPosition(null);
            setSelectedAddress("");
          }}
        >
          {isCreateMode ? "Скасувати точку" : "Створити заявку"}
        </button>
        {selectedPosition && (
          <button
            onClick={() =>
              nav("/requests", {
                state: {
                  address: selectedAddress,
                  lat: selectedPosition.lat,
                  lng: selectedPosition.lng,
                },
              })
            }
          >
            Перейти до форми
          </button>
        )}
      </div>
    </div>
  );
};

export default MapPage;
