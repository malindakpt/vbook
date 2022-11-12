import BikeImg from "../assets/vType/bike.png";
import CarImg from "../assets/vType/car.png";
import BusImg from  "../assets/vType/bus.png"
import { SelectOption } from "../types/SelectOption";

export const vehicleBrands: SelectOption[] = [
  { label: "-Select a brand-", id: 0 },
  { label: "TOYOTA", id: 1 },
  { label: "NISAAN", id: 2 },
  { label: "MITSUBISHI", id: 3 },
  { label: "ISUZU", id: 4 },
  { label: "MAZDA", id: 5 },
  { label: "SUBARU", id: 6 },
];

export const vehicleTypes: SelectOption[] = [
  { label: "-Select vehicle type-", id: 0 },
  { label: "Car", id: 1, src: CarImg },
  { label: "Bike", id: 2, src: BikeImg },
  { label: "Bus", id: 2, src: BusImg },
];

export const fuelTypes: SelectOption[] = [
  { label: "-Select fuel type-", id: 0 },
  { label: "PETROL", id: 1 },
  { label: "DISEL", id: 2 },
  { label: "HYBRID", id: 3 },
  { label: "ELECTRIC", id: 4 },
];

export const transmissionTypes: SelectOption[] = [
  { label: "-Select transmission type-", id: 0 },
  { label: "AUTOMATIC", id: 1 },
  { label: "MANUAL", id: 2 },
];

export const serviceTypes: SelectOption[] = [
  { label: "- Select Serive Type -", id: 0 },
  { label: "Oil Change", id: 1 },
  { label: "Tyre Change", id: 2 },
]
