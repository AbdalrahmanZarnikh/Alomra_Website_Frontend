import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import FormOmra from "./pages/FormOmra";
import Form from "./pages/Form";
import PDF from "./pages/PDF";
import BusLayout from "./pages/BusLayout";

import Home from "./pages/Home";
import { store } from "./redux/store";
import Tasks from "./pages/Tasks";


function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
      
        <Toaster />
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-user" element={<Form />} />
          <Route path="/add-omra" element={<FormOmra />} />
          <Route path="/edit-user/:id" element={<Form />} />
          <Route path="/edit-omra/:id" element={<FormOmra />} />
          <Route path="/pdf" element={<PDF />} />

          {/* جلب data من ال Redux داخل Bus نفسه */}
          <Route path="/bus/:id" element={<BusLayout />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/edit-task/:id" element={<Tasks />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
