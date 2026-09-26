import { useEffect, useState } from "react";

import padelApi from "../services/padelApi";

import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import LeaderCard from "../components/LeaderCard";
import EmptyState from "../components/EmptyState";

import ActiveRequestsSummary from "../components/ActiveRequestsSummary";

import { Link } from "react-router-dom";

const Home = () => {
  const [resumen, setResumen] = useState(null);

  const [solicitudes, setSolicitudes] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([padelApi.getResumen(), padelApi.getSolicitudes()])
      .then(([resumenData, solicitudesData]) => {
        setResumen(resumenData);

        setSolicitudes(solicitudesData.solicitudes);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <section className="page">
      <h2>Bienvenido</h2>
      <p className="page-description">Consulta los próximos partidos, las solicitudes activas y la clasificación.</p>
      {/* RESUMEN */}
      <div className="summary-grid">
        <div className="summary-card">
          <span className="summary-icon">🎾</span>
          <span className="summary-number">{resumen.proximosPartidos}</span>
          <span>Próximos partidos</span>
        </div>
        <div className="summary-card">
          <span className="summary-icon">📋</span>
          <span className="summary-number">{resumen.solicitudesActivas}</span>
          <span>Solicitudes activas</span>
        </div>

        <div className="summary-card">
          <span className="summary-icon">👥</span>
          <span className="summary-number">{resumen.jugadoresClasificados}</span>
          <span>Jugadores clasificados</span>
        </div>
      </div>

      {/* LÍDER */}
      {resumen.lider && <LeaderCard jugador={resumen.lider} />}
      {/* SOLICITUDES ACTIVAS */}
      <section className="home-solicitudes">
        <h2>📋 Solicitudes activas</h2>
        {solicitudes.length === 0 ? (
          <EmptyState icon="📋" message="No hay solicitudes activas" />
        ) : (
          <>
            <ActiveRequestsSummary solicitudes={solicitudes} />

            <Link to="/solicitudes" className="view-all-link">
              Ver todas las solicitudes →
            </Link>
          </>
        )}
      </section>
    </section>
  );
};

export default Home;
