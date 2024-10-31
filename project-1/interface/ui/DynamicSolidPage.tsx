/* @jsxImportSource solid-js */
import { createSignal } from "solid-js"

export function DynamicPage() {
  const [value, setValue] = createSignal(0)
  const increment = () => setValue((v) => v + 1)
  const decrement = () => setValue((v) => v - 1)
  return (
    <div>
      <button type="button" onclick={decrement}>
        -
      </button>
      <output>{value()}</output>
      <button type="button" onclick={increment}>
        +
      </button>
    </div>
  )
}
