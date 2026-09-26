const RankingTable = ({ clasificacion }) => {
  const getMedal = (posicion) => {
    switch (posicion) {
      case 1:
        return "🥇";

      case 2:
        return "🥈";

      case 3:
        return "🥉";

      default:
        return posicion;
    }
  };

  return (
    <div className="ranking-container">
      <table className="ranking-table">
        <thead>
          <tr>
            <th>#</th>

            <th>Jugador</th>

            <th>PJ</th>

            <th>Sets</th>
          </tr>
        </thead>

        <tbody>
          {clasificacion.map((jugador) => (
            <tr key={jugador.id}>
              <td className="position">{getMedal(jugador.posicion)}</td>

              <td>{jugador.nombre}</td>

              <td>{jugador.partidosJugados}</td>

              <td>{jugador.setsGanados}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RankingTable;
