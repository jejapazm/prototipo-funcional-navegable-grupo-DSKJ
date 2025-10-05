import React from "react";
import { MessageCircle } from "./Icons";
import logoHunter from "/assets/images/logo-hunter.png";

interface DashboardProps {
  onChatClick: () => void;
}

const Dashboard: React.FC = () => (
  <div className="h-screen flex flex-col bg-gray-50">
    <header className="bg-red-600 text-white p-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
          <img src={logoHunter} alt="hunter icon" />
        </div>
        <div>
          <h1 className="text-xl font-bold">Dashboard</h1>
          <p className="text-xs">Hoy</p>
        </div>
      </div>
    </header>

    <main className="flex-1 overflow-y-auto p-4">
      <section className="bg-white rounded-lg shadow p-4 mb-4">
        <h2 className="font-bold mb-3">PERFIL DE CONDUCCIÓN</h2>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600 font-bold text-lg">0</span>
            </div>
            <span className="text-xs">Frenadas bruscas</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600 font-bold text-lg">0</span>
            </div>
            <span className="text-xs">Aceleraciones bruscas</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-red-600 font-bold text-lg">19</span>
            </div>
            <span className="text-xs">Excesos velocidad</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
              <span className="text-orange-600 font-bold text-lg">4</span>
            </div>
            <span className="text-xs">Infracciones</span>
          </div>
        </div>
        <div className="mt-4 bg-yellow-400 text-yellow-900 px-3 py-2 rounded font-bold text-center">
          71 Alertas
        </div>
      </section>

      <section className="bg-white rounded-lg shadow p-4">
        <h2 className="font-bold mb-3">
          DETALLE DE FLOTA <span className="float-right">2 unid.</span>
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="font-bold text-2xl">222</div>
            <div className="text-xs text-gray-600">Kms Distancia Recorrida</div>
            <div className="text-xs text-green-500">+1,250% Día Anterior</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="font-bold text-2xl">10:25:11</div>
            <div className="text-xs text-gray-600">Horas Trabajadas</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="font-bold text-2xl">21</div>
            <div className="text-xs text-gray-600">Km/h Velocidad Promedio</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="font-bold text-2xl">22</div>
            <div className="text-xs text-gray-600">Total Paradas</div>
          </div>
        </div>
      </section>
    </main>
  </div>
);

export default Dashboard;
