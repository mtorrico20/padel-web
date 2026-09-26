import {
  formatDate,
  capitalize,
} from "../utils/dateUtils";

const ActiveRequestsSummary = ({
  solicitudes,
}) => {

  return (
    <div className="active-requests-list">

      {solicitudes.map((grupo) => {

        const jugadores =
          grupo.jugadores;


        const jugadoresPartido =
          jugadores.filter(
            jugador =>
              jugador.estado ===
              "PARTIDO"
          );


        const jugadoresEspera =
          jugadores.filter(
            jugador =>
              jugador.estado ===
              "ESPERA"
          );


        const numeroPartidos =
          new Set(
            jugadoresPartido.map(
              jugador =>
                jugador.idPartido
            )
          ).size;


        return (
          <article
            key={
              `${grupo.fecha}_${grupo.turno.id}`
            }
            className="active-request-card"
          >

            <div className="active-request-header">

              <div>

                <div className="active-request-date">
                  📅{" "}

                  {capitalize(
                    formatDate(
                      grupo.fecha
                    )
                  )}

                </div>


                <div className="active-request-turn">

                  {grupo.turno.nombre}

                </div>

              </div>


              <div className="active-request-count">

                👥{" "}

                {
                  jugadores.length
                }

              </div>

            </div>


            {/* JUGADORES */}

            <div className="active-request-players">

              {jugadores
                .slice(0, 4)
                .map(
                  jugador => (

                    <span
                      key={
                        jugador.id
                      }
                      className="
                        active-request-player
                      "
                    >

                      {
                        jugador.nombre
                      }

                    </span>

                  )
                )}

            </div>


            {/* MÁS JUGADORES */}

            {
              jugadores.length > 4 && (

                <div className="active-request-more">

                  +{
                    jugadores.length - 4
                  }

                  {" "}
                  jugadores más

                </div>

              )
            }


            {/* ESTADO */}

            <div className="active-request-status">

              {
                numeroPartidos > 0 && (

                  <span className="status-match">

                    🎾{" "}

                    {
                      numeroPartidos
                    }

                    {" "}

                    {
                      numeroPartidos === 1
                        ? "partido"
                        : "partidos"
                    }

                  </span>

                )
              }


              {
                jugadoresEspera.length > 0 && (

                  <span className="status-waiting">

                    ⏳{" "}

                    {
                      jugadoresEspera.length
                    }

                    {" "}

                    esperando

                  </span>

                )
              }


              {
                numeroPartidos === 0 && (

                  <span className="status-pending">

                    ⏳ Pendiente de completar

                  </span>

                )
              }

            </div>

          </article>
        );

      })}

    </div>
  );
};


export default ActiveRequestsSummary;