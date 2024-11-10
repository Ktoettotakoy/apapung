import styles from "../styles/Card.module.css";

export default function Card({ name, image, parameters, className }) {
  // Convert the parameters object into an array of key-value pairs
  const parsed = JSON.parse(parameters);
  const parameterEntries = Object.entries(parsed);

  return (
    <div className={`${styles.cardContainer} ${className}`}>
      <div className={styles.card}>
        <img src={image} alt={name} className={styles.cardImage} />
        <div className={styles.infoContainer}>
          <h2 className={styles.cardName}>Name:{name}</h2>
          <div className={styles.parameterContainer}>
            {parameterEntries.map(([key, value], index) => (
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
