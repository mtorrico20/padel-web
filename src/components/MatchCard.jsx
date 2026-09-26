const MatchCard = ({
  partido,
}) => {
  return (
    <article className="match-card">
      <div className="match-header">
        <span>
          Partido #
          {partido.idPartido}
        </span>

        <span className="match-turn">
          {partido.turno.nombre}
        </span>
      </div>


      <div className="players-list">
        {partido.jugadores.map(
          (jugador) => (
            <div
              key={jugador.id}
              className="player"
            >
              🎾 {jugador.nombre}
            </div>
          )
        )}
      </div>


      <div className="match-status">
        ⏳ Pendiente de jugar
      </div>
    </article>
  );
};

export default MatchCard;