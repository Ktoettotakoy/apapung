import Image from "next/image";
import styles from "../../styles/Brawl.module.css";
import CardHolder from "../../components/cardHolder.js";

export default function Brawl() {
  return (
    <div className={styles.mainScreenContainer}>
      <div className={styles.pokemonContainer}>
        <CardHolder
          className={styles.pokemonPopup}
          placeholder={"Choose a pokemon by name"}
        ></CardHolder>
      </div>
      <div className={styles.vsContainer}>
        <Image
          src="/Vs.png"
          alt="VS Logo"
          className={styles.vsLogo}
          width={200}
          height={200}
          priority={false}
        />
      </div>
      <div className={styles.dogContainer}>
        <CardHolder className={styles.dogPopup} placeholder={"Choose a dog by breed"}></CardHolder>
      </div>
    </div>
  );
}
