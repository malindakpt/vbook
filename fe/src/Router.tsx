import { Home } from "@mui/icons-material";
import { Route, Routes } from "react-router-dom";
import { CreateVehicleContainer } from "./components/vehicle/create/createVehicle.container";
import { ListVehiclesContainer } from "./components/vehicle/list/listVehicles.container";
import { ReadVehicleContainer } from "./components/vehicle/read/readVehicle.container";
import { UpdateVehicleContainer } from "./components/vehicle/update/updateVehicle.container";

export const Router = () => (
  <Routes>
    <Route path={"/vehicle/update/:id"} element={<UpdateVehicleContainer />} />
    <Route path={"/vehicle/list/:id"} element={<ListVehiclesContainer />} />
    <Route path={"/vehicle/create"} element={<CreateVehicleContainer />} />
    <Route path={"/vehicle/:id"} element={<ReadVehicleContainer />} />
    <Route path={"/addRecord"} element={<CreateVehicleContainer />} />
    <Route path={"/"} element={<Home />} />
  </Routes>
);
