// src/App.tsx
import React, { useState, useEffect, useRef } from "react";
import { Truck, BarChart3, FileText, Bell } from "./../src/components/Icons";
import Fleet from "./components/Fleet";
import Dashboard from "./components/Dashboard";
import Reports from "./components/Reports";
import Alerts from "./components/Alerts";

const App = () => {
  const [activeTab, setActiveTab] = useState("fleet");
  const landbotRef = useRef<any>(null);
  const [landbotLoaded, setLandbotLoaded] = useState(false);

  useEffect(() => {
    if (!landbotLoaded) {
      const script = document.createElement("script");
      script.type = "module";
      script.async = true;
      script.src = "https://cdn.landbot.io/landbot-3/landbot-3.0.0.mjs";
      script.onload = () => {
        if (window.Landbot) {
          setLandbotLoaded(true);
          landbotRef.current = new window.Landbot.Livechat({
            configUrl:
              "https://storage.googleapis.com/landbot.online/v3/H-3153848-BZCLKBZ17C2ONF0T/index.json",
          });
        }
      };
      document.head.appendChild(script);
    }
  }, [landbotLoaded]);

  const handleChatClick = () => {
    if (landbotRef.current && landbotRef.current.open) {
      landbotRef.current.open();
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "fleet":
        return <Fleet />;
      case "dashboard":
        return <Dashboard />;
      case "reports":
        return <Reports />;
      case "alerts":
        return <Alerts />;
      default:
        return <Fleet />;
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 overflow-hidden">{renderContent()}</div>

      {/* Bottom Navigation */}
      <nav
        className="bg-[#2b2b2b] rounded-t-2xl px-2 pb-6"
        role="navigation"
        aria-label="Navegación principal"
      >
        <div className="flex justify-around items-center">
          {[
            { key: "fleet", icon: Truck, label: "Flota" },
            { key: "dashboard", icon: BarChart3, label: "Dashboard" },
            { key: "reports", icon: FileText, label: "Reportes" },
            { key: "alerts", icon: Bell, label: "Alertas" },
          ].map(({ key, icon: Icon, label }) => {
            const isActive = activeTab === key;
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex flex-col items-center justify-center p-2 flex-1 transition-colors focus:outline-none ${
                  isActive ? "bg-red-800 rounded-xl" : ""
                }`}
                aria-label={label}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon size={24} className={"text-white"} />
                <span className={"text-xs mt-1 text-white"}>{label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default App;
