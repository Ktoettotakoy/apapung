import Image from "next/image";
import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/Or.module.css";

export default function OrPage() {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0); // Track the current message
  const [showSecondDiv, setShowSecondDiv] = useState(false);
  const router = useRouter();

  // Define the messages in an array
  const messages = [
    "Pokemons are obviously overpowered!",
    "You'll need a whole team of dogs to stand a chance!",
    "To be precise..",
    "You need XXXX dogs!!!",
    "They worth around 1000$!!!",
    "For that amount of money, you could buy...",
  ];

  // Handle the next button click
  const handleNextClick = () => {
    if (currentMessageIndex < messages.length - 1) {
      setCurrentMessageIndex(currentMessageIndex + 1); // Show the next message
    } else {
      setShowSecondDiv(true);
    }
  };

  return (
    <div className={styles.screen}>
      <Head>
        <title>Apapung</title>
      </Head>
      {/* First Page with after brawl info */}
      <div className={`${styles.fullscreenDiv} ${showSecondDiv ? styles.slideUp : ""}`}>
        <div className={styles.content}>
          {/* Pokémon character with dialog bubble */}
          <img src="/poketrainer.gif" alt="Pokémon" className={styles.pokemonCharacter} />
          <div className={styles.speechBubble} onClick={handleNextClick}>
            <p>{messages[currentMessageIndex]}</p>
          </div>
        </div>
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
