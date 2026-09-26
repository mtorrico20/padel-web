import {
  useEffect,
  useState,
} from "react";

import padelApi from "../services/padelApi";

import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import EmptyState from "../components/EmptyState";
import RequestGroup from "../components/RequestGroup";

const Solicitudes = () => {
  const [solicitudes, setSolicitudes] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(null);


  useEffect(() => {
    padelApi
      .getSolicitudes()
      .then((data) => {
        setSolicitudes(
          data.solicitudes
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
        📋 Solicitudes activas
      </h2>

      <p className="page-description">
        Jugadores apuntados a próximos
        partidos.
      </p>


      {solicitudes.length === 0 ? (
        <EmptyState
          icon="📋"
          message="No hay solicitudes activas"
        />
      ) : (
        solicitudes.map(
          (grupo) => (
            <RequestGroup
              key={
                `${grupo.fecha}_${grupo.turno.id}`
              }
              grupo={grupo}
            />
          )
        )
      )}
    </section>
  );
};

export default Solicitudes;