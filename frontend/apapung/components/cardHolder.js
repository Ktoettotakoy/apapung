// CardHolder.js
import { useState } from "react";
import TextInput from "./textInput.js";
import styles from "../styles/cardHolder.module.css";
import Card from "./Card.js";

export default function CardHolder({ className, placeholder }) {
  const [showInput, setShowInput] = useState(false);
  const [clickMeOnce, setClickMeOnce] = useState(true);
  const [cardData, setCardData] = useState(null);

  const handleInputSubmit = (input) => {
    setCardData({
      name: input,
      image: "/vercel.svg",
      parameter1: "Example Parameter",
    });
    setShowInput(false); // Close the modal
  };

  const handleButtonClickStart = () => {
    console.log("Button clicked for", placeholder); // Debugging click
    setClickMeOnce(false);
    setShowInput(true); // Show the modal
  };

  const handleButtonClickClose = () => {
    setClickMeOnce(true);
    setShowInput(false);
  };
  return (
    <div style={{ textAlign: "center" }}>
      {clickMeOnce && <button onClick={handleButtonClickStart}>Click Me</button>}

      {showInput && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <TextInput
              className={styles.modalTextInput}
              onEnter={handleInputSubmit}
              placeholder={placeholder}
            />
            <button onClick={handleButtonClickClose}>Close</button>
          </div>
        </div>
      )}

      {cardData && (
        <Card
          name={cardData.name}
          image={cardData.image}
          parameter1={cardData.parameter1}
          className={className}
        />
      )}
    </div>
  );
}
