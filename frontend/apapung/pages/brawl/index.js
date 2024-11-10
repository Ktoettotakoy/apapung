import Head from "next/head.js";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/Brawl.module.css";
import CardHolder from "../../components/cardHolder.js";
import Card from "../../components/Card.js";

export default function Brawl() {
  const router = useRouter();
  const [pokemonData, setPokemonData] = useState(null);
  const [dogData, setDogData] = useState(null);
  const [isBrawling, setIsBrawling] = useState(false);

  // Handle pokemon card submission Yaqi work here
  const handlePokemonSubmit = async (input) => {
    console.log("Called handlePokemonSubmit");
    try {
      console.log("API ACCESS");
      const response = await fetch(`http://localhost:8080/pokemon/${input}/stats`);
      const data = await response.json();

      // if (response.status(404)) {
      // }

      // for debug purposes
      // const data = {
      //   Types: ["electric"],
      //   "Sprite url":
      //     "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/404.png",
      //   "Total base stats": 363,
      //   "Dex number": 404,
      //   Name: "luxio",
      // };
      // Extract fields for Card component
      const { Name: name, "Sprite url": image, ...parameters } = data;

      // Set Pokemon data for Card display
      setPokemonData({
        name,
        image,
        parameters: JSON.stringify(parameters, null, 2),
      });
    } catch (error) {
      console.error("Error fetching Pokemon data:", error);
    }
  };

  // Handle dog card submission
  const handleDogSubmit = async (input) => {
    console.log("Called handleDogSubmit");

    try {
      console.log("API ACCESS");
      setDogData({
        image: "",
        name: "Pokemon",
        parameters: JSON.stringify(
          { Types: ["fire", "flying"], "Total base stats": 534, "Dex number": 6 },
          null,
          2
        ),
      });
    } catch (error) {}
  };

  // Handle VS button click
  const handleVSClick = () => {
    if (pokemonData && dogData) {
      setIsBrawling(true); // Start the brawl animation
      setTimeout(() => {
        // After animation completes (simulate with a timeout), navigate to /or
        router.push({
          pathname: "/or",
        });
      }, 2000); // Adjust this time based on the animation duration
    } else {
      alert("Please select both a Pokemon and a Dog!");
    }
  };

  return (
    <div className={styles.mainScreenContainer}>
      <Head>
        <title>Apapung</title>
      </Head>
      <div className={styles.pokemonContainer}>
        <CardHolder
          startButtonPlaceholder={"Click to choose a pokemon"}
          cardStyles={styles.pokemonCard}
          popUpModalPlaceholder={"Enter pokemon name"}
          onCardSubmit={handlePokemonSubmit}
        ></CardHolder>
        {pokemonData && (
          <Card
            name={pokemonData.name}
            image={pokemonData.image}
            parameters={pokemonData.parameters}
            className={styles.pokemonCard}
          />
        )}
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
          popUpModalPlaceholder={"Enter dog breed"}
          onCardSubmit={handleDogSubmit}
        ></CardHolder>
        {dogData && (
          <Card
            name={dogData.name}
            image={dogData.image}
            parameters={dogData.parameters}
            className={styles.dogCard}
          />
        )}
        <button className={styles.resetButton} onClick={() => router.reload()}>
          Reset
        </button>
      </div>
    </div>
  );
}
