import bikeImg from "../../../assets/vType/bike.png";
import CarImg from "../../../assets/vType/car.png";

export const vehicleBrands = [
  { label: "-Select a brand-", id: 0 },
  { label: "TOYOTA", id: 1 },
  { label: "NISAAN", id: 2 },
  { label: "MITSUBISHI", id: 3 },
  { label: "ISUZU", id: 4 },
  { label: "MAZDA", id: 5 },
  { label: "SUBARU", id: 6 },
];

export const vehicleTypes = [
  { label: "-Select vehicle type-", id: 0 },
  { label: "Car", id: 1, src: CarImg },
  { label: "Bus", id: 2, src: bikeImg },
];

export const fuelTypes = [
  { label: "-Select fuel type-", id: 0 },
  { label: "PETROL", id: 1 },
  { label: "DISEL", id: 2 },
  { label: "HYBRID", id: 3 },
  { label: "ELECTRIC", id: 4 },
];

export const transmissionTypes = [
  { label: "-Select transmission type-", id: 0 },
  { label: "AUTOMATIC", id: 1 },
  { label: "MANUAL", id: 2 },
];
