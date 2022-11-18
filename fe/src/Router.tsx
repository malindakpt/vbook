import { Route, Routes } from "react-router-dom";
import { Home } from "./components/home/home";
import { CreateRecordContainer } from "./components/record/create/recordCreate.container";
import { ListRecordsContainer } from "./components/record/list/recordsList.container";
import { ReadRecordContainer } from "./components/record/view/recordView.container";
import { UpdateRecordContainer } from "./components/record/update/recordUpdate.container";
import { CreateVehicleContainer } from "./components/vehicle/create/vehicleCreate.container";
import { VehiclesListContainer } from "./components/vehicle/list/vehiclesList.container";
import { ReadVehicleContainer } from "./components/vehicle/view/vehicleView.container";
import { UpdateVehicleContainer } from "./components/vehicle/update/vehicleUpdate.container";

export const Router = () => (
  <Routes>
    <Route path={"/vehicle/update/:vid"} element={<UpdateVehicleContainer />} />
    <Route path={"/vehicle/list"} element={<VehiclesListContainer />} />
    <Route path={"/vehicle/create"} element={<CreateVehicleContainer />} />
    <Route path={"/vehicle/:vid"} element={<ReadVehicleContainer />} />
   
    <Route path={"/record/update/:rid"} element={<UpdateRecordContainer />} />
    <Route path={"/record/create/:vid"} element={<CreateRecordContainer />} />
    <Route path={"/record/list/:vid"} element={<ListRecordsContainer />} />
    <Route path={"/record/list"} element={<ListRecordsContainer />} />
    <Route path={"/record/create"} element={<CreateRecordContainer />} />
    <Route path={"/record/:rid"} element={<ReadRecordContainer />} />
    <Route path={"/"} element={<Home />} />
  </Routes>
);
