const AnalyticsTeam = ({ filteredList }) => {
  const team = filteredList
    .map((request) => request.teamName)
    .filter((team) => team !== "");

  const counter = {};

  team.forEach((team) => {
    if (!counter[team]) {
      counter[team] = 1;
    } else {
      counter[team] = counter[team] + 1;
    }
  });

  const teamArr = Object.entries(counter);
  const sortedTeams = teamArr.sort((a, b) => b[1] - a[1]);

  return (
    <div className="analytics-teams">
      <h2 className="analytics-title">Зайнятість бригад</h2>

      <div className="teams-grid">
        {sortedTeams.map((team) => (
          <div className="team-card" key={team[0]}>
            <div className="team-name">Бригада №{team[0]}</div>

            <div className="team-count">{team[1]}</div>

            <div className="team-label">заявок</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnalyticsTeam;
