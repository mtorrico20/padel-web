import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="navigation">
      <NavLink to="/" end>
        🏠 Inicio
      </NavLink>
      <NavLink to="/solicitudes">📋 Solicitudes</NavLink>
      <NavLink to="/partidos">🎾 Partidos</NavLink>
      <NavLink to="/clasificacion">🏆 Clasificación</NavLink>
      <NavLink to="/resultados">📊 Resultados</NavLink>
    </nav>
  );
};

export default Navigation;
