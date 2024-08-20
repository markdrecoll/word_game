import "../assets/styles/wordgame.css";

// interface guessTypes {
//   guess: string[],
//   currentGuess: string[]
// }

const Row = ({ guess, currentGuess }: any) => {

    if (guess) {
        return (
          <div className="wordGameRow past">
            {guess.map((l: any, i: number) => (
              <div key={i} className={l.color}>{l.key}</div>
            ))}
          </div>
        )
      }

      if (currentGuess) {
        let letters = currentGuess.split('')
    
        return (
          <div className="wordGameRow current">
            {letters.map((letter: string, i: number) => (
              <div key={i} className="filled">{letter}</div>
            ))}
            {[...Array(5 - letters.length)].map((_,i) => (
              <div key={i}></div>
            ))}
          </div>
        )
    }
    
      return (
        <div className="wordGameRow">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )
    
  }

  export default Row;