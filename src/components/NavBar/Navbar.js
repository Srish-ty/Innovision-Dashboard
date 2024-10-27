import React from "react";
import { NavData } from "@/config/data/navData";
import { signInWithGoogle, signOutUser } from "@/firebase/auth";

export const Navbar = () => {
  return (
    <nav className="bg-slate-700 px-20 py-6 flex flex-row items-center justify-between">
      {NavData.map((item, index) => (
        <a
          key={index}
          href={item.url}
          className="text-teal-500 hover:text-white"
        >
          {item.text}
        </a>
      ))}
    </nav>
  );
};
