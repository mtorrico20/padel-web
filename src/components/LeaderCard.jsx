const LeaderCard = ({
  jugador,
}) => {
  return (
    <div className="leader-card">
      <h3>🏆 Líder actual</h3>

      <div className="leader-name">
        {jugador.nombre}
      </div>

      <div className="leader-stats">
        <span>
          🎾 {jugador.partidosJugados} partidos
        </span>

        <span>
          🏆 {jugador.setsGanados} sets
        </span>
      </div>
    </div>
  );
};

export default LeaderCard;