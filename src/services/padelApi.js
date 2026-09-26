const baseUrl = import.meta.env.VITE_PADEL_API_URL;

const getData = async (action) => {
  const separator = action.includes("?") ? "&" : "?";

  const response = await fetch(`${baseUrl}${separator}action=${action}`);

  if (!response.ok) {
    throw new Error("No se ha podido obtener la información");
  }

  const data = await response.json();

  if (data.error) {
    throw new Error(data.message || "Ha ocurrido un error");
  }

  return data;
};

const getPartidos = (idTemporada = null) => {
  let action = "partidos";

  if (idTemporada) {
    action += `&idTemporada=${idTemporada}`;
  }

  return getData(action);
};

const getSolicitudes = () => {
  return getData("solicitudes");
};

const getClasificacion = (idTemporada = null) => {
  let action = "clasificacion";

  if (idTemporada) {
    action += `&idTemporada=${idTemporada}`;
  }

  return getData(action);
};

const getTemporadas = async () => {
  try {
    return await getData("temporadas");
  } catch (error) {
    return { temporadas: [] };
  }
};

const getResultados = async (idTemporada = null) => {
  let action = "resultados";

  if (idTemporada) {
    action += `&idTemporada=${idTemporada}`;
  }

  return getData(action);
};

const getResumen = () => {
  return getData("resumen");
};

export default {
  getPartidos,
  getSolicitudes,
  getClasificacion,
  getTemporadas,
  getResultados,
  getResumen,
};
