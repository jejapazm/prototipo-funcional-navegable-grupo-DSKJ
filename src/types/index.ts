export interface Vehicle {
  id: string;
  lat: number;
  lng: number;
  speed: number;
  status: "moving" | "stopped";
}

export interface ModalContent {
  title: string;
  message: string;
}
