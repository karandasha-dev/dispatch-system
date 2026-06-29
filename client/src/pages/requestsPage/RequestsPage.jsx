import RequestForm from "./RequestForm";
import RequestCard from "./RequestCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchRequests } from "../../requests/requestsThunk";
import Select from "react-select";
import { useLocation } from "react-router-dom";
import useFilteredRequests from "../../hooks/useFilteredRequests";

const RequestsPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const dispatch = useDispatch();
  const { loading, error, list } = useSelector((state) => state.requests);
  const location = useLocation();

  useEffect(() => {
    dispatch(fetchRequests());
  }, [dispatch]);

  useEffect(() => {
    if (location.state) {
      setIsFormOpen(true);
    }
  }, [location.state]);

  const options = [
    { value: "", label: "Всі статуси" },
    { value: "new", label: "Нова" },
    { value: "assigned", label: "Призначена" },
    { value: "in_progress", label: "Виконується" },
    { value: "completed", label: "Завершена" },
  ];

  const filteredList = useFilteredRequests({
    list,
    searchQuery,
    statusFilter,
    dateFilter,
  });

  return (
    <div className="requests-page">
      <div className="requests-header">
        <h1 className="requests-title">Заявки на прибирання</h1>
        <p className="requests-subtitle">
          Створення, перегляд і розподіл заявок між клінінговими бригадами
        </p>
      </div>

      <div className="requests-controls">
        <input
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
          type="text"
          placeholder="Пошук..."
        />

        <Select
          className="requests-select"
          classNamePrefix="requests-select"
          options={options}
          value={options.find((opt) => opt.value === statusFilter)}
          onChange={(selected) => setStatusFilter(selected.value)}
        />

        <input
          onChange={(e) => setDateFilter(e.target.value)}
          value={dateFilter}
          type="date"
        />

        <button
          className="requests-add-button"
          onClick={() => setIsFormOpen(!isFormOpen)}
        >
          {isFormOpen ? "Закрити" : "Додати заявку"}
        </button>
      </div>

      {isFormOpen && (
        <div className="requests-form-wrapper">
          <RequestForm mapData={location.state} />
        </div>
      )}

      {loading && <p>Завантаження...</p>}
      {error === "error_fetch_requests" && <p>Помилка завантаження заявок</p>}

      <div className="requests-list">
        {filteredList.map((request, index) => (
          <RequestCard number={index + 1} key={request.id} request={request} />
        ))}
      </div>
    </div>
  );
};

export default RequestsPage;
