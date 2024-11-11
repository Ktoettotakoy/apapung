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
  const [actualDogName, setActualDogName] = useState("");

  const handlePokemonSubmit = async (input) => {
    console.log("Called handlePokemonSubmit");
    try {
      console.log("API ACCESS");
      const response = await fetch(`http://localhost:8080/pokemon/${input}/stats`);
      const data = await response.json();

      if (response.status == 404) {
        setPokemonData({
          name: "Pokemon is not found, please reload the whole page by pressing reload in the bottom right corner",
          image: "",
          parameters: JSON.stringify({}, null, 2),
        });
        return;
      }

      // for debug purposes
      //  const data = {
      //    Types: ["electric"],
      //    "Sprite url":
      //      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/404.png",
      //    "Total base stats": 363,
      //    "Dex number": 404,
      //    Name: "luxio",
      //  };
      //Extract fields for Card component
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
    setActualDogName(input);
    try {
      console.log("API ACCESS DOGS");

      const response = await fetch(`http://localhost:8080/breed-info/${input}/clean`);
      const data = await response.json();

      const { name, images, ...parameters } = data;

      // Choose a random image from the images array
      const randomImage =
        images && images.length > 0 ? images[Math.floor(Math.random() * images.length)] : "";

      setDogData({
        name,
        image: randomImage,
        parameters: JSON.stringify(parameters, null, 2),
      });
    } catch (error) {
      console.error("Error fetching Dog data:", error);
    }
  };

  // Handle VS button click
  const handleVSClick = () => {
    if (pokemonData && dogData) {
      setIsBrawling(true);
      setTimeout(() => {
        // After animation completes (simulate with a timeout), navigate to /or
        router.push({
          pathname: "/or",
          query: {
            pokemon: pokemonData.name,
            dog: actualDogName,
          },
        });
      }, 2000);
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
