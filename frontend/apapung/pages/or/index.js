import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/Or.module.css";
import Slider from "../../components/slider";

export default function OrPage() {
  const router = useRouter();
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [showSecondDiv, setShowSecondDiv] = useState(false);

  // Messages for the first page, placeholders will be replaced with data once available
  const [messages, setMessages] = useState([
    `Pokemons are obviously overpowered!`,
    `You'll need a whole team of dogs to stand a chance!`,
    `To be precise...`,
    `You need XXXX dogs!!!`,
    `They worth around 1000$!!!`,
    `For that amount of money, you could buy...`,
  ]);

  const { pokemon, dog } = router.query;

  // Function to fetch and set the dog and Pokémon comparison data
  const fetchComparisonData = async (pokemonName, dogName) => {
    try {
      console.log("API ACCESS COMPARE");
      const response = await fetch(`http://localhost:8080/compare/${pokemonName}/${dogName}`);
      const data = await response.json();

      const { pokemon, dogsNeeded, dogBreed } = data;

      const moneyPerDogResponse = await fetch(`http://localhost:8080/price/${dogBreed}`);
      const moneyPerDog = await moneyPerDogResponse.json();

      // Define a function to correctly pluralize dog breed names
      const pluralizeBreed = (name, count) => {
        if (count === 1) return name;
        if (name.endsWith("y")) {
          return name.slice(0, -1) + "ies";
        }
        return name + "s"; // General rule to add "s"
      };

      // Update messages with specific data
      setMessages([
        `Pokemons like ${pokemon} are obviously overpowered!`,
        `You'll need a whole team of ${dogBreed}s to stand a chance!`,
        `To be precise...`,
        `You need ${dogsNeeded} ${pluralizeBreed(dogBreed, dogsNeeded)}!!!`,
        `They worth around ${dogsNeeded * moneyPerDog} Euros!!!`,
        `For that amount of money, you could buy...`,
      ]);
    } catch (error) {
      console.error("Error fetching comparison data:", error);
    }
  };

  // Fetch comparison data when component mounts and query parameters are available
  useEffect(() => {
    if (pokemon && dog) {
      const fetchData = async () => {
        await fetchComparisonData(pokemon, dog);
      };
      fetchData();
    }
  }, [pokemon, dog]);

  // Handle message display or screen transition
  const handleNextClick = () => {
    if (currentMessageIndex < messages.length - 1) {
      setCurrentMessageIndex(currentMessageIndex + 1);
    } else {
      setShowSecondDiv(true);
    }
  };

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
