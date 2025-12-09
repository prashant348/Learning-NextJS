"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";

interface User {
  name: string;
  age: number;
  email: string;
}

export default function page() {
  const [user, setUser] = useState<User>({
    name: "",
    age: 0,
    email: ""
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // <-- prevent full page submit/reload
    try {
      const res = await fetch("/api/create-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      });

      const data = await res.json();
      console.log("success: ", data);
    } catch (err) {
      console.error("error in handleSubmit: ", err);
    }
  };

  return (
    <div>
      <Navbar />
      <form onSubmit={handleSubmit} className="flex flex-col w-[300px] border">
        <input
          type="text"
          placeholder="name"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="age"
          value={user.age || ""}
          onChange={(e) =>
            setUser({ ...user, age: Number(e.target.value || 0) })
          }
        />
        <input
          type="email"
          placeholder="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
