const SeasonSelector = ({ temporadas, idTemporada, onChange }) => {
  return (
    <div className="season-selector">
      <label htmlFor="temporada">Seleccionar temporada</label>

      <select
        id="temporada"
        value={idTemporada || ""}
        onChange={(event) => {
          const value = event.target.value;

          onChange(value ? Number(value) : null);
        }}
      >
        <option value="">Temporada actual</option>

        {temporadas.map((temporada) => (
          <option key={temporada.id} value={temporada.id}>
            {temporada.nombre}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SeasonSelector;
