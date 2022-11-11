import { Home } from "@mui/icons-material";
import { Route, Routes } from "react-router-dom";
import { CreateVehicleContainer } from "./components/vehicle/createVehicle/createVehicle.container";
import { ReadVehicleContainer } from "./components/vehicle/readVehicle/readVehicle.container";

export const Router = () => (
  <Routes>
    <Route path={"/"} element={<Home />} />
    <Route path={"/vehicle/:id"} element={<ReadVehicleContainer />} />
    <Route path={"/vehicle/create"} element={<CreateVehicleContainer />} />
    <Route path={"/addRecord"} element={<CreateVehicleContainer />} />
  </Routes>
);
