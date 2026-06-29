import { useSelector } from "react-redux";
import useFilteredRequests from "../../hooks/useFilteredRequests";

const PopularService = ({ filteredList }) => {
  const service = filteredList.map((request) => request.serviceType);

  const counter = {};

  service.forEach((service) => {
    if (!counter[service]) {
      counter[service] = 1;
    } else {
      counter[service] = counter[service] + 1;
    }
  });

  const popularServiceArr = Object.entries(counter);
  const sortedService = popularServiceArr.sort((a, b) => b[1] - a[1]);

  return (
    <div className="popular-services">
      <h2>Популярні послуги</h2>

      <div className="services-grid">
        {sortedService.map((service) => (
          <div className="service-card" key={service[0]}>
            {service[0]} - {service[1]}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularService;
