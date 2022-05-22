import React from 'react'

import { useCounter } from 'usehooks-ts'

interface ComponentProps {
  initial?: number
}

export default function Component({ initial = 0 }: ComponentProps) {
  const { count, increment, decrement, reset } = useCounter(initial)

  return (
    <div className="h-screen flex items-center">
        <div className="mx-auto w-96 p-1 bg-gradient-to-r from-indigo-500 to-yellow-500">
            <div className="h-full w-full bg-white p-4">
                <p className="text-center">Count is {count}</p>
                <div className="mt-4 flex justify-center gap-4 ">
                    <button className="px-4 border border-gray-100 rounded-sm" onClick={increment}>Increment</button>
                    <button className="px-4 border border-gray-100 rounded-sm" onClick={decrement}>Decrement</button>
                    <button className="px-4 border border-gray-100 rounded-sm" onClick={reset}>Reset</button>
                </div>
            </div>
        </div>
    </div>
  )
}
