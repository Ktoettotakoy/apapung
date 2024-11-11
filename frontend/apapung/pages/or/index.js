import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/Or.module.css";
import Slider from "../../components/slider";

// This function runs server-side to fetch data before the page is rendered
export async function getServerSideProps(context) {
  const { pokemon, dog } = context.query;

  if (!pokemon || !dog) {
    // If pokemon or dog is not provided in the query, return early with an error message or empty data
    return { props: { error: "Pokemon and Dog parameters are required" } };
  }

  try {
    // Fetch comparison data
    const fetchComparison = fetch(`http://localhost:8080/compare/${pokemon}/${dog}`);
    const fetchPrice = fetch(`http://localhost:8080/price/${dog}`);

    // Use Promise.all to wait for both fetches concurrently
    const [compareResponse, priceResponse] = await Promise.all([fetchComparison, fetchPrice]);

    const data = await compareResponse.json();
    const moneyPerDog = await priceResponse.json();

    const totalMoneyNeeded = data.dogsNeeded * moneyPerDog;
    // temporary measure
    const categoryList = ["videogames", "software", "electronics", "kitchen", "kids"];

    const fetchAmazonProducts = await fetch(
      `http://localhost:8080/amazon/bestselling/${
        categoryList[Math.floor(Math.random() * categoryList.length)]
      }/${dog}`
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
      `For that amount of money, you could buy a present to your friend like...`,
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
        <Slider products={products} dogsNeeded={dogsNeeded} />
        <button className={styles.restartButton} onClick={() => router.push("/")}>
          Restart
        </button>
      </div>
    </div>
  );
}
