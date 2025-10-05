import React from "react";
import { MessageCircle } from "./Icons";
import logoHunter from "/assets/images/logo-hunter.png";

interface ReportsProps {
  onChatClick: () => void;
}

const Reports: React.FC = () => (
  <div className="h-screen flex flex-col bg-gray-50">
    <header className="bg-red-600 text-white p-4 flex items-center gap-2">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
          <img src={logoHunter} alt="hunter icon" />
        </div>
        <div>
          <h1 className="text-xl font-bold">Reportes</h1>
          <p className="text-xs">Horas Trabajadas</p>
        </div>
      </div>
    </header>

    <main className="flex-1 overflow-y-auto p-4">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">
                Placa
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">
                Desde
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">
                Hasta
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">
                Tiempo
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="px-4 py-3 font-semibold">ABE-7716</td>
              <td className="px-4 py-3 text-sm">08:00</td>
              <td className="px-4 py-3 text-sm">18:30</td>
              <td className="px-4 py-3 text-sm font-semibold">10:30:00</td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-3 font-semibold">CAB097</td>
              <td className="px-4 py-3 text-sm">07:45</td>
              <td className="px-4 py-3 text-sm">16:20</td>
              <td className="px-4 py-3 text-sm font-semibold">08:35:00</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  </div>
);

export default Reports;
