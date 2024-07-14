"use client";
import Input from "@/components/Input";
import { useState } from "react";
import Button from "@/components/Button";
import Link from "next/link";
import {
  Connection,
  clusterApiUrl,
  Keypair,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
  PublicKey,
} from "@solana/web3.js";

export default function TransactionPage() {
  const [amount, setAmount] = useState(0);
  const [recipient, setRecipient] = useState("");
  const [balance, setBalance] = useState(0);
  const [senderWallet, setSenderWallet] = useState(null);

  const handleTransaction = async () => {
    alert('Транзакция выполнена')
    setRecipient('')
    setAmount(null)

    if (!senderWallet) return;

    const connection = new Connection(clusterApiUrl("devnet"));
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: senderWallet.publicKey,
        toPubkey: new PublicKey(recipient),
        lamports: amount * LAMPORTS_PER_SOL,
      })
    );

    const signature = await connection.sendTransaction(transaction, [
      senderWallet,
    ]);
    await connection.confirmTransaction(signature, "confirmed");
    const newBalance = await connection.getBalance(senderWallet.publicKey);
    setBalance(newBalance / LAMPORTS_PER_SOL);
  };

  return (
    <>
      <header>
        <Link
          className="p-3 border-red-100 bg-slate-500 rounded-md mt-3 text-white self-start"
          href="/"
        >
          Назад
        </Link>
        <div className="mt-3">Ваш текущий баланс 0</div>
      </header>
      <main>
        <form action="">
          <Input
            type={"number"}
            value={amount}
            onChange={setAmount}
            placeholder={"введите кол-вол sol"}
          />
          <Input
            type={"text"}
            value={recipient}
            onChange={setRecipient}
            placeholder={"введите номер кошелька"}
          />
        </form>
        <Button onClick={handleTransaction} text={"Отправить"} />
      </main>
    </>
  );
}
