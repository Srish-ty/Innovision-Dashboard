import React from "react";
import { NavData } from "@/config/data/navData";

export const Navbar = () => {
  return (
    <nav>
      {NavData.map((item, index) => (
        <a key={index} href={item.link}>
          {item.title}
        </a>
      ))}
    </nav>
  );
};
