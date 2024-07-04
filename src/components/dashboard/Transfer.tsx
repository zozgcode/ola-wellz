"use client";

import React, { useEffect, useState } from "react";
import CustomDropdown from "./CustomDropdown";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import CodeForm from "./CodeForm";
import { Account } from "@/utils/types";
import { formatCurrency } from "../formatCurrency";

export default function Transfer() {
  const [selectedBank, setSelectedBank] = useState<{
    value: string;
    label: string;
  } | null>(null);
  // const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [user, setUser] = useState<Account | null>(null);
  const [amount, setAmount] = useState<string>("");
  const [routingNo, setRoutingNo] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [issueMsg, setIssueMsg] = useState<boolean>(false);

  useEffect(() => {
    // Get the item from localStorage
    const loggedInUser = localStorage.getItem("loggedInUser");

    if (loggedInUser) {
      // Parse the item if it's in JSON format
      try {
        const user = JSON.parse(loggedInUser) as Account;
        setUser(user);
      } catch (error) {
        console.error("Error parsing loggedInUser from localStorage", error);
      }
    }
  }, []);

  const showIssueMsg = () => {
    setLoading(true);
    // Simulate a delay for loading
    setTimeout(() => {
      setLoading(false);
      setIssueMsg(true);
    }, 2000); // 2 seconds delay
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBank || !amount || !routingNo) {
      setError("Please fill out all fields");
    } else {
      setError("");
      setLoading(true);
      // Simulate a delay for loading
      setTimeout(() => {
        setLoading(false);
        setSuccess(true);
      }, 2000); // 2 seconds delay
    }
  };

  const formatAmount = (amount: string) => {
    const amountNumber = parseFloat(amount);
    if (isNaN(amountNumber)) {
      return amount;
    }
    return amountNumber.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  if (!user) {
    return <div>Loading, please wait...</div>;
  }

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="flex-col flex gap-3">
        <div className="bg-white rounded-lg p-4">
          <span>Transfer From</span>
          <div className="flex flex-col gap-1 mt-1">
            <span className="uppercase">{user.holder.firstName} {user.holder.firstName}</span>
            <span className="text-sm">Balance: {formatCurrency(user.bank_details.balance_usd)}</span>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4">
          
        </div>
      </form>
    </div>
  );
}
