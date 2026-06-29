import { useEffect, useState } from "react";
import { fetchRequests } from "../../requests/requestsThunk";
import { useDispatch, useSelector } from "react-redux";
import ReportFilter from "./ReportFilter";
import useFilteredRequests from "../../hooks/useFilteredRequests";
import PopularService from "./PopularService";
import AnalyticsTeam from "./AnalyticsTeams";

const ReportPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [teamFilter, setTeamFilter] = useState("");
  const { list, loading, error } = useSelector((state) => state.requests);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRequests());
  }, [dispatch]);

  const filteredList = useFilteredRequests({
    list,
    searchQuery,
    statusFilter,
    dateFilter,
    teamFilter,
  });

  return (
    <div className="report-page">
      {loading && (
        <p className="report-message report-loading">Завантаження...</p>
      )}
      {error && (
        <p className="report-message report-error">
          Помилка завантаження звіту
        </p>
      )}

      <div className="report-header">
        <h1 className="report-title">Звіти</h1>

        <p className="report-subtitle">
          Детальний перегляд заявок та призначених клінінгових бригад
        </p>
      </div>

      <ReportFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
        teamFilter={teamFilter}
        setTeamFilter={setTeamFilter}
      />

      <div className="report-table-wrapper">
        <table className="report-table">
          <thead>
            <tr>
              <th>№</th>
              <th>Клієнт</th>
              <th>Телефон</th>
              <th>Адреса</th>
              <th>Послуга</th>
              <th>Дата</th>
              <th>Час</th>
              <th>Складність</th>
              <th>Статус</th>
              <th>Бригада</th>
            </tr>
          </thead>

          <tbody>
            {filteredList.length === 0 && !loading ? (
              <tr>
                <td colSpan="10" className="empty-table-text">
                  Заявок поки немає
                </td>
              </tr>
            ) : (
              filteredList.map((request) => (
                <tr key={request.id}>
                  <td>{request.id}</td>
                  <td>{request.clientName}</td>
                  <td>{request.phone}</td>
                  <td>{request.address}</td>
                  <td>{request.serviceType}</td>
                  <td>{request.date}</td>
                  <td>{request.time}</td>
                  <td>{request.complexity}</td>
                  <td>{request.status}</td>
                  <td>{request.teamName || "Не призначена"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <PopularService filteredList={filteredList} />
      <AnalyticsTeam filteredList={filteredList} />
    </div>
  );
};

export default ReportPage;
