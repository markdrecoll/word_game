import Row from "./Row"

export default function Grid({ guesses, currentGuess, turn }: any) {
  return (
    <div>
      {guesses.map((g: any, i: number) => {
        if (turn === i) {
          return <Row key={i} currentGuess={currentGuess} />
        }
        return <Row key={i} guess={g} /> 
      })}
    </div>
  )
}