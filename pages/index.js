import Button from "../src/components/Button";
import Card from "../src/components/Card";
import List from "../src/components/List";

import React, { useEffect, useRef, useState } from "react";

import Web3Modal from "web3modal";
import { Contract, providers, utils } from "ethers";

//connectWallet: Connects the MetaMask wallet

export default function Home() {
  // useRef hook persitant storage kinda thing
  const [walletConnected, setWalletConnected] = useState(false);

  const web3ModalRef = useRef();

  useEffect(() => {
    console.log("RUNNING USE EFFECT....");

    if (!walletConnected) {
      web3ModalRef.current = new Web3Modal({
        network: "rinkeby",
        providerOptions: {}, // TODO it is about wallet
        disableInjectedProvider: false, //  TODO
      });

      // console.log("@@@@@@@@@@@@@@@@@@@@@@@ WEB# MODAL", web3ModalRef.current);

      connectWallet();
    }
  }, [walletConnected]);

  const connectWallet = async () => {
    console.log("CONNECT WALLET!!!!");
    try {
      // Get the provider from web3Modal, which in our case is MetaMask
      // When used for the first time, it prompts the user to connect their wallet
      await getProviderOrSigner();
      setWalletConnected(true);
    } catch (err) {
      console.error("CONNECT WALLET ERROR", err);
    }
  };

  // @param {*} needSigner - True if you need the signer, default false otherwise

  const getProviderOrSigner = async (needSigner = false) => {
    console.log("GET PRO AND SIGN");

    const provider = await web3ModalRef.current.connect(); // wallet  provider thing
    const web3Provider = new providers.Web3Provider(provider); // ETHERS providers

    // console.log("NETWORKS THINGS::::", await web3Provider.getNetwork()); // return object

    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 4) {
      // RINKEBY chainid is 4;
      window.alert("Change the network to Rinkeby");
      throw new Error("Change network to Rinkeby");
    }

    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    console.log("FINE>>>>>>>>>>>>>>>>>>>>", web3Provider);
    return web3Provider;
  };

  return (
    <>
      <div className="text-4xl text-center">Hello</div>
      <Card
        name="Marry Gross"
        designation="Product engineer"
        imageUrl="https://tailwindcss.com/img/erin-lindford.jpg"
      />
      <Button />
      <List />
    </>
  );
}
