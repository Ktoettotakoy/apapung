import styles from "../styles/Card.module.css";

export default function Card({ name, image, parameter1, className }) {
  return (
    <div className={className}>
      <div className={styles.card}>
        <img src={image} alt={name} className={styles.cardImage} />
        <div className={styles.infoContainer}>
          <h2 className={styles.cardName}>{name}</h2>
          <p className={styles.cardParameter}>Parameter 1: {parameter1}</p>
        </div>
      </div>
    </div>
  );
}
