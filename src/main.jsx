import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import Form from "./components/Form/Form.jsx";
import FormOmra from "./components/FormOmra/FormOmra.jsx";
import { Provider } from "react-redux";

import {store} from "./redux/store.js"

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
      <Provider store={store}>
      <Header />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/add-user" element={<Form />} />
        <Route path="/add-omra" element={<FormOmra />} />
        <Route path="/edit-user/:id" element={<Form />} />
      </Routes>

      </Provider>
  </BrowserRouter>
);
