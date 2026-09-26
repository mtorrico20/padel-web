import {
  formatDate,
} from "../utils/dateUtils";


const SeasonInfo = ({
  temporada,
}) => {

  if (!temporada) {
    return null;
  }


  return (

    <section className="season-info">

      <div className="season-info-header">

        <h3>
          🏆 {temporada.nombre}
        </h3>


        {
          temporada.actual && (

            <span className="current-season-badge">

              Temporada actual

            </span>

          )
        }

      </div>


      <div className="season-info-details">

        <div>

          📅{" "}

          {formatDate(
            temporada.fechaInicio
          )}

          {" → "}

          {formatDate(
            temporada.fechaFin
          )}

        </div>


        <div>

          🎾 Máximo de partidos computables:{" "}

          <strong>

            {
              temporada.numMaxPartidos
            }

          </strong>

        </div>

      </div>

    </section>

  );

};


export default SeasonInfo;