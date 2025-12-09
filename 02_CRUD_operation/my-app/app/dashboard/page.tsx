"use client";

import { useState } from "react";

interface Item {
  id: number;
  name: string;
  price: number;
}


export default function Dashboard() {

  const [itemsArray, setItemsArray] = useState<Item[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [ error, setError ] = useState<string>("");

  const getItems = async (): Promise<void> => {
    setError("")
    setIsFetching(true);
    try {
      const res = await fetch("/api/items");
      if (!res.ok) throw new Error("error in fetching items");
      const data: Item[] = await res.json();
      setItemsArray(data);
      console.log("items fetched: ", data);
      setError("");
    } catch (e) {
      console.error("error in fetching items: ", e)
      setError("error in fetching")
    } finally {
      setIsFetching(false);
    }
  }

  return (
    <div className="flex">
      {/* DATA READING AND REDERING LOGIC */}
      <div>
        <div
          className="w-[300px] h-[200px] bg-[#1f1f1f] flex flex-col overflow-y-auto"
        >
          {isFetching && <p>Loading...</p>}
          {!isFetching && !error && itemsArray.map((item) => (
            <div key={item.id} className="w-full h-[50px] shrink-0 bg-[#2f2f2f] flex justify-between items-center px-2">
              <p>{item.name}</p>
              <p>{item.price}</p>
            </div>
          ))
          }
          {!isFetching && itemsArray.length === 0 && !error && <p>No items found</p>}
          {!isFetching && error && <p className="font-medium text-red-500">{error}</p>}
        </div>
        <button
          onClick={getItems}
          className="border p-2"
        >
          Get Items
        </button>
      </div>

      
    </div>
  )
}


