import ItemsArray from "@/components/ItemsArray";

interface Item {
  name: string;
  price: number
}

export default async function page() {

  const res = await fetch(`http://localhost:3000/api/items`, { cache: "no-store" });
  const data: Item[] = await res.json();

  return (
    <div>
      <ItemsArray itemsArray={data}  />
    </div>
  )
}
