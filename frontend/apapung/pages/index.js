import Head from 'next/head';
import styles from "../styles/Home.module.css";
import TextInput from "../components/textInput.js";

export default function Home() {
    return (
        <>
            {/* Meta and Page Head */}
            <Head>
                <title>Apapung</title>
                <link rel="icon" type="image/jpg" href="/favicon.ico" />
            </Head>

            {/* Main Content */}
            <main className={styles.main}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '10vh' }}>
                    <img src="/pokemonTitle.gif" alt="Pokemon Title" width="400" />
                </div>

                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <img src="/Picacku.gif" alt="Pikachu" width="500" />
                </div>

                <h1 style={{ textAlign: 'center', marginTop: '20px' }}>
                    Welcome to Apapung
                </h1>

                <TextInput />
            </main>
        </>
    );
}


