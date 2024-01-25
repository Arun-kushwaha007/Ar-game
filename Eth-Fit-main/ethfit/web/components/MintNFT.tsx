"use client";

// import { useState } from 'react'
// import { useWaitForTransaction } from 'wagmi'

// import {
//   usePrepareWagmiMintExampleMint,
//   useWagmiMintExampleMint,
// } from '../src/generated'

import * as React from "react";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";


export function MintNFT() {
  const [tokenURI, setTokenURI] = React.useState("");
  const [receiver, setReceiver] = React.useState("");

  const { config } = usePrepareContractWrite({
    address: "0x631fb094399d362889c324472C83581B2BB45617",
    abi: [
      {
        inputs: [
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "string",
            name: "uri",
            type: "string",
          },
        ],
        name: "safeMint",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      }
    ],
    functionName: "safeMint",
    args: [receiver ,tokenURI],
  });

  const { data, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        write?.();
      }}
    >
      <label for="tokenId">Token ID</label>
      <input
        id="tokenId"
        onChange={(e) => setTokenId(e.target.value)}
        placeholder="420"
        value={tokenId}
      />
      <button disabled={!write || isLoading}>
        {isLoading ? "Minting..." : "Mint"}
      </button>
      {isSuccess && (
        <div>
          Successfully minted your NFT!
          <div>
            <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
          </div>
        </div>
      )}
    </form>
  );
}
