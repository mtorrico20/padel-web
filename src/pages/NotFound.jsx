import {
  Link,
} from "react-router-dom";

const NotFound = () => {
  return (
    <section className="page not-found">
      <h2>
        404
      </h2>

      <p>
        La página no existe.
      </p>

      <Link
        className="button"
        to="/"
      >
        Volver al inicio
      </Link>
    </section>
  );
};

export default NotFound;