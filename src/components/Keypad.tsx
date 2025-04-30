import { useState, useEffect } from 'react'

export default function Keypad({ keys, usedKeys, handleLetterInput }: any) {
  const [letters, setLetters] = useState<any[]>([]);

  useEffect(() => {
    setLetters(keys)
  }, [keys])

  return (
    <div className="keypad">
      {letters && letters.map((l, index) => {
        const color = usedKeys[l.key]
        if (index >= 0 && index <= 9) {
          return (
            <div key={l.key} className={color} onClick={() => handleLetterInput(l.key)}>{l.key}</div>
          )
        }
      })}
      <br />
      {letters && letters.map((l, index) => {
        const color = usedKeys[l.key]
        if (index >= 10 && index <= 18) {
          return (
            <div key={l.key} className={color} onClick={() => handleLetterInput(l.key)}>{l.key}</div>
          )
        }
      })}
      <br />
      {letters && letters.map((l, index) => {
        const color = usedKeys[l.key]
        if (index >= 19 && index <= 25) {
          return (
            <div key={l.key} className={color} onClick={() => handleLetterInput(l.key)}>{l.key}</div>
          )
        }
      })}
      <br />
      <div onClick={() => handleLetterInput("Backspace")} style={{ width: "40px" }}>⌫</div>
      <div onClick={() => handleLetterInput("Enter")} style={{ width: "100px" }}>Enter</div>
    </div>
  )
}