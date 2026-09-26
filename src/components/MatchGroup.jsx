import MatchCard from "./MatchCard";

import {
  formatDate,
  capitalize,
} from "../utils/dateUtils";

const MatchGroup = ({
  partidos,
}) => {
  const grupos = {};


  partidos.forEach((partido) => {
    const fecha =
      partido.fecha;

    if (!grupos[fecha]) {
      grupos[fecha] = [];
    }

    grupos[fecha].push(
      partido
    );
  });


  return (
    <div>
      {Object.entries(grupos).map(
        ([fecha, partidosFecha]) => (
          <section
            key={fecha}
            className="date-group"
          >
            <h3>
              📅{" "}
              {capitalize(
                formatDate(fecha)
              )}
            </h3>


            <div className="matches-grid">
              {partidosFecha.map(
                (partido) => (
                  <MatchCard
                    key={
                      partido.idPartido
                    }
                    partido={partido}
                  />
                )
              )}
            </div>
          </section>
        )
      )}
    </div>
  );
};

export default MatchGroup;