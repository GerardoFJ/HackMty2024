import { useState, useEffect } from 'react'
import { Button } from "@nextui-org/react"
import { Input } from "@nextui-org/react"
import { XCircle, Delete, CheckCircle } from 'lucide-react'
import { navigateToPage } from '../utils/functions'

export default function ATMKeypad({ money = false }) {
  const [input, setInput] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      navigateToPage("")
    }, 20000) // 20 seconds

    return () => clearTimeout(timer)
  }, [])

  const handleNumberClick = (number: number) => {
    if (input.length < 4 && !money) {
      setInput(prev => prev + number)
    } else if (money) {
      setInput(prev => prev + number)
    }
  }

  const handleDelete = () => {
    setInput(prev => prev.slice(0, -1))
  }

  const handleClear = () => {
    setInput('')
    setMessage('')
  }

  const handleSubmit = () => {
    if (input.length === 4 && !money) {
        if (input === '1234') {
            setMessage('PIN correct. Redirecting...')
            setTimeout(() => {
                navigateToPage('menu') // Replace 'menu' with the actual menu page URL
            }, 1000)
        } else {
            setMessage('Incorrect PIN. Please try again.')
        }
    } else if (!money) {
      setMessage('Please enter a 4-digit PIN.')
    } else if (money && parseInt(input) > 0) {
      navigateToPage('withdrawal/confirm', parseInt(input))
    }
  }

  return (
    <div className="max-w-sm mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-md">
      <Input
        type={money ? "" : "password"}
        value={input}
        readOnly
        className="text-center text-2xl mb-4 text-black"
        placeholder={money ? "Enter amount" : "Enter PIN"}
      />
      <div className="grid grid-cols-3 gap-2 mb-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
          <Button
            key={number}
            onClick={() => handleNumberClick(number)}
            className="text-2xl h-14"
          >
            {number}
          </Button>
        ))}
        <Button onClick={handleClear} className="text-2xl h-14 bg-yellow-500 hover:bg-yellow-600">
          <XCircle className="w-6 h-6" />
        </Button>
        <Button onClick={() => handleNumberClick(0)} className="text-2xl h-14">
          0
        </Button>
        <Button onClick={handleDelete} className="text-2xl h-14 bg-red-500 hover:bg-red-600">
          <Delete className="w-6 h-6" />
        </Button>
      </div>
      <Button onClick={handleSubmit} className="w-full text-xl h-14 bg-green-500 hover:bg-green-600">
        <CheckCircle className="w-6 h-6 mr-2" /> Submit
      </Button>
      {message && (
        <p className="mt-4 text-center text-sm font-medium text-gray-500">
          {message}
        </p>
      )}
    </div>
  )
}