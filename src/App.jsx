import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

import Home from "./pages/Home";
import Partidos from "./pages/Partidos";
import Solicitudes from "./pages/Solicitudes";
import Clasificacion from "./pages/Clasificacion";
import Resultados from "./pages/Resultados";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/solicitudes" element={<Solicitudes />} />
        <Route path="/partidos" element={<Partidos />} />
        <Route path="/clasificacion" element={<Clasificacion />} />
        <Route path="/resultados" element={<Resultados />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
