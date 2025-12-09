"use client";

import { useState } from "react";
import { addItem } from "@/actions/addItem";
import { deleteItem } from "@/actions/deleteItem";

interface Item {
  _id: string;
  name: string;
  price: number;
}

interface UpdatedItem {
  itemName: string,
  itemNewPrice: number
}

export default function Dashboard() {

  const [itemsArray, setItemsArray] = useState<Item[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [item, setItem] = useState<UpdatedItem>({
    itemName: "",
    itemNewPrice: 0
  });

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

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const name = item.itemName;
    if (!name) return;
    try {
      const res = await fetch(`/api/items/${encodeURIComponent(name)}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(item)
      });
      if (!res.ok) throw new Error("error in updating item");
      const data = await res.json();
      console.log("item updated: ", data);
    } catch (e) {
      console.error("error in updating item: ", e)
    }
  }


  return (
    <div className="flex gap-2">
      {/* DATA READING AND REDERING LOGIC */}
      <div>
        <div
          className="w-[300px] h-[200px] bg-[#1f1f1f] flex flex-col overflow-y-auto"
        >
          {isFetching && <p>Loading...</p>}
          {!isFetching && !error && itemsArray.map((item) => (
            <div key={item._id} className="w-full h-[50px] shrink-0 bg-[#2f2f2f] flex justify-between items-center px-2">
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

      {/* DATA CREATING LOGIC */}
      <div className="bg-[#1f1f1f] w-[300px] h-[200px]">
        <form action={addItem} className="flex flex-col w-full h-full gap-2">
          <input type="text" placeholder="Item name" name="name" />
          <input type="number" placeholder="Item price" name="price" />
          <button type="submit" className="border p-2">
            Submit
          </button>
        </form>
      </div>

      {/* DELTE ITEM LOGIC */}
      <div className="bg-[#1f1f1f] w-[300px] h-[200px]">
        <form action={deleteItem} className="flex flex-col w-full h-full gap-2">
          <input type="text" placeholder="Item name to delete" name="name" />
          <button type="submit" className="border p-2">
            Delete
          </button>
        </form>
      </div>

      {/* UPDATE ITEM LOGIC */}
      <div className="bg-[#1f1f1f] w-[300px] h-[200px]">
        <form onSubmit={handleUpdate} className="flex flex-col w-full h-full gap-2">
          <input
            type="text"
            placeholder="Item name whose price you want to change"
            name="name" 
            value={item.itemName}
            onChange={(e) => setItem({...item, itemName: e.target.value})}
            />
          <input
            type="number"
            placeholder="Item new price"
            name="newPrice" 
            value={item.itemNewPrice}
            onChange={(e) => setItem({...item, itemNewPrice: Number(e.target.value)})}
            />
          <button type="submit" className="border p-2">
            Update
          </button>
        </form>
      </div>


    </div>
  )
}


