"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Account, Transaction } from "@/utils/types";
import Link from "next/link";
import TransactionHistory from "./TransactionHistory";
import Header from "./header/Header";
import { formatCurrency } from "../formatCurrency";
import { IoIosArrowForward } from "react-icons/io";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<Account | null>(null);
  const [hideBalance, setSideBalance] = useState(false);

  const toggleHideBalance = () => {
    setSideBalance(true);
  };

  const toggleShowBalance = () => {
    setSideBalance(false);
  };

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    } else {
      router.push("/");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    router.push("/");
  };

  const showAlert = () => {
    alert("Contact your bank to open an account");
  };

  if (!user) {
    return <div>Loading, please wait...</div>;
  }

  const date = new Date();
  const hour = date.getHours();

  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="">
      <Header handleLogout={handleLogout} user={user} />
      <div className="flex flex-col">
        <div className="p-[16px] py-[15px] flex flex-col">
          <span className="font-medium text-lg">
            Hi, {user.holder.firstName}
          </span>
          <span>
            {hour >= 12
              ? hour >= 17
                ? "Good evening"
                : "Good afternoon"
              : "Good morning"}
          </span>
        </div>
        <div className="px-[16px]">
          <div className="border flex flex-col gap-6 bg-[#d71e28] text-white p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-[14px] flex items-center gap-1">
                Available balance 
                {hideBalance ? <FiEyeOff onClick={toggleShowBalance} /> : <FiEye  onClick={toggleHideBalance} />}
              </span>
              <Link href="/dashboard/transactions" className="text-[14px] flex items-center gap-1">
                <span>Transaction History</span>{" "}
                <IoIosArrowForward className="relative top-[2px]" />
              </Link>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-[400] text-[20px]">
                {hideBalance ? "******" : `${formatCurrency(user.bank_details.balance_usd)}`}
              </span>
              <Link
                href="/dashboard/transfer"
                className="p-[5px_20px] rounded-full bg-white text-[#d71e28] text-[14px]"
              >
                Send money
              </Link>
            </div>
          </div>
        </div>
        <div className="p-[16px] py-8">
          <div className="flex items-center justify-center gap-3">
            <button className="border p-4 py-2 text-[13px] max-w-max bg-white text-[#d71e28] rounded-full">+ Add Money</button>
            <Link href="/dashboard/bill-payment" className="border p-4 py-2 text-[13px] max-w-max bg-white text-[#d71e28] rounded-full">Pay Bills</Link>
          </div>
        </div>
        <TransactionHistory user={user} hideBalance={hideBalance}/>
      </div>
    </div>
  );
}
