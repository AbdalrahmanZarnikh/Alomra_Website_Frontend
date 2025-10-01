import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import { Provider } from "react-redux";
import "./App.css";
import { store } from "./redux/store.js";
import Home from "./pages/Home.jsx";
import Form from "./pages/Form.jsx";
import FormOmra from "./pages/FormOmra.jsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <Toaster />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-user" element={<Form />} />
        <Route path="/add-omra" element={<FormOmra />} />
        <Route path="/edit-user/:id" element={<Form />} />
        <Route path="/edit-omra/:id" element={<FormOmra />} />
      </Routes>
    </Provider>
  </BrowserRouter>
);
