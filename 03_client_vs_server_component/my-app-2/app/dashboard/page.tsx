"use client"

import { addTodo } from "@/components/AddTodo"

export default function page() {
  return (
    <div>
      <form action={addTodo}>
        <input type="text" placeholder="item name" name="name" />
        <input type="number" placeholder="item price" name="price" />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
