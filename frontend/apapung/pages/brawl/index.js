import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/Brawl.module.css";
import CardHolder from "../../components/cardHolder.js";

export default function Brawl() {
  const router = useRouter();
  const [pokemonData, setPokemonData] = useState(null);
  const [dogData, setDogData] = useState(null);
  const [isBrawling, setIsBrawling] = useState(false);

  // Handle pokemon card submission
  const handlePokemonSubmit = (data) => {
    setPokemonData(data);
  };

  // Handle dog card submission
  const handleDogSubmit = (data) => {
    setDogData(data);
  };

  // Handle VS button click
  const handleVSClick = () => {
    if (pokemonData && dogData) {
      setIsBrawling(true); // Start the brawl animation
      setTimeout(() => {
        // After animation completes (simulate with a timeout), navigate to /or
        router.push({
          pathname: "/or",
          query: { info: "TestString" }, // Pass data to the /or page
        });
      }, 2000); // Adjust this time based on the animation duration
    } else {
      alert("Please select both a Pokemon and a Dog!");
    }
  };
  return (
    <div className={styles.mainScreenContainer}>
      <div className={styles.pokemonContainer}>
        <CardHolder
          startButtonPlaceholder={"Click to choose a pokemon"}
          cardStyles={styles.pokemonCard}
          popUpModalPlaceholder={"Pokemon's name here"}
          onCardSubmit={handlePokemonSubmit}
        ></CardHolder>
      </div>
      <div className={styles.vsContainer}>
        <Image
          src="/Vs.png"
          alt="VS Logo"
          className={`${styles.vsLogo} ${isBrawling ? styles.spinAnimation : ""}`}
          width={200}
          height={200}
          onClick={handleVSClick}
          priority={false}
        />
      </div>
      <div className={styles.dogContainer}>
        <CardHolder
          startButtonPlaceholder={"Click to choose a dog breed"}
          cardStyles={styles.dogCard}
          popUpModalPlaceholder={"Choose a dog by breed"}
          onCardSubmit={handleDogSubmit}
        ></CardHolder>
      </div>
    </div>
  );
}
