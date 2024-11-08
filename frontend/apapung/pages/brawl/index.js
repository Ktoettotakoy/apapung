import Image from "next/image";
import styles from "../../styles/Brawl.module.css";
import TextInput from "../../components/textInput.js";

export default function Brawl() {
  return (
    <div className={styles.mainScreenContainer}>
      <div className={styles.pokemonContainer}>
        <TextInput className={styles.pokemonTextInputWindow}></TextInput>
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
        <TextInput className={styles.dogTextInputWindow}></TextInput>
      </div>
    </div>
  );
}
