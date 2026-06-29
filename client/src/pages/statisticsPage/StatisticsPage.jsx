import StatisticsCards from "./StatisticsCards";

const StatisticsPage = () => {
  return (
    <div className="stats-page">
      <div className="stats-header">
        <h1 className="stats-title">Головна статистика</h1>
        <p className="stats-subtitle">
          Огляд заявок, стану бригад та поточного навантаження системи
        </p>
      </div>

      <StatisticsCards />
    </div>
  );
};

export default StatisticsPage;
