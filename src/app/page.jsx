"use client";
import { Keypair, Connection, clusterApiUrl } from "@solana/web3.js";
import Button from "@/components/Button";
import { useState } from "react";
import Link from "next/link";

export default function Page() {
  const [wallet, setWallet] = useState(null);
  const [balance, setBalance] = useState(0);

  const createWallet = async () => {
    const newWallet = Keypair.generate();
    setWallet(newWallet);
    const connection = new Connection(clusterApiUrl("devnet"));
    const balance = await connection.getBalance(newWallet.publicKey);
    setBalance(balance / 1e9);
  };

  return (
    <div>
      <header className="flex justify-between mb-4">
        <Button onClick={createWallet} text={"создать кошелек"} />
        <div>Текущий баланс {balance}</div>
      </header>
      <main className='flex flex-col'>
        Нажмите на кнопку создать кошелек чтобы получить адрес вашего кошелька:
        {wallet && (
          <>
            <p>Public Key: {wallet.publicKey.toBase58()}</p>
            <p>Private Key: {wallet.privateKey}</p>
          </>
        )}
        <Link
          className="p-3 border-red-100 bg-slate-500 rounded-md mt-3 text-white self-start"
          href="/transaction"
        >
          Выполнить транзакцию
        </Link>
      </main>
    </div>
  );
}
