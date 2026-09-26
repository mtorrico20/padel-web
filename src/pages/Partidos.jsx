import {
  useEffect,
  useState,
} from "react";

import padelApi from "../services/padelApi";

import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import EmptyState from "../components/EmptyState";
import MatchGroup from "../components/MatchGroup";

const Partidos = () => {
  const [partidos, setPartidos] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(null);


  useEffect(() => {
    padelApi
      .getPartidos()
      .then((data) => {
        setPartidos(
          data.partidos
        );
      })
      .catch((error) => {
        setError(
          error.message
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);


  if (loading) {
    return <Loading />;
  }


  if (error) {
    return (
      <ErrorMessage
        message={error}
      />
    );
  }


  return (
    <section className="page">
      <h2>
        🎾 Próximos partidos
      </h2>


      {partidos.length === 0 ? (
        <EmptyState
          icon="🎾"
          message="No hay partidos pendientes"
        />
      ) : (
        <MatchGroup
          partidos={partidos}
        />
      )}
    </section>
  );
};

export default Partidos;