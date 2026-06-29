import { useMapEvents } from "react-leaflet";
import { getGeo } from "../../api/geoApi";

const MapClickHandler = ({
  isCreateMode,
  setSelectedPosition,
  setSelectedAddress,
}) => {
  useMapEvents({
    async click(e) {
      if (!isCreateMode) return;

      const position = {
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      };

      setSelectedPosition(position);

      try {
        const address = await getGeo(position.lat, position.lng);
        setSelectedAddress(address);
      } catch (error) {
        console.log("Помилка отримання адреси", error);
      }
    },
  });

  return null;
};

export default MapClickHandler;
