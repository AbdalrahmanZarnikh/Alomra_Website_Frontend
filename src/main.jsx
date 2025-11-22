import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import { Provider } from "react-redux";
import "./App.css";
import Home from "./pages/Home.jsx";
import Form from "./pages/Form.jsx";
import FormOmra from "./pages/FormOmra.jsx";
import { Toaster } from "react-hot-toast";
import PDF from "./pages/PDF.jsx";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
   <App/>
);
