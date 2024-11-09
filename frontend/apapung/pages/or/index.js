import { useState } from "react";
import { FaArrowDown } from "react-icons/fa";
import styles from "../../styles/Or.module.css";

export default function OrPage() {
  const [showSecondDiv, setShowSecondDiv] = useState(false);

  // Handle arrow click to slide up the first div
  const handleArrowClick = () => {
    setShowSecondDiv(true); // Triggers the transition effect
  };

  return (
    <div className={styles.screen}>
      {/* First Page with after brawl info */}
      <div className={`${styles.fullscreenDiv} ${showSecondDiv ? styles.slideUp : ""}`}>
        <div className={styles.content}>
          <h1>Pokemon is too strong!</h1>
          <p>
            You'll need a whole team of dogs to stand a chance! To be precise, you need XXXX dogs
            They cost 1000$. For that amount of money you could actually buy...
          </p>
          <p>Click on the arrow</p>
        </div>
        <button onClick={handleArrowClick} className={styles.arrowButton}>
          <FaArrowDown />
        </button>
      </div>

      {/* Second Page with Amazon Carousel */}
      <div className={styles.fullscreenDiv}>
        <div className={styles.content}>
          <h1>With this money, you could buy...</h1>
          <p>Imagine the possibilities!</p>
        </div>
      </div>
    </div>
  );
}
