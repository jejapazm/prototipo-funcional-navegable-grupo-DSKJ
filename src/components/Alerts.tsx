// src/components/Alerts.tsx
import React, { useState } from "react";
import { alertsData } from "../data/alertsData";
import logoHunter from "/assets/images/logo-hunter.png";

interface Alert {
  id: string;
  type: AlertType;
  code: string;
  message: string;
  lat: number;
  lng: number;
  city: string;
  province: string;
  date: Date;
}

const Alerts: React.FC = () => {
  const [typeFilter, setTypeFilter] = useState<AlertType | "Todas">("Todas");
  const [dateFilter, setDateFilter] = useState<
    "Hoy" | "Esta semana" | "Este mes" | "Últimos 30 días" | "Todos"
  >("Todos");

  const types: (AlertType | "Todas")[] = [
    "Todas",
    "Botón de Pánico",
    "Parqueo Seguro",
  ];
  const dates: (
    | "Todos"
    | "Hoy"
    | "Esta semana"
    | "Este mes"
    | "Últimos 30 días"
  )[] = ["Todos", "Hoy", "Esta semana", "Este mes", "Últimos 30 días"];

  const filteredAlerts = alertsData.filter((alert) => {
    const now = new Date();
    let dateMatch = true;

    if (dateFilter === "Hoy") {
      dateMatch = alert.date.toDateString() === now.toDateString();
    } else if (dateFilter === "Esta semana") {
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - now.getDay());
      startOfWeek.setHours(0, 0, 0, 0);
      dateMatch = alert.date >= startOfWeek;
    } else if (dateFilter === "Este mes") {
      dateMatch =
        alert.date.getMonth() === now.getMonth() &&
        alert.date.getFullYear() === now.getFullYear();
    } else if (dateFilter === "Últimos 30 días") {
      const last30 = new Date();
      last30.setDate(now.getDate() - 30);
      last30.setHours(0, 0, 0, 0);
      dateMatch = alert.date >= last30;
    }

    const typeMatch = typeFilter === "Todas" || alert.type === typeFilter;

    return typeMatch && dateMatch;
  });

  // Render del icono dentro del círculo
  const AlertIcon = ({ type }: { type: AlertType }) => {
    if (type === "Parqueo Seguro") {
      return (
        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-white text-lg font-bold">P</span>
        </div>
      );
    } else {
      return (
        <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-white text-sm font-bold">SOS</span>
        </div>
      );
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-red-600 text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
            <img src={logoHunter} alt="hunter icon" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Alertas</h1>
            <p className="text-xs">
              <span>🔔</span> {filteredAlerts.length} detectadas
            </p>
          </div>
        </div>

        {/* Combobox de fechas */}
        <div className="relative">
          <select
            value={dateFilter}
            onChange={(e) =>
              setDateFilter(
                e.target.value as
                  | "Hoy"
                  | "Esta semana"
                  | "Este mes"
                  | "Últimos 30 días"
                  | "Todos"
              )
            }
            className="appearance-none bg-white text-gray-700 rounded-md px-3 py-1 text-sm font-semibold border border-gray-300 pr-8"
          >
            {dates.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
            <svg
              className="w-4 h-4 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </header>

      {/* Filtros por tipo */}
      <div className="p-3 flex gap-2 overflow-x-auto bg-white shadow">
        {types.map((type) => (
          <button
            key={type}
            className={`px-3 py-1 rounded-full text-xs font-semibold border ${
              typeFilter === type
                ? "bg-red-600 text-white border-red-600"
                : "bg-gray-100 text-gray-700 border-gray-200"
            }`}
            onClick={() => setTypeFilter(type)}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Listado de alertas */}
      <main className="flex-1 overflow-y-auto p-4 space-y-3">
        {filteredAlerts.map((alert) => (
          <div key={alert.id} className="bg-white rounded-lg shadow p-4">
            <div className="flex items-start gap-3">
              {/* Aquí reemplazamos la campanita */}
              <AlertIcon type={alert.type} />
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold">{alert.type}</h3>
                  <span className="text-xs text-gray-500">
                    {alert.date.toLocaleDateString("es-ES", {
                      day: "2-digit",
                      month: "short",
                    })}
                  </span>
                </div>
                <p className="font-semibold text-sm mb-1">{alert.code}</p>
                <p className="text-xs text-gray-600">
                  {alert.message} ({alert.lat},{alert.lng}), {alert.city},{" "}
                  {alert.province}
                </p>
              </div>
            </div>
          </div>
        ))}
        {filteredAlerts.length === 0 && (
          <p className="text-center text-gray-500 mt-10">No hay alertas</p>
        )}
      </main>
    </div>
  );
};

export default Alerts;
