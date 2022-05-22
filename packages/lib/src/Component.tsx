import React from 'react'

import { useCounter } from 'usehooks-ts'

interface ComponentProps {
  initial: number
}

export default function Component({ initial = 0 }: ComponentProps) {
  const { count, increment, decrement, reset } = useCounter(initial)

  return (
    <div className="my-8">
      <p>Count is {count}</p>
      <div className="flex justify-center gap-4">
        <button className="px-4 border border-gray-100 rounded-sm" onClick={increment}>Increment</button>
        <button className="px-4 border border-gray-100 rounded-sm" onClick={decrement}>Decrement</button>
        <button className="px-4 border border-gray-100 rounded-sm" onClick={reset}>Reset</button>
      </div>
    </div>
  )
}
