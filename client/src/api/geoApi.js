import axios from "axios";

const geoUrl = "https://nominatim.openstreetmap.org/reverse";

export const getGeo = async (lat, lng) => {
  const { data } = await axios.get(geoUrl, {
    params: {
      format: "json",
      lat,
      lon: lng,
    },
  });

  return data.display_name || "";
};
