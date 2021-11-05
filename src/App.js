import { BrowserRouter, Route, Switch } from "react-router-dom";
import DoctorsScreen from "./components/screen/DoctorsScreen";
import SelectedDoctorScreen from "./components/screen/SelectedDoctorScreen";

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/:id" exact component={SelectedDoctorScreen} />
          <Route path="/" exact component={DoctorsScreen} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
