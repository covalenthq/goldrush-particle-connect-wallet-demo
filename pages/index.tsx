import '@particle-network/connect-react-ui/dist/index.css';
import { ConnectButton } from '@particle-network/connect-react-ui';
import styles from "../styles/Home.module.css";
import { NextPage } from "next";
import { useRouter } from 'next/router';

const Home: NextPage = () => {
  const router = useRouter();

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <ConnectButton.Custom>
          {({ account, openAccountModal, openConnectModal, openChainModal }) => {
            if (!account) {
              return (
                <div className={styles.buttonContainer}>
                  <button onClick={openConnectModal} className={styles.button}>
                    <img src="https://i.imgur.com/JTPDyCN.png" alt="Logo" className={styles.buttonLogo} />
                    <span>Open Connect</span>
                  </button>

                </div>
              );
            }
            return (
              <div className={styles.buttonContainer}>
                <button onClick={openAccountModal} className={`${styles.button} ${styles.greyButton}`} disabled={!account}>
                  Open Account
                </button>
                <button onClick={openChainModal} className={`${styles.button} ${styles.greyButton}`} disabled={!account}>
                  Open Switch Network
                </button>
                <button
                  onClick={() => router.push(`/landing?address=${account}`)}
                  className={`${styles.button} ${styles.exploreWalletButton}`}
                >
                  Explore Wallet
                </button>
                <div className={styles.addressContainer}>
                  <h3>Address</h3>
                  <p>{account}</p>
                </div>
              </div>
            );
          }}
        </ConnectButton.Custom>
      </div>
    </main>
  );
};

export default Home;
