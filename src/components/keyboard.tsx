import style from "./keyboard.module.css";

type keyboardProps = {
  disabled?: boolean;
  activeLetters: string[];
  inactiveLetters: string[];
  addGuessedLetter: (letter: string) => void;
};

export function KeyBoard({
  activeLetters,
  inactiveLetters,
  disabled = false,
  addGuessedLetter,
}: keyboardProps) {
  const KEYS = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(75px, 1fr))",
        gap: ".5rem",
      }}>
      {KEYS.map((key) => {
        const isActive = activeLetters.includes(key);
        const isInactive = inactiveLetters.includes(key);
        return (
          <button
            className={`${style.btn} ${isActive ? style.active : ""} ${
              isInactive ? style.inactive : ""
            } `}
            key={key}
            onClick={() => addGuessedLetter(key)}
            disabled={isInactive || isActive || disabled}>
            {key}
          </button>
        );
      })}
    </div>
  );
}
