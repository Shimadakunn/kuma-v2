"use client"

import { DynamicWidget} from "@/lib/dynamic";

import { useAvocado } from "@/services/avocadoProvider";
import { useState } from "react";

export default function Home() {
  const { safe, connected } = useAvocado()

  const [address, setAddress] = useState<string>("")
  const [owner, setOwner] = useState<string>("")

  async function fetchData() {
    const owner = await safe.getOwnerAddress()
    const address = await safe.getSafeAddress()
    setOwner(owner)
    setAddress(address)
  }
  async function sendTransaction() {
    const tx = await safe.sendTransaction({
      to: "0x63972913FC6FA0dd24250E0F0cEe8724b47a8e14",
      value: 1e18,
      chainId: 137
  })
  console.log(tx)
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     <DynamicWidget/>
      <div>
        <button className="text-3xl font-bold" onClick={() =>fetchData()}>Welcome to Instadapp</button>
        <p className="text-lg">Your Safe address is: {address}</p>
        <p className="text-lg">Your Owner address is: {owner}</p>
        <p className="text-lg">Connected: {connected!.toString()}</p>
        <button className="text-3xl font-bold" onClick={() =>sendTransaction()}>Send Transaction</button>
      </div>
    </main>
  );
}
