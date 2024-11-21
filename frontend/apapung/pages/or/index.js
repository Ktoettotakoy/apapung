import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/Or.module.css";
import Carousel from "../../components/carousel";

// This function runs server-side to fetch data before the page is rendered
export async function getServerSideProps(context) {
  // if frontend app is run from docker,
  // it will have NEXT_PUBLIC_API_URL env var,
  // otherwise it defaults to localhost
  const apiUrl = process.env.BACKEND_URL || "http://localhost:8080";
  const { pokemon, dog } = context.query;

  if (!pokemon || !dog) {
    // If pokemon or dog is not provided in the query, return early with an error message or empty data
    return { props: { error: "Pokemon and Dog parameters are required" } };
  }

  try {
    // Fetch comparison data
    const fetchComparison = fetch(`${apiUrl}/compare/${pokemon}/${dog}`);
    const fetchPrice = fetch(`${apiUrl}/price/${dog}`);

    // Use Promise.all to wait for both fetches concurrently
    const [compareResponse, priceResponse] = await Promise.all([fetchComparison, fetchPrice]);

    const data = await compareResponse.json();
    const moneyPerDog = await priceResponse.json();

    const totalMoneyNeeded = data.dogsNeeded * moneyPerDog;
    // temporary measure
    const categoryList = [
      "videogames",
      "software",
      "kitchen",
      "kids",
      "diy",
      "grocery",
      "lighting",
      "music",
      "beauty",
      "baby",
      "gift-cards",
      "pet-supplies",
    ];

    const fetchAmazonProducts = await fetch(
      `${apiUrl}/amazon/bestselling/${selectedCategory}?dogPrice=${moneyPerDog}`
    );

    const listOfProducts = await fetchAmazonProducts.json();
    // TODO

    //Function to correctly pluralize dog breed names
    const pluralizeBreed = (name, count) => {
      if (count === 1) return name;
      if (name.endsWith("y")) {
        return name.slice(0, -1) + "ies";
      }
      return name + "s"; // General rule to add "s"
    };

    // Prepare the messages with data
    const messages = [
      `Pokemons like ${data.pokemon} are obviously overpowered!`,
      `You'll need a whole team of ${data.dogBreed}s to stand a chance!`,
      `To be precise...`,
      `You need ${data.dogsNeeded} ${pluralizeBreed(data.dogBreed, data.dogsNeeded)}!!!`,
      `They worth around ${totalMoneyNeeded} Euros!!!`,
      `Christmas is around the corner, you can use that money to buy... `,
    ];

    // Return the data as props to the page
    return {
      props: {
        messages,
        products: listOfProducts,
        dogsNeeded: data.dogsNeeded,
      },
    };
  } catch (error) {
    console.error("Error fetching comparison data:", error);
    return {
      props: {
        error: "Failed to fetch data. Please try again later.",
      },
    };
  }
}

export default function OrPage({ messages, products, dogsNeeded, error }) {
  const router = useRouter();
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [showSecondDiv, setShowSecondDiv] = useState(false);

  // Handle message display or screen transition
  const handleNextClick = () => {
    if (currentMessageIndex < messages.length - 1) {
      setCurrentMessageIndex(currentMessageIndex + 1);
    } else {
      setShowSecondDiv(true);
    }
  };

  if (error) {
    return (
      <div className={styles.screen}>
        <Head>
          <title>Apapung</title>
        </Head>
        <div className={styles.errorMessage}>{error}</div>
      </div>
    );
  }

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
        <Carousel products={products} dogsNeeded={dogsNeeded} />
        {/* <Slider products={products} dogsNeeded={dogsNeeded} /> */}
        <button className={styles.restartButton} onClick={() => router.push("/")}>
          Restart
        </button>
      </div>
    </div>
  );
}
