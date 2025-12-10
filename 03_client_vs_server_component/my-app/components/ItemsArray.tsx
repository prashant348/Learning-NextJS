"use client"

interface Item {
    name: string
    price: number
}

export default function ItemsArray({ itemsArray }: { itemsArray: Item[] }) {
  return (
    <div className='w-[300px] h-[200px] bg-[#1f1f1f] overflow-y-auto'>
      {itemsArray.map((item, idx) => (
        <div key={idx} className='flex justify-between p-2 border-b border-zinc-600'>
          <p>{item.name}</p>
          <p>{item.price}</p>
        </div>
      ))}
    </div>
  )
}
