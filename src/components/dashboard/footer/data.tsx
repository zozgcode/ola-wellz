import { FaWallet, FaMoneyBillTransfer, FaMoneyBills } from "react-icons/fa6";
import { MdOutlineEventNote } from "react-icons/md";
import { AiOutlineRise } from "react-icons/ai";

export const fMenuLink = [
    {
      label: "Home",
      icon: <FaWallet />,
      slug: "/dashboard",
    },
    {
      label: "Transfer",
      icon: <FaMoneyBillTransfer />,
      slug: "/dashboard/transfer",
    },
    {
      label: "Pay Bills",
      icon: <MdOutlineEventNote />,
      slug: "/dashboard/bill-payment",
    },
    {
      label: "Investment",
      icon: <AiOutlineRise />,
      slug: "",
    },
  ];