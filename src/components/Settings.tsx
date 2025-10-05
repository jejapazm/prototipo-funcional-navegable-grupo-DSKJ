// src/components/SettingsPage.tsx
import {
  Bell,
  Lock,
  HelpCircle,
  FileText,
  Smartphone,
  Package,
  ChevronRight,
} from "./Icons";

interface SettingsPageProps {
  open: boolean;
  onClose: () => void;
}

export default function SettingsPage({ open, onClose }: SettingsPageProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col">
      {/* Fondo oscuro */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Contenedor full screen */}
      <div className="relative w-full h-full bg-white overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="bg-red-600 text-white p-5 flex justify-between items-center">
          <div class="ml-14">
            <h2 className="text-lg font-bold">Configuraciones</h2>
            <p className="text-sm text-red-100">
              Configuración General y de cuenta
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 px-3 bg-red-700 rounded-full"
          >
            X
          </button>
        </div>

        {/* Secciones */}
        <div className="p-4 space-y-6">
          {/* ALERTAS */}
          <div>
            <h3 className="text-xs text-gray-500 font-semibold mb-2">
              ALERTAS
            </h3>
            <div className="flex items-center justify-between py-3 border-b">
              <div className="flex items-center gap-3">
                <Bell className="text-gray-600" size={20} />
                <span>Administrar Alertas</span>
              </div>
              <ChevronRight className="text-gray-400" />
            </div>
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <Bell className="text-gray-600" size={20} />
                <span>Alertas Predeterminadas</span>
              </div>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-green-500 after:content-[''] after:absolute after:w-5 after:h-5 after:bg-white after:rounded-full after:top-[2px] after:left-[2px] after:transition-all peer-checked:after:translate-x-5 relative"></div>
              </label>
            </div>
          </div>

          {/* CUENTA Y AYUDA */}
          <div>
            <h3 className="text-xs text-gray-500 font-semibold mb-2">
              CUENTA Y AYUDA
            </h3>
            {[
              { icon: <Package size={20} />, text: "Productos y Servicios" },
              {
                icon: <Smartphone size={20} />,
                text: "Dispositivos Vinculados",
              },
              { icon: <HelpCircle size={20} />, text: "HunterKM" },
              { icon: <Lock size={20} />, text: "Cambiar Contraseña" },
              { icon: <HelpCircle size={20} />, text: "Soporte Técnico" },
              { icon: <FileText size={20} />, text: "Manual de Usuario" },
              { icon: <FileText size={20} />, text: "Términos y Condiciones" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-3 border-b last:border-none"
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span>{item.text}</span>
                </div>
                <ChevronRight className="text-gray-400" />
              </div>
            ))}
          </div>

          {/* PRIVACIDAD */}
          <div>
            <h3 className="text-xs text-gray-500 font-semibold mb-2">
              PRIVACIDAD
            </h3>
            <div className="flex items-center justify-between py-3">
              <span>Ubicación</span>
              <span className="text-green-600 font-semibold">Permitido</span>
            </div>
          </div>

          {/* Mensaje de alerta */}
          <div className="bg-green-100 text-green-700 p-3 text-center text-sm">
            Su alerta ha sido desactivada correctamente
          </div>
        </div>
      </div>
    </div>
  );
}
