// CardHolder.js
import { useState } from "react";
import TextInput from "./textInput";
import styles from "../styles/cardHolder.module.css";
import Card from "./Card";

export default function CardHolder({
  startButtonPlaceholder,
  cardStyles,
  popUpModalPlaceholder,
  onCardSubmit,
}) {
  const [showInput, setShowInput] = useState(false);
  const [clickMeOnce, setClickMeOnce] = useState(true);
  const [cardData, setCardData] = useState(null);

  const handleInputSubmit = (input) => {
    const data = { name: input, image: "/Picacku.gif", parameter1: "Example Parameter" };
    setCardData(data);
    onCardSubmit(data);
    setShowInput(false); // Close the modal
  };

  const handleButtonClickStart = () => {
    console.log("Button clicked for"); // Debugging click
    setClickMeOnce(false);
    setShowInput(true); // Show the modal
  };

  const handleButtonClickClose = () => {
    setClickMeOnce(true);
    setShowInput(false);
  };
  return (
    <div style={{ textAlign: "center" }}>
      {clickMeOnce && (
        <button className={styles.startButton} onClick={handleButtonClickStart}>
          {startButtonPlaceholder}
        </button>
      )}

      {showInput && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <TextInput
              className={styles.modalTextInput}
              onEnter={handleInputSubmit}
              placeholder={popUpModalPlaceholder}
            />
            <button className={styles.modalCloseButton} onClick={handleButtonClickClose}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {cardData && (
        <Card
          name={cardData.name}
          image={cardData.image}
          parameter1={cardData.parameter1}
          className={cardStyles}
        />
      )}
    </div>
  );
}
