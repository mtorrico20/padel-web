import { useEffect, useState } from "react";

import padelApi from "../services/padelApi";

import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import EmptyState from "../components/EmptyState";
import RankingTable from "../components/RankingTable";
import SeasonInfo from "../components/SeasonInfo";
import SeasonSelector from "../components/SeasonSelector";

const Clasificacion = () => {
  const [clasificacion, setClasificacion] = useState([]);
  const [temporadas, setTemporadas] = useState([]);
  const [temporada, setTemporada] = useState(null);
  const [idTemporada, setIdTemporada] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingClasificacion, setLoadingClasificacion] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([padelApi.getTemporadas(), padelApi.getClasificacion()])
      .then(([temporadasData, clasificacionData]) => {
        setTemporadas(temporadasData.temporadas);
        setTemporada(clasificacionData.temporada);
        setClasificacion(clasificacionData.clasificacion);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleTemporadaChange = (nuevaTemporada) => {
    setIdTemporada(nuevaTemporada);
    setLoadingClasificacion(true);
    setError(null);

    padelApi
      .getClasificacion(nuevaTemporada)
      .then((data) => {
        setTemporada(data.temporada);
        setClasificacion(data.clasificacion);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoadingClasificacion(false);
      });
  };

  if (loading) {
    return <Loading />;
  }

  if (error && !temporada) {
    return <ErrorMessage message={error} />;
  }

  return (
    <section className="page">
      <h2>🏆 Clasificación</h2>
      <p className="page-description">La clasificación se calcula únicamente con los partidos computables de cada jugador en la temporada seleccionada.</p>
      <SeasonSelector temporadas={temporadas} idTemporada={idTemporada} onChange={handleTemporadaChange} />
      <SeasonInfo temporada={temporada} />
      {error && <ErrorMessage message={error} />}
      {loadingClasificacion ? (
        <Loading />
      ) : clasificacion.length === 0 ? (
        <EmptyState
          icon="🏆"
          message="
                Todavía no hay partidos
                jugados en esta temporada
              "
        />
      ) : (
        <RankingTable clasificacion={clasificacion} />
      )}
    </section>
  );
};

export default Clasificacion;
