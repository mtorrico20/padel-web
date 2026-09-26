import { formatDate, formatDateTime, capitalize } from "../utils/dateUtils";

const RequestGroup = ({ grupo }) => {
  const jugadores = grupo.jugadores;

  return (
    <section className="request-group">
      <h3>📅 {capitalize(formatDate(grupo.fecha))}</h3>

      <div className="request-summary-row">
        <span>
          <strong>Cuándo quieren jugar:</strong> {capitalize(formatDate(grupo.fecha))} · {grupo.turno.nombre}
        </span>
        <span>
          <strong>Total de jugadores:</strong> {jugadores.length}
        </span>
      </div>

      <div className="request-details">
        <table className="request-table">
          <thead>
            <tr>
              <th>Jugador</th>
              <th>Solicitud realizada</th>
              <th>Observación</th>
            </tr>
          </thead>
          <tbody>
            {jugadores.map((jugador) => (
              <tr key={jugador.id}>
                <td>
                  <span className="request-player-position">{jugador.posicion}.</span> {jugador.nombre}
                </td>
                <td>{formatDateTime(jugador.fechaSolicitud)}</td>
                <td>{jugador.observaciones || ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default RequestGroup;
