import { Route, Routes } from "react-router-dom";
import { Home } from "./components/home/home";
import { CreateRecordContainer } from "./components/record/create/recordCreate.container";
import { RecordsListContainer } from "./components/record/list/recordsList.container";
import { RecordViewContainer } from "./components/record/view/recordView.container";
import { RecordUpdate } from "./components/record/update/recordUpdate.container";
import { VehicleCreateContainer } from "./components/vehicle/create/vehicleCreate.container";
import { VehiclesListContainer } from "./components/vehicle/list/vehiclesList.container";
import { VehicleViewContainer } from "./components/vehicle/view/vehicleView.container";
import { VehicleUpdateContainer } from "./components/vehicle/update/vehicleUpdate.container";
import { Container } from "@mui/material";

export const Router = () => (
  <Container maxWidth="lg">
    <Routes>
      <Route
        path={"/vehicle/create/simple"}
        element={<VehicleCreateContainer simple />}
      />
      <Route
        path={"/vehicle/update/:vid"}
        element={<VehicleUpdateContainer />}
      />
      <Route path={"/vehicle/list"} element={<VehiclesListContainer />} />
      <Route path={"/vehicle/create"} element={<VehicleCreateContainer />} />
      <Route path={"/vehicle/:vid"} element={<VehicleViewContainer />} />

      <Route path={"/record/update/:rid"} element={<RecordUpdate />} />
      <Route path={"/record/create/:vid"} element={<CreateRecordContainer />} />
      <Route path={"/record/list/:vid"} element={<RecordsListContainer />} />
      <Route path={"/record/list"} element={<RecordsListContainer />} />
      <Route path={"/record/create"} element={<CreateRecordContainer />} />
      <Route path={"/record/:rid"} element={<RecordViewContainer />} />
      <Route path={"/"} element={<Home />} />
    </Routes>
  </Container>
);
