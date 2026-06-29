import { useState } from "react";
import Select from "react-select";

const ReportFilter = ({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  dateFilter,
  setDateFilter,
  teamFilter,
  setTeamFilter,
}) => {
  const options = [
    { value: "", label: "Всі статуси" },
    { value: "new", label: "Нова" },
    { value: "assigned", label: "Призначена" },
    { value: "in_progress", label: "Виконується" },
    { value: "completed", label: "Завершена" },
  ];

  return (
    <div className="report-filters">
      <input
        className="report-search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        type="text"
        placeholder="Пошук..."
      />

      <Select
        className="report-select"
        classNamePrefix="report-select"
        і
        className="requests-select"
        classNamePrefix="requests-select"
        options={options}
        value={options.find((opt) => opt.value === statusFilter)}
        onChange={(selected) => setStatusFilter(selected.value)}
      />

      <input
        className="report-date"
        type="date"
        value={dateFilter}
        onChange={(e) => setDateFilter(e.target.value)}
      />

      <input
        className="report-team"
        placeholder="Пошук бригади"
        type="text"
        value={teamFilter}
        onChange={(e) => setTeamFilter(e.target.value)}
      />
    </div>
  );
};

export default ReportFilter;
