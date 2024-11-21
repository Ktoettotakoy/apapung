import styles from "../styles/Card.module.css";

export default function Card({ name, image, parameters, className }) {
  // Convert the parameters object into an array of key-value pairs
  const parsed = JSON.parse(parameters);
  const parameterEntries = Object.entries(parsed);

  // So, I initially wanted card object to be uniform, but now we have some differences
  // between dogs and pokemons, types are images now, I still want to use the same class
  // both for dog card and pokemon card. Amazon card is different though, so maybe at some
  // point next week I'll separate this two as well.
  const pokemonTypes = parsed.Types || [];
  // console.log(pokemonTypes)

  return (
    <div className={`${styles.cardContainer} ${className}`}>
      <div className={styles.card}>
        
        <img src={image} alt={name} className={styles.cardImage} />
        
        <div className={styles.infoContainer}>
          {/* Name for the dog/pokemon card */}
          <h2 className={styles.cardName}>Name:{name}</h2>

          {/* Pokémon Types as images */}
          {pokemonTypes.length > 0 && (
            <div className={styles.typesContainer}>
              <span className={styles.parameterKey} >Types:</span>
              <div className={styles.types}>
                {pokemonTypes.map((typeUrl, index) => (
                  <img
                    key={index}
                    src={typeUrl}
                    alt={`Type ${index}`}
                    className={styles.typeImage}
                  />
                ))}
              </div>
            </div>
          )}

          <div className={styles.parameterContainer}>
            {parameterEntries
              .filter(([key]) => key !== "Types")
              .map(([key, value], index) => (

              <p key={index} className={styles.cardParameter}>
                <span className={styles.parameterKey}>{key}: </span>
                <span className={styles.parameterValue}>
                  {Array.isArray(value) ? value.join(", ") : value}
                </span>
              </p>

            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
