"use client";

import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import {
  ArcticonsEmojiPotableWaterSymbol,
  HealthiconsElectricity,
  MaterialSymbolsLightConnectedTvOutline,
} from "../svgIcons";
import { useState } from "react";

export default function PayBills() {
  const [showMsg, setShowMsg] = useState(false);
  const [loading, setIsLoading] = useState(false);


  const toggleShowMsg = () => {
    setIsLoading(true);
    setShowMsg(false);
    setTimeout(() => {
      setIsLoading(false);
      setShowMsg(true);
    }, 3000); // 3 seconds loading time
  };
  const billsData = [
    {
      title: "Electricity",
      icon: <HealthiconsElectricity />,
    },
    {
      title: "TV",
      icon: <MaterialSymbolsLightConnectedTvOutline />,
    },
    {
      title: "Water",
      icon: <ArcticonsEmojiPotableWaterSymbol />,
    },
  ];

  return (
    <div className="border w-full h-screen bg-[#FAFAF8]">
      <div className="bg-white sticky top-0 z-10 p-3 py-5 flex items-center justify-between gap-1">
        <Link href="/dashboard" className="flex items-center gap-2">
          <IoIosArrowBack />
          <span className="text-[#252525] font-semibold">Bill Payment</span>
        </Link>
      </div>
        {loading && <p className="text-[#811c1c] text-center text-sm p-4 pt-4 pb-0">Please wait...</p>}
        {!loading && showMsg && (
          <p className="text-[#811c1c] text-center text-sm p-4 pt-4 pb-0">Service is down, Please try again later...</p>
        )}
      <div className="p-4">
        <div className="bg-white rounded-lg p-4 mb-4">
          {billsData.map((item, i) => (
            <div key={i} className="flex w-full justify-between items-center py-3" onClick={toggleShowMsg} >
              <div className="flex items-center gap-3">
                <div className="rounded-lg flex items-center justify-center w-[35px] h-[35px] bg-[#d71e28]/10">
                  {item.icon}
                </div>
                <span className="text-sm">{item.title}</span>
              </div>
              <IoIosArrowForward />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
