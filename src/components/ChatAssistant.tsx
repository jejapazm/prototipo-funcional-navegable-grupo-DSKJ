import React, { useEffect, useRef } from "react";
import { MessageCircle, Bot } from "./Icons";

interface ChatAssistantProps {
  landbotLoaded: boolean;
}

const ChatAssistant: React.FC<ChatAssistantProps> = ({ landbotLoaded }) => {
  const landbotInstance = useRef<any>(null);

  useEffect(() => {
    // Inicializar Landbot cuando esté cargado y el componente esté montado
    if (landbotLoaded && window.Landbot && !landbotInstance.current) {
      try {
        landbotInstance.current = new window.Landbot.Livechat({
          configUrl:
            "https://storage.googleapis.com/landbot.online/v3/H-3153848-BZCLKBZ17C2ONF0T/index.json",
        });

        // Aplicar estilos personalizados al botón después de un breve delay
        setTimeout(() => {
          const landbotButton = document.querySelector(".LandbotLivechat");
          if (landbotButton) {
            (landbotButton as HTMLElement).style.cssText = `
              bottom: 80px !important;
              right: 16px !important;
              width: 56px !important;
              height: 56px !important;
            `;
          }

          // Hacer el ícono más pequeño
          const landbotIcon = document.querySelector(".LandbotLivechat svg");
          if (landbotIcon) {
            (landbotIcon as HTMLElement).style.cssText = `
              width: 28px !important;
              height: 28px !important;
            `;
          }
        }, 500);
      } catch (error) {
        console.error("Error inicializando Landbot:", error);
      }
    }

    // Cleanup al desmontar
    return () => {
      if (landbotInstance.current && landbotInstance.current.destroy) {
        landbotInstance.current.destroy();
        landbotInstance.current = null;
      }
    };
  }, [landbotLoaded]);

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-red-50 to-white">
      <header className="bg-red-600 text-white p-4 flex items-center gap-2">
        <MessageCircle size={24} />
        <div>
          <h1 className="text-xl font-bold">Asistente Virtual</h1>
          <p className="text-sm">Estamos aquí para ayudarte</p>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 flex flex-col items-center justify-center">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto shadow-lg">
            <Bot className="text-red-600" size={48} />
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-gray-800">¡Hola! 👋</h2>
            <p className="text-gray-600">
              Soy tu asistente virtual. Puedo ayudarte con información sobre tu
              flota, reportes, alertas y más.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 text-left space-y-4">
            <h3 className="font-bold text-gray-800 mb-3">
              Puedo ayudarte con:
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-red-600 font-bold">1</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">
                    Estado de vehículos
                  </p>
                  <p className="text-sm text-gray-600">
                    Consulta ubicación y estado en tiempo real
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-red-600 font-bold">2</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">
                    Alertas y notificaciones
                  </p>
                  <p className="text-sm text-gray-600">
                    Información sobre alertas recientes
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-red-600 font-bold">3</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">
                    Reportes y estadísticas
                  </p>
                  <p className="text-sm text-gray-600">
                    Datos de rendimiento de tu flota
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-red-600 font-bold">4</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Soporte técnico</p>
                  <p className="text-sm text-gray-600">
                    Ayuda con funciones de la app
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-red-100 rounded-xl p-4 flex items-center gap-3">
            <MessageCircle className="text-red-600 flex-shrink-0" size={24} />
            <p className="text-sm text-gray-700 text-left">
              <strong>Haz clic en el botón flotante</strong> de la esquina
              inferior derecha para iniciar la conversación
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChatAssistant;
