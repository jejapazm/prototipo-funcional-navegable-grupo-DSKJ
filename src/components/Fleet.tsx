// src/components/Fleet.tsx
import React, { useState, useEffect } from "react";
import {
  MapPin,
  Truck,
  Menu,
  RefreshCw,
  Crosshair,
  Lock,
  Radio,
  WifiIcon,
  WifiOffIcon,
} from "./Icons";
import { vehiclesData } from "../data/vehiclesData";
import { Vehicle, ModalContent } from "../types";
import CommandModal from "./CommandModal";
import VehicleMap from "/src/widgets/VehicleMap";
import SettingsPage from "./Settings";
import logoHunter from "/assets/images/logo-hunter.png";

const Fleet: React.FC = () => {
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState<ModalContent>({
    title: "",
    message: "",
  });
  const [cardExpanded, setCardExpanded] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsOnline((prev) => !prev);
    }, 10000); // cambia cada 10 segundos

    return () => clearInterval(interval);
  }, []);

  const handleCommand = (command: "location" | "lock") => {
    setModalContent({
      title:
        command === "location" ? "Solicitar Ubicación" : "Bloquear Encendido",
      message:
        command === "location"
          ? "La función principal de este comando es enviar una solicitud de actualización GPS automática al dispositivo de rastreo instalado en su vehículo."
          : "¿Está seguro que desea enviar este comando?",
    });
    setShowModal(true);
  };

  const getPosition = (lat: number, lng: number) => {
    const top = Math.min(Math.max((lat + 0.5) * 40 + 30, 30), 70);
    const left = Math.min(Math.max((lng + 0.5) * 40 + 30, 30), 70);
    return { top: `${top}%`, left: `${left}%` };
  };

  const toggleCard = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).tagName === "BUTTON") return;
    setCardExpanded(!cardExpanded);
  };

  const minHeight = 150;
  const maxHeight = 400;

  return (
    <div className="h-screen flex flex-col">
      {/* Top Bar */}
      <header className="absolute top-0 w-full flex items-center justify-between p-4 z-20">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
            <img src={logoHunter} alt="hunter icon" />
          </div>
          <span className="font-semibold text-black  ml-5">Flota</span>
        </div>
        <div className="flex items-center gap-3">
          {/* Reload (Solicitar Ubicación) */}
          <button
            aria-label="Recargar"
            className="p-2 bg-white rounded-full flex items-center justify-center shadow"
          >
            <RefreshCw className="text-black" size={20} />
          </button>

          {/* Centrar mapa */}
          <button
            aria-label="Centrar mapa"
            className="p-2 bg-white rounded-full flex items-center justify-center shadow"
          >
            <Crosshair className="text-black" size={20} />
          </button>

          {/* Menu */}
          <button
            onClick={() => setSettingsOpen(true)}
            aria-label="Menú"
            className="p-2 bg-white rounded-full flex items-center justify-center shadow"
          >
            <Menu className="text-black" size={20} />
          </button>
        </div>
      </header>

      {/* Mapa simulado */}
      <VehicleMap
        vehicles={vehiclesData}
        onSelectVehicle={(vehicle) => setSelectedVehicle(vehicle)}
      />

      {/* Card desplegable */}
      <div
        className="bg-white rounded-t-3xl shadow-2xl overflow-y-auto transition-all duration-300 z-10"
        style={{ height: `${cardExpanded ? maxHeight : minHeight}px` }}
        onClick={toggleCard}
      >
        <div className="p-4">
          <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4"></div>

          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg flex items-center gap-2">
              {selectedVehicle ? (
                `Unidad ${selectedVehicle.id}`
              ) : (
                <>
                  Unidades
                  {/* Número de vehículos encerrado en un círculo negro */}
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-[#2b2b2b] text-white text-xs font-bold">
                    {vehiclesData.length}
                  </span>
                </>
              )}
            </h3>

            {/* Icono de señal */}
            <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow">
              {isOnline ? (
                <WifiIcon className="text-green-500" size={18} />
              ) : (
                <WifiOffIcon className="text-gray-500" size={18} />
              )}
            </span>
          </div>
          {selectedVehicle ? (
            <div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Estado:</span>
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      selectedVehicle.status === "moving"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {selectedVehicle.status === "moving"
                      ? "En movimiento"
                      : "Detenido"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Velocidad:</span>
                  <span className="font-bold">
                    {selectedVehicle.speed} km/h
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  ({selectedVehicle.lat}, {selectedVehicle.lng}), Tarqui,
                  Mapasingue, Guayas
                </p>
              </div>
              <h3 className="font-bold text-lg flex items-center">Comandos</h3>
              {/* Badge de advertencia de conectividad */}
              {!isOnline && (
                <div className="mb-3">
                  <span className="inline-block bg-red-100 text-red-700 text-xs font-semibold px-3 py-1 rounded-full shadow">
                    Internet inestable, verifica tu conexión
                  </span>
                </div>
              )}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleCommand("location")}
                  disabled={!isOnline}
                  className={`flex flex-col items-center justify-center p-3 rounded-lg transition-colors focus:outline-none focus:ring-2 
      ${
        isOnline
          ? "bg-orange-50 hover:bg-orange-100 focus:ring-orange-500"
          : "bg-gray-100 text-gray-400 cursor-not-allowed"
      }`}
                  aria-label="Solicitar ubicación"
                >
                  <Radio
                    className={
                      isOnline ? "text-orange-600 mb-1" : "text-gray-400 mb-1"
                    }
                    size={24}
                  />
                  <span className="text-xs text-center font-medium">
                    Solicitar Ubicación
                  </span>
                </button>

                <button
                  onClick={() => handleCommand("lock")}
                  disabled={!isOnline}
                  className={`flex flex-col items-center justify-center p-3 rounded-lg transition-colors focus:outline-none focus:ring-2 
      ${
        isOnline
          ? "bg-red-50 hover:bg-red-100 focus:ring-red-500"
          : "bg-gray-100 text-gray-400 cursor-not-allowed"
      }`}
                  aria-label="Bloquear encendido"
                >
                  <Lock
                    className={
                      isOnline ? "text-red-600 mb-1" : "text-gray-400 mb-1"
                    }
                    size={24}
                  />
                  <span className="text-xs text-center font-medium">
                    Bloquear Encendido
                  </span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              {vehiclesData.map((vehicle) => (
                <button
                  key={vehicle.id}
                  onClick={() => setSelectedVehicle(vehicle)}
                  className="w-full p-3 bg-gray-50 hover:bg-gray-100 rounded-lg flex items-center justify-between transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
                  aria-label={`Seleccionar vehículo ${vehicle.id}`}
                >
                  <div className="flex items-center gap-3">
                    <Truck className="text-red-600" size={20} />
                    <div className="text-left">
                      <div className="font-bold">{vehicle.id}</div>
                      <div className="text-xs text-gray-500">
                        {vehicle.speed} km/h
                      </div>
                    </div>
                  </div>
                  <div
                    className={`w-3 h-3 rounded-full ${
                      vehicle.status === "moving"
                        ? "bg-green-500"
                        : "bg-gray-400"
                    }`}
                  ></div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <CommandModal
        isOpen={showModal}
        content={modalContent}
        onClose={() => setShowModal(false)}
        onConfirm={() => setShowModal(false)}
      />
      {/* Modal Settings full-screen */}
      {settingsOpen && (
        <SettingsPage
          open={settingsOpen}
          onClose={() => setSettingsOpen(false)}
        />
      )}
    </div>
  );
};

export default Fleet;
