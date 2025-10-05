import React from "react";
import { MapPin } from "./Icons";
import { ModalContent } from "../types";

interface CommandModalProps {
  isOpen: boolean;
  content: ModalContent;
  onClose: () => void;
  onConfirm: () => void;
}

const CommandModal: React.FC<CommandModalProps> = ({
  isOpen,
  content,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div
        className="bg-white rounded-2xl p-6 max-w-sm w-full"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
            <MapPin className="text-orange-600" size={32} />
          </div>
        </div>
        <h3 className="font-bold text-xl text-center mb-3">{content.title}</h3>
        <p className="text-sm text-gray-600 text-center mb-6">
          {content.message}
        </p>
        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 bg-gray-300 hover:bg-gray-400 rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            CANCELAR
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            {content.title === "Solicitar Ubicación" ? "ENVIAR" : "ACEPTAR"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommandModal;
