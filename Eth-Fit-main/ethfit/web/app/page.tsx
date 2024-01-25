"use client";

import { Account } from "../components/Account";
import { Connect } from "../components/Connect";
import { Connected } from "../components/Connected";
import { MintNFT } from "../components/MintNFT";
import { FormEvent, useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { NetworkSwitcher } from "../components/NetworkSwitcher";
import axios from "axios";

export function Page() {
  const router = useRouter();

  async function uploadData(count: number) {
    const origin = window.location.origin;
    console.log(origin);
    const res = await axios.post(
      `${origin}/api/uploadToIPFS`,
      {
        counter: count,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(res.data);
  }

  const handleUploadImageToIPFS = async (e: FormEvent) => {
    e.preventDefault();
    if (file) {
      setIsUploading(true);

      setImageCid(null);

      const formData = new FormData();
      formData.append("file", file);

      const metadata = JSON.stringify({
        name: `${file.name}`,
      });
      formData.append("pinataMetadata", metadata);

      const options = JSON.stringify({
        cidVersion: 0,
      });
      formData.append("pinataOptions", options);
      console.log("Uploading file to IPFS...", formData);
      try {
        const resFile = await axios.post(
          "https://api.pinata.cloud/pinning/pinFileToIPFS",
          formData,
          {
            maxBodyLength: Infinity,
            headers: {
              "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_JWT}`,
            },
          }
        );

        const cid = resFile.data.IpfsHash;

        console.log(resFile.data);

        return cid;
      } catch (error) {
        console.log("Error: ", error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleGameClick = async () => {
    router.push(`${origin}/game`);
  };

  const handleMintClick = async () => {
    router.push(`${origin}/mint`);
  };

  const handleRewardsClick = async () => {
    router.push(`${origin}/nft`);
  };

  return (
    <>
      <h1>EthFit</h1>

      <Connect />

      <Connected>
        <Account />
        <div>
          <button onClick={handleGameClick}>Play game</button>
          <button onClick={handleRewardsClick}>View rewards</button>
          <button onClick={handleMintClick}>Mint rewards</button>
        </div>
        <NetworkSwitcher />
      </Connected>
    </>
  );
}

export default Page;
