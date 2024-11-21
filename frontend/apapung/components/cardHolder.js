// CardHolder.js
import { useState } from "react";
import TextInput from "./textInput";
import styles from "../styles/cardHolder.module.css";

export default function CardHolder({
  startButtonPlaceholder,
  popUpModalPlaceholder,
  onCardSubmit,
}) {
  const [showInput, setShowInput] = useState(false);
  const [clickMeOnce, setClickMeOnce] = useState(true);
  // const [cardData, setCardData] = useState(null);

  const handleInputSubmit = (input) => {
    console.log("called handleInputSubmit");
    // const data = {
    //   name: input,
    //   image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/23.png",
    //   parameter1: "Example Parameter",
    // };
    // setCardData(data);
    onCardSubmit(input);
    setShowInput(false); // Close the modal
  };

  const handleButtonClickStart = () => {
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
    </div>
  );
}
