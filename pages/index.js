import { Contract, providers, utils } from "ethers";
import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import Web3Modal from "web3modal";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Card from "../src/components/Card";
import Button from "../src/components/Button";
import Loader from "../src/components/Loader";
import NFTCard from '../src/components/NFTCard';

import { abi, NFT_CONTRACT_ADDRESS } from "../src/constants";

export default function Home() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [presaleStarted, setPresaleStarted] = useState(false);
  const [presaleEnded, setPresaleEnded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [tokenIdsMinted, setTokenIdsMinted] = useState("0");

  const web3ModalRef = useRef();

  const presaleMint = async () => {
    try {
      const signer = await getProviderOrSigner(true);
      const whitelistContract = new Contract(NFT_CONTRACT_ADDRESS, abi, signer);
      const tx = await whitelistContract.presaleMint({
        value: utils.parseEther("0.01"),
      });
      setLoading(true);
      await tx.wait();
      setLoading(false);
      // window.alert("You successfully minted web3Rocks!");
      toast("You successfully minted web3Rocks!");
    } catch (err) {
      console.error(err);
    }
  };

  const publicMint = async () => {
    try {
      const signer = await getProviderOrSigner(true);

      const whitelistContract = new Contract(NFT_CONTRACT_ADDRESS, abi, signer);

      const tx = await whitelistContract.mint({
        value: utils.parseEther("0.01"),
      });
      setLoading(true);
      await tx.wait();
      setLoading(false);
      toast("You successfully minted a web3Rocks!");
    } catch (err) {
      console.error(err);
    }
  };

  const connectWallet = async () => {
    try {
      await getProviderOrSigner();
      setWalletConnected(true);
    } catch (err) {
      console.error(err);
    }
  };


  const startPresale = async () => {
    try {
      const signer = await getProviderOrSigner(true);
      const whitelistContract = new Contract(NFT_CONTRACT_ADDRESS, abi, signer);
      const tx = await whitelistContract.startPresale();
      setLoading(true);
      await tx.wait();
      setLoading(false);
      await checkIfPresaleStarted();
    } catch (err) {
      console.error(err);
    }
  };

  const checkIfPresaleStarted = async () => {
    try {
      const provider = await getProviderOrSigner();
      const nftContract = new Contract(NFT_CONTRACT_ADDRESS, abi, provider);
      const _presaleStarted = await nftContract.presaleStarted();
      if (!_presaleStarted) {
        await getOwner();
      }
      setPresaleStarted(_presaleStarted);
      return _presaleStarted;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const checkIfPresaleEnded = async () => {
    try {
      const provider = await getProviderOrSigner();
      const nftContract = new Contract(NFT_CONTRACT_ADDRESS, abi, provider);
      const _presaleEnded = await nftContract.presaleEnded();
      const hasEnded = _presaleEnded.lt(Math.floor(Date.now() / 1000));
      if (hasEnded) {
        setPresaleEnded(true);
      } else {
        setPresaleEnded(false);
      }
      return hasEnded;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const getOwner = async () => {
    try {
      const provider = await getProviderOrSigner();
      const nftContract = new Contract(NFT_CONTRACT_ADDRESS, abi, provider);
      const _owner = await nftContract.owner();
      const signer = await getProviderOrSigner(true);
      const address = await signer.getAddress();
      if (address.toLowerCase() === _owner.toLowerCase()) {
        setIsOwner(true);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const getTokenIdsMinted = async () => {
    try {
      const provider = await getProviderOrSigner();
      const nftContract = new Contract(NFT_CONTRACT_ADDRESS, abi, provider);
      const _tokenIds = await nftContract.tokenIds();
      setTokenIdsMinted(_tokenIds.toString());
    } catch (err) {
      console.error(err);
    }
  };

  const getProviderOrSigner = async (needSigner = false) => {
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);
    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 4) {
      window.alert("Change the network to Rinkeby");
      throw new Error("Change network to Rinkeby");
    }

    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  };

  useEffect(() => {
    if (!walletConnected) {
      web3ModalRef.current = new Web3Modal({
        network: "rinkeby",
        providerOptions: {},
        disableInjectedProvider: false,
      });
      connectWallet();
      const _presaleStarted = checkIfPresaleStarted();
      if (_presaleStarted) {
        checkIfPresaleEnded();
      }

      getTokenIdsMinted();

      // Set an interval which gets called every 5 seconds to check presale has ended
      const presaleEndedInterval = setInterval(async function () {
        console.log("calling checkIfPresaleEnded every 5 seconds.......");
        const _presaleStarted = await checkIfPresaleStarted();
        if (_presaleStarted) {
          const _presaleEnded = await checkIfPresaleEnded();
          if (_presaleEnded) {
            clearInterval(presaleEndedInterval);
          }
        }
      }, 5 * 1000);

      setInterval(async function () {
        await getTokenIdsMinted();
      }, 5 * 1000);
    }
  }, [walletConnected]);

  const renderButton = () => {
    if (!walletConnected)
      return <Button text={"Connect your wallet"} onClick={connectWallet} />;
    if (loading) return <Loader />;
    if (isOwner && !presaleStarted)
      return <Button text="Start Presale!" onClick={startPresale} />;
    if (!presaleStarted) {
      return (
        <div>
          <div>Presale hasnt started!</div>
        </div>
      );
    }
    if (presaleStarted && !presaleEnded) {
      return (
        <div>
          <div>
            Presale has started!!! If your address is whitelisted, Mint a Web3
            Rocks 🥳
          </div>
          <button onClick={presaleMint}>Presale Mint 🚀</button>
        </div>
      );
    }

    if (presaleStarted && presaleEnded) {
      // return <button onClick={publicMint}>Public Mint 🚀</button>;
      return <Button onClick={publicMint} text="Public Mint 🚀" />;
    }
  };

  return (
    <div>
      <Head>
        <title>Web3 Rocks</title>
        <meta name="description" content="Whitelist-Dapp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ToastContainer />

      <Card
        name="Welcome to Web3 Rocks!"
        designation={`Its an NFT collection for developers in Crypto ${tokenIdsMinted}/20 have been minted `}
        imageUrl="rocket.svg"
      />
      <div className="max-w-sm mx-auto text-center mt-8 text-xl font-medium ">
        {renderButton()}
      </div>
      <footer className="mt-8 text-center text-slate-400 font-medium text-lg">
        Made with &#10084; by Web3 Rocks
      </footer>

      {/* <NFTCard /> */}
    </div>
  );
}
