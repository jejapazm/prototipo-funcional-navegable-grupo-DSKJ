// src/index.tsx (o index.js)
import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";
import App from "./App";

// Suprimir errores de cross-origin de Landbot
const suppressCrossOriginErrors = () => {
  const originalConsoleError = console.error;
  console.error = (...args: any[]) => {
    const errorMessage = args[0]?.toString() || "";
    if (
      errorMessage.includes("cross-origin") ||
      errorMessage.includes("SecurityError") ||
      errorMessage.includes("Blocked a frame")
    ) {
      return; // Ignorar estos errores específicos
    }
    originalConsoleError.apply(console, args);
  };

  // Capturar errores globales
  window.addEventListener(
    "error",
    (event) => {
      if (
        event.message?.includes("cross-origin") ||
        event.message?.includes("SecurityError") ||
        event.message?.includes("Blocked a frame")
      ) {
        event.preventDefault();
        event.stopImmediatePropagation();
        return false;
      }
    },
    true
  );

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => {
          console.log("✅ Service Worker registrado con éxito:", reg);
        })
        .catch((err) => {
          console.log("❌ Error al registrar el Service Worker:", err);
        });
    });
  }

  // Capturar promesas rechazadas
  window.addEventListener("unhandledrejection", (event) => {
    const message = event.reason?.message || event.reason?.toString() || "";
    if (
      message.includes("cross-origin") ||
      message.includes("SecurityError") ||
      message.includes("Blocked a frame")
    ) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  });
};

if (process.env.NODE_ENV === "development") {
  // Desactiva el overlay en dev
  // @ts-ignore
  window.__REACT_DEVTOOLS_GLOBAL_HOOK__ = {};
}

suppressCrossOriginErrors();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
