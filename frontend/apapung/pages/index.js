import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";

export default function Home() {
  const router = useRouter();

  return (
    <div className={styles.backgroundContainer}>
      {/* Meta and Page Head */}
      <Head>
        <title>Apapung</title>
        <link rel="icon" type="image/jpg" href="/favicon.ico" />
      </Head>

      {/* Main Content */}
      <div className={styles.content}>
        {/* Centered Pokémon Title GIF */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "5vh",
            width: "100%",
          }}
        >
          <img
            src="/pokemonTitle.gif"
            alt="Pokemon Title"
            style={{ width: "40vw", height: "auto" }}
          />

          <img
            src="/HomeVs.png"
            alt="Versus"
            style={{ width: "20vw", height: "auto", marginTop: "2vh" }}
          />

          <div className={styles.introText}>
            Pokémon vs Dogs: Enter a Pokémon, choose dog breed and number, and see the dogs' worth
            using real-world Amazon goods!
          </div>
        </div>

        {/* Pikachu GIF in Lower Left Corner */}
        <img src="/Picacku.gif" alt="Pikachu" className={styles.lowerLeftImage} />

        {/* Start Button in Lower Center */}
        <div style={{ position: "relative", width: "100%", height: "100vh" }}>
          <button className={styles.startButton} onClick={() => router.push("/brawl")}>
            Start
          </button>
        </div>
      </div>
    </div>
  );
}
