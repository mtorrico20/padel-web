import { useEffect, useState } from "react";

import padelApi from "../services/padelApi";

import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import EmptyState from "../components/EmptyState";

import SeasonInfo from "../components/SeasonInfo";

import SeasonSelector from "../components/SeasonSelector";

import ResultsGroup from "../components/ResultsGroup";

const Resultados = () => {
  const [partidosJugados, setPartidosJugados] = useState([]);
  const [partidosPendientes, setPartidosPendientes] = useState([]);
  const [temporadas, setTemporadas] = useState([]);
  const [temporada, setTemporada] = useState(null);
  const [idTemporada, setIdTemporada] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingResultados, setLoadingResultados] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([padelApi.getTemporadas(), padelApi.getPartidos(), padelApi.getResultados()])

      .then(([temporadasData, partidosData, resultadosData]) => {
        setTemporadas(temporadasData.temporadas);
        setTemporada(resultadosData.temporada);
        setPartidosPendientes(partidosData.partidos || []);
        setPartidosJugados(resultadosData.partidos || []);
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
    setLoadingResultados(true);
    setError(null);

    Promise.all([padelApi.getPartidos(nuevaTemporada), padelApi.getResultados(nuevaTemporada)])
      .then(([partidosData, resultadosData]) => {
        setTemporada(resultadosData.temporada);
        setPartidosPendientes(partidosData.partidos || []);
        setPartidosJugados(resultadosData.partidos || []);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoadingResultados(false);
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
      <h2>📊 Resultados</h2>

      <p className="page-description">Consulta los resultados de la temporada actual o de temporadas anteriores.</p>
      <SeasonSelector temporadas={temporadas} idTemporada={idTemporada} onChange={handleTemporadaChange} />
      <SeasonInfo temporada={temporada} />
      {error && <ErrorMessage message={error} />}
      {loadingResultados ? (
        <Loading />
      ) : partidosJugados.length === 0 && partidosPendientes.length === 0 ? (
        <EmptyState
          icon="📊"
          message="
                No hay resultados
                en esta temporada
              "
        />
      ) : (
        <ResultsGroup partidosJugados={partidosJugados} partidosPendientes={partidosPendientes} />
      )}
    </section>
  );
};

export default Resultados;
