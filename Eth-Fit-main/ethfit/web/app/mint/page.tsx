"use client";

import { Account } from "../../components/Account";
import { Connect } from "../../components/Account";
import { Connected } from "../../components/Account";
// import { MintNFT } from "../../components/Account";
import { FormEvent, useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { NetworkSwitcher } from "../../components/NetworkSwitcher";
import axios from "axios";
import {
  useAccount,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";

export function Page() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [imageCid, setImageCid] = useState<string | null>(null);
  const [count, setCount] = useState<number>(0);
  const [cid, setCid] = useState<string | null>(null);

  const { address } = useAccount();

  useEffect(() => {
    if (imageCid !== null) {
      uploadData(count, imageCid);
    }
  }, [imageCid]);

  useEffect(() => {
    if (cid !== null) {
      MintNFT(address, cid);
    }
  }, [cid]);

  async function MintNFT(to: string, uri: string) {
    const { config } = usePrepareContractWrite({
      address: "0x631fb094399d362889c324472C83581B2BB45617",
      abi: [
        {
          inputs: [
            {
              internalType: "address",
              name: "to",
              type: address,
            },
            {
              internalType: "string",
              name: "uri",
              type: string,
            },
          ],
          name: "safeMint",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
      functionName: "safeMint",
      args: [to, uri],
    });

    const { data, write } = useContractWrite(config);

    const { isLoading, isSuccess } = useWaitForTransaction({
      hash: data?.hash,
    });
  }

  async function uploadData(count: number, cid: string) {
    const origin = window.location.origin;
    console.log(origin);
    const res = await axios.post(
      `${origin}/api/uploadToIPFS`,
      {
        counter: count,
        image: cid,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(res.data);
    setCid(res.data);
  }

  const handleUploadToIPFS = async (e: FormEvent) => {
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

        const cid = await resFile.data.IpfsHash;

        console.log(resFile.data);

        setImageCid(cid);
      } catch (error) {
        console.log("Error: ", error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleMintClick = async () => {
    MintNFT(address, cid);
  };

  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target;

    if (!input.files?.length) {
      return;
    }

    const files = input.files as FileList;
    setFile(files[0]);
  };

  return (
    <>
      <h1>EthFit</h1>

      <Connect />

      <Connected>
        <Account />
        <div>
          <form onSubmit={handleUploadToIPFS}>
            <input
              type="file"
              name="mp3"
              accept=" image/png, image/jpg, image/*;capture=camera"
              onChange={handleFile}
            />
            {!isUploading && <button type="submit">Send image to IPFS</button>}
          </form>

          <button onClick={handleMintClick}>Mint rewards</button>
        </div>
        <NetworkSwitcher />
      </Connected>
    </>
  );
}

export default Page;
