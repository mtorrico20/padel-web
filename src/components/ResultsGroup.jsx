import { Fragment } from "react";

import { formatShortDate } from "../utils/dateUtils";

const ResultsGroup = ({ partidosJugados, partidosPendientes }) => {
  const getSetsGanados = (jugador) => jugador?.setsGanados ?? jugador?.sets ?? "";

  const renderRows = (partidos) =>
    partidos.map((partido) => (
      <tr key={partido.idPartido}>
        <td>#{partido.idPartido}</td>
        <td>{formatShortDate(partido.fecha)}</td>
        <td>{partido.turno?.nombre || ""}</td>
        {Array.from({ length: 4 }, (_, index) => {
          const jugador = partido.jugadores?.[index];

          return (
            <Fragment key={`${partido.idPartido}-player-${index}`}>
              <td>{jugador?.nombre || ""}</td>
              <td className="sets-cell">{getSetsGanados(jugador)}</td>
            </Fragment>
          );
        })}
      </tr>
    ));

  const renderTable = (partidos) => (
    <div className="results-table-wrapper">
      <table className="results-table">
        <thead>
          <tr>
            <th rowSpan="2">Partido</th>
            <th rowSpan="2">Fecha</th>
            <th rowSpan="2">Turno</th>
            {Array.from({ length: 4 }, (_, index) => (
              <th key={`player-header-${index}`} colSpan="2">
                Jugador {index + 1}
              </th>
            ))}
          </tr>
          <tr className="results-table-subheader">
            {Array.from({ length: 4 }, (_, index) => (
              <Fragment key={`player-subheader-${index}`}>
                <th>Nombre</th>
                <th>Sets ganados</th>
              </Fragment>
            ))}
          </tr>
        </thead>
        <tbody>{renderRows(partidos)}</tbody>
      </table>
    </div>
  );

  return (
    <div className="results-sections">
      {partidosJugados.length > 0 && (
        <section className="results-section">
          <div className="results-section-heading">
            <h3>Partidos jugados</h3>
            <span>{partidosJugados.length}</span>
          </div>
          {renderTable(partidosJugados)}
        </section>
      )}

      {partidosPendientes.length > 0 && (
        <section className="results-section">
          <div className="results-section-heading">
            <h3>Partidos pendientes</h3>
            <span>{partidosPendientes.length}</span>
          </div>
          {renderTable(partidosPendientes)}
        </section>
      )}
    </div>
  );
};

export default ResultsGroup;
