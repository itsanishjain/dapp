import React from "react";
import Web3Modal from "web3modal";
import { useState, useEffect, useRef } from "react";
import GradientButton from "../src/components/GradientButton";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  TOKEN_CONTRACT_ADDRESS,
  TOKEN_CONTRACT_ABI,
} from "../src/constants/icoAddressABI";

import { NFT_CONTRACT_ADDRESS, abi } from "../src/constants";
const NFT_CONTRACT_ABI = abi;

import { BigNumber, Contract, providers, utils } from "ethers";
import Button from "../src/components/Button";
import Loader from "../src/components/Loader";

export default function Ico() {
  const zero = BigNumber.from(0);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  // keeps tracks of user token balance based on theire web3Rocks NFTs
  const [tokenToClaimed, setTokenToClaimed] = useState(zero);

  // keeps tracks of user toekens
  const [balanceOfWeb3RocksTokens, setBalanceOfWeb3RocksTokens] =
    useState(zero);

  // amount of token user wants
  const [tokenAmount, setTokenAmount] = useState(zero);
  // total supply is of 10,000 so keeps tracks of the total supply
  const [tokensMinted, setTokensMinted] = useState(zero);

  const [walletConnected, setWalletConnected] = useState(false);
  const web3ModalRef = useRef(); // return the object with key named current

  const checkErrorTypeAndNotify = (error) => {
    if (error.message.includes("reverted")) {
      toast.error(error.error.message);
    } else if (
      error.message.includes(
        "MetaMask Tx Signature: User denied transaction signature."
      )
    ) {
      toast.error("Transaction cancelled");
    } else {
      toast.error(error.message);
    }
  };

  const getProviderOrSigner = async (needSigner = false) => {
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);
    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 4) {
      throw new Error("Change network to Rinkeby");
    }

    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  };

  const connectWallet = async () => {
    try {
      await getProviderOrSigner(true);
      setWalletConnected(true);
    } catch (error) {
      toast(error.message);
    }
  };

  const getTotalTokensMinted = async () => {
    const provider = await getProviderOrSigner();
    const tokenContract = new Contract(
      TOKEN_CONTRACT_ADDRESS,
      TOKEN_CONTRACT_ABI,
      provider
    );
    try {
      const _tokenMinted = await tokenContract.totalSupply();
      setTokensMinted(_tokenMinted);
    } catch (error) {
      checkErrorTypeAndNotify(error);
    }
  };

  useEffect(() => {
    web3ModalRef.current = new Web3Modal({
      network: "rinkeby",
      providerOptions: {},
      cacheProvider: true,
    });

    connectWallet();
    getTotalTokensMinted();
    getBalanceOfWeb3RocksTokens();
  }, [walletConnected]);

  // gives the user web3 rocks NFTs
  const getTokensToBeClaimed = async () => {
    try {
      const provider = await getProviderOrSigner();
      const nftContract = new Contract(
        NFT_CONTRACT_ABI,
        NFT_CONTRACT_ADDRESS,
        provider
      );
    } catch (error) {
      console.log("error GET TOKENS CLAIMED", error);
      toast(error.error.message);
    }
  };

  /* getBalanceOfWeb3RocksTokens: checks the balance of Web3 Rocks Tokens's held by an address
   */

  const getBalanceOfWeb3RocksTokens = async () => {
    const signer = await getProviderOrSigner(true);
    const tokenContract = new Contract(
      TOKEN_CONTRACT_ADDRESS,
      TOKEN_CONTRACT_ABI,
      signer
    );
    const userAddress = await signer.getAddress();
    try {
      const _balanceOfWeb3RocksTokens = await tokenContract.balanceOf(
        userAddress
      );
      setBalanceOfWeb3RocksTokens(_balanceOfWeb3RocksTokens);
    } catch (error) {
      checkErrorTypeAndNotify(error);
    }
  };

  const claimWeb3RocksToken = async () => {
    try {
      const signer = await getProviderOrSigner(true);
      const tokenContract = new Contract(
        TOKEN_CONTRACT_ADDRESS,
        TOKEN_CONTRACT_ABI,
        signer
      );
      const tx = await tokenContract.claim();
      console.log("Transaction hash:", tx);
      setLoading(true);
      await tx.wait();
      setLoading(false);
      await getTotalTokensMinted();
      toast("Sucessfully claimed Web3 Rocks Tokens");
    } catch (error) {
      console.log(error, "Web3rocks CLAMEING TOEKESN");
      checkErrorTypeAndNotify(error);
    }
  };

  // calling Web3RocksToken contract to mint tokens
  const mintWeb3RocksTokens = async (amount) => {
    if (amount.isZero()) {
      toast.error("Please enter a valid amount");
      return;
    }

    try {
      const signer = await getProviderOrSigner(true);

      const tokenContract = new Contract(
        TOKEN_CONTRACT_ADDRESS,
        TOKEN_CONTRACT_ABI,
        signer
      );

      const value = 0.001 * amount;
      const tx = await tokenContract.mint(amount, {
        // utitls.parseEther convets string to ether
        value: utils.parseEther(value.toString()),
      });
      setLoading2(true);
      await tx.wait();
      setLoading2(false);
      await getTotalTokensMinted();
      await getBalanceOfWeb3RocksTokens();
      toast("Sucessfully minted Web3 Rocks Tokens");
    } catch (error) {
      console.error("IN MINT TOKENS", error);
      checkErrorTypeAndNotify(error);
    }
  };

  const handelInputChange = (e) => {
    if (e.target.value !== "") {
      setTokenAmount(BigNumber.from(e.target.value));
    }
  };

  return (
    <>
      <ToastContainer />
      <div
        className="bg-gradient-to-tr 
         from-stone-400 
      to-stone-600 p-4 mt-8 rounded-md lg:max-w-4xl lg:mx-auto mx-2"
      >
        <p className="font-medium text-white text-lg  ">
          Welcom to web3Rocks ICO, Those Who are earlier supporter for this
          project. Now exchanges there NFTs with Web3Rock Token. but who dont
          they still support this projects/wants to go to the{" "}
          <span className="text-red-300">MARS</span> by buying this token
        </p>
        <div className="max-w-sm mx-auto text-center mt-8 text-xl font-medium">
          <GradientButton
            text={walletConnected ? "Connected" : "Connect Wallet"}
            onClick={connectWallet}
          />

          {!loading ? (
            <Button text="Claim Token" onClick={claimWeb3RocksToken} />
          ) : (
            <Loader />
          )}
        </div>
      </div>
      <div
        className="bg-gradient-to-br 
         from-orange-200 to-orange-500 p-4 mt-8 rounded-md lg:max-w-4xl lg:mx-auto mx-2"
      >
        {/* BigNumber {_hex: '0x0649d2c967d9500000', _isBigNumber: true} 'RRRRRRRRRRRRRRRRRRRRRRRRR' */}

        {/* formatEther converts the bigNumber like above to string */}
        <p className="text-2xl text-center">
          {utils.formatEther(tokensMinted)}/10,000 Web3Rocks token already
          minted <span className="text-red-500">Hurry up DAO is coming !!</span>
        </p>

        <p className="mt-4 text-2xl text-center">
          You have Web3Rocks tokens{" "}
          {utils.formatEther(balanceOfWeb3RocksTokens)}
        </p>

        <input
          className="appearance-none block w-full mt-4 p-4 rounded-lg bg-gray-600 text-white 
          focus:border-trasparent focus:outline-none"
          placeholder="Amount of Tokens"
          type="number"
          onChange={handelInputChange}
        />

        {!loading2 ? (
          <Button
            text="Mint Token"
            onClick={() => mintWeb3RocksTokens(tokenAmount)}
          />
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
}
