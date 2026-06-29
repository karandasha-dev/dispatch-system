const useFilteredRequests = ({
  list,
  searchQuery,
  statusFilter,
  dateFilter,
  teamFilter = "",
}) => {
  return list.filter((request) => {
    const search = searchQuery.toLowerCase();

    const matchesSearch =
      String(request.clientName || "")
        .toLowerCase()
        .includes(search) ||
      String(request.phone || "").includes(search) ||
      String(request.address || "")
        .toLowerCase()
        .includes(search);

    const matchesStatus =
      statusFilter === "" || request.status === statusFilter;

    const matchesDate = dateFilter === "" || request.date === dateFilter;

    const matchesTeam =
      teamFilter === "" ||
      String(request.teamName || "") === String(teamFilter);

    return matchesSearch && matchesStatus && matchesDate && matchesTeam;
  });
};

export default useFilteredRequests;
