import Head from "next/head";
import { useState, useEffect } from "react";
import styles from "../../styles/Or.module.css";
import Slider from "../../components/slider";
import { useRouter } from "next/router";

export default function OrPage() {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0); // Track the current message
  const [showSecondDiv, setShowSecondDiv] = useState(false); // State to toggle between screens

  // Messages for the first page
  const messages = [
    "Pokemons are obviously overpowered!",
    "You'll need a whole team of dogs to stand a chance!",
    "To be precise..",
    "You need XXXX dogs!!!",
    "They worth around 1000$!!!",
    "For that amount of money, you could buy...",
  ];

  // Handle message display or screen transition
  const handleNextClick = () => {
    if (currentMessageIndex < messages.length - 1) {
      setCurrentMessageIndex(currentMessageIndex + 1); // Show the next message
    } else {
      setShowSecondDiv(true); // Transition to the second div
    }
  };

  const router = useRouter();

  return (
    <div className={styles.screen}>
      <Head>
        <title>Apapung</title>
      </Head>
      {/* First Page */}
      <div
        className={`${styles.fullscreenDiv} ${styles.firstScreen} ${
          showSecondDiv ? styles.slideUp : ""
        }`}
      >
        <div className={styles.content}>
          <img src="/poketrainer.gif" alt="Pokémon" className={styles.pokemonCharacter} />
          <div className={styles.speechBubble} onClick={handleNextClick}>
            <p>{messages[currentMessageIndex]}</p>
          </div>
        </div>
      </div>

      {/* Second Page */}
      <div
        className={`${styles.fullscreenDiv} ${styles.secondScreen} ${
          showSecondDiv ? styles.show : styles.hidden
        }`}
      >
        <Slider />
        <button className={styles.restartButton} onClick={() => router.push("/")}>
          Restart
        </button>
      </div>
    </div>
  );
}
