// src/components/VehicleMap.tsx
import React from "react";
import { Truck } from "/src/components/Icons";
import { Vehicle } from "../types";
import mapImage from "/assets/images/google_map_crop.png";

interface VehicleMapProps {
  vehicles: Vehicle[];
  onSelectVehicle: (vehicle: Vehicle) => void;
}

const VehicleMap: React.FC<VehicleMapProps> = ({
  vehicles,
  onSelectVehicle,
}) => {
  const getPosition = (lat: number, lng: number) => {
    return { top: `${lat}%`, left: `${lng}%` };
  };

  return (
    <div className="flex-1 relative mt-14">
      {/* Imagen de fondo */}
      <img
        src={mapImage}
        alt="Mapa"
        className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none"
      />

      {/* Vehículos */}
      {vehicles.map((vehicle) => {
        const pos = getPosition(vehicle.lat, vehicle.lng);
        return (
          <div
            key={vehicle.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
            style={{ top: pos.top, left: pos.left }}
          >
            {/* Info arriba del icono */}
            <div className="flex items-center mb-1 text-xs">
              {/* Placa */}
              <span className="font-bold px-2 bg-white rounded-l shadow">
                {vehicle.id}
                <div className="bg-white text-xs px-2">
                  {vehicle.lastUpdate || "N/A"}
                </div>
              </span>
              {/* Velocidad */}
              <span className="px-2 py-2 bg-black text-white rounded-r shadow">
                {vehicle.speed} km/h
              </span>
            </div>

            {/* Icono del vehículo */}
            <button
              onClick={() => onSelectVehicle(vehicle)}
              className="bg-red-600 p-2 rounded-full shadow-lg flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-red-500"
              aria-label={`Vehículo ${vehicle.id}`}
            >
              <Truck className="text-white" size={24} />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default VehicleMap;
