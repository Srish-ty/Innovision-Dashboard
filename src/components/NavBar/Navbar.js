"use client";
import React, { useEffect, useState } from "react";
import { NavData } from "@/config/data/navData";
import { signInWithGoogle, signOutUser } from "@/firebase/auth";

export const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const idToken = localStorage.getItem("firebaseIdToken");
    const userEmail = localStorage.getItem("firebaseUserEmail");
    const userUID = localStorage.getItem("firebaseUserUID");

    if (idToken && userEmail && userUID) {
      setUser({ email: userEmail, uid: userUID });
    }
  }, []);

  const handleSignIn = async () => {
    const { user, idToken } = await signInWithGoogle();
    if (user) {
      setUser(user);
      localStorage.setItem("firebaseIdToken", idToken);
      localStorage.setItem("firebaseUserEmail", user.email);
      localStorage.setItem("firebaseUserUID", user.uid);
    }
    window.location.href = "/users";
  };

  const handleSignOut = async () => {
    const signOutResult = await signOutUser();
    if (signOutResult) {
      setUser(null);
      localStorage.removeItem("firebaseIdToken");
      localStorage.removeItem("firebaseUserEmail");
      localStorage.removeItem("firebaseUserUID");

      window.location.href = "/";
    }
  };

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
      {user ? (
        <button
          onClick={handleSignOut}
          className="text-teal-500 hover:text-white"
        >
          Logout
        </button>
      ) : (
        <button
          onClick={handleSignIn}
          className="text-teal-500 hover:text-white"
        >
          Login
        </button>
      )}
    </nav>
  );
};
