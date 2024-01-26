import { useCallback, useEffect, useState } from "react";
import words from "./wordList.json";
import { HangmanDrawing } from "./components/hangmanDrawing";
import { HangmanWords } from "./components/hangmanWords";
import { KeyBoard } from "./components/keyboard";

function getWord() {
  return words[Math.floor(Math.random() * words.length)];
}
function App() {
  // return a random words
  //Math.random() --> give random nums between 0 and 1 and multiply by how many words are in the list to take and round number dowm
  const [wordToGuess, setWordToGuess] = useState(getWord);
  const [guessedLatters, setGuessedLatter] = useState<string[]>([]);

  const incorrectLetters = guessedLatters.filter(
    (letter) => !wordToGuess.includes(letter)
  );

  const isLoser = incorrectLetters.length >= 6;
  //every single letter that included in our guessed letter == won
  const isWinner = wordToGuess
    .split("")
    .every((letter) => guessedLatters.includes(letter));

  const addGuessedLetter = useCallback(
    (letter: string) => {
      if (guessedLatters.includes(letter) || isLoser || isWinner) return;
      setGuessedLatter((currentLetter) => [...currentLetter, letter]);
    },
    [guessedLatters, isLoser, isWinner]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      //check if press letter a-z
      if (!key.match(/^[a-z]$/)) return;

      e.preventDefault();
      addGuessedLetter(key);
    };

    document.addEventListener("keypress", handler);
    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, [guessedLatters]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if (key != "Enter") return;

      e.preventDefault();
      setGuessedLatter([]);
      setWordToGuess(getWord());
    };

    document.addEventListener("keypress", handler);
    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, [guessedLatters]);
  return (
    <div
      style={{
        maxWidth: "800px",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        margin: "0 auto",
        alignItems: "center",
      }}>
      <div
        style={{
          fontSize: "2rem",
          textAlign: "center",
        }}>
        {isWinner && "Winner ! - Refresh and try again"}
        {isLoser && "Nice try ! - Refresh and try again"}
      </div>
      <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
      <HangmanWords
        reveal={isLoser}
        guessedLetters={guessedLatters}
        wordToGuess={wordToGuess}
      />
      <div style={{ alignSelf: "stretch" }}>
        <KeyBoard
          disabled={isWinner || isLoser}
          activeLetters={guessedLatters.filter((letter) =>
            wordToGuess.includes(letter)
          )}
          inactiveLetters={incorrectLetters}
          addGuessedLetter={addGuessedLetter}
        />
      </div>
    </div>
  );
}

export default App;
