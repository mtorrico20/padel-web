const ResultMatchCard = ({ partido }) => {
  return (
    <article className="result-match-card">
      <div className="result-match-header">
        <span>Partido #{partido.idPartido}</span>

        <span className="match-turn">{partido.turno.nombre}</span>
      </div>

      <div className="result-players-list">
        {partido.jugadores.map((jugador) => (
          <div key={jugador.id} className="result-player">
            <span>🎾 {jugador.nombre}</span>

            {jugador.sets && <strong>{jugador.sets}</strong>}
          </div>
        ))}
      </div>
    </article>
  );
};

export default ResultMatchCard;
