import React, { use, useEffect, useRef, useState } from "react";
import logo from "../assets/images/logo-large.svg";
import personalBest from "../assets/images/icon-personal-best.svg";
import restartIcon from "../assets/images/icon-restart.svg";
import json from "../data.json";

const App = () => {
  const [userInput, setUserInput] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [mode, setMode] = useState("time");
  const [started, setStarted] = useState(false);
  const [ended, setEnded] = useState(false);
  const [accuracy, setAccuracy] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [bestWpm, setBestWpm] = useState(localStorage.getItem("bestWpm") || 0);
  const [time, setTime] = useState(60);
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const timeFormatted = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  const [text, setText] = useState(
    json[difficulty][Math.floor(Math.random() * 10)].text,
  );
  const textareaRef = useRef(null);
  const difficulties = [
    { id: "easy", label: "Easy" },
    { id: "medium", label: "Medium" },
    { id: "hard", label: "Hard" },
  ];
  const modes = [
    { name: "time", label: "Time(60s)" },
    { name: "passage", label: "Passage" },
  ];

  function endTest() {
    setEnded(true);
    setStarted(false);
    const wordsTyped = userInput.trim().split(" ").length;
    const wpm = Math.round((wordsTyped / (60 - time)) * 60);
    setWpm(wpm);
    if (wpm > bestWpm) {
      setBestWpm(wpm);
      localStorage.setItem("bestWpm", wpm);
    }
    setTime(60);
    setUserInput("");
    textareaRef.current.blur();
    const correct = userInput
      .split("")
      .filter((char, i) => char === text[i]).length;
    const accuracy = Math.round((correct / userInput.length) * 100);
    setAccuracy(accuracy);
  }
  useEffect(() => {
    if (userInput.length === text.length || time === 0) {
      endTest();
    }
  }, [userInput, time]);

  useEffect(() => {
    if (started && mode === "time") {
      const interval = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [started]);
  return (
    <div className="font-sora mx-auto container items-center p-8 text-neutral-500 grid gap-8 divide-y-2 divide-neutral-800">
      <header className="grid gap-16 pb-6">
        <div className="flex justify-between items-center">
          <img className="" src={logo} alt="" />
          <h1 className="before:bg flex items-center">
            <img className="mr-2" src={personalBest} alt="" />
            Personal best:
            <span className="pl-2 text-neutral-300">{bestWpm} WPM</span>
          </h1>
        </div>
        <div className="flex justify-between">
          <div className="flex divide-x divide-neutral-800">
            <p className="flex gap-4 pr-8">
              WPM: <span className="text-white">{wpm}</span>
            </p>
            <p className="flex gap-4 px-8">
              Accuracy: <span className="text-red-400">{accuracy}%</span>
            </p>{" "}
            <p className="flex gap-4 pl-8">
              Time: <span className="text-yellow-200">{timeFormatted}</span>
            </p>
          </div>
          <div className="flex divide-x divide-neutral-800">
            <div className="flex pr-8 gap-2">
              <h2>Difficulty:</h2>
              <form className="flex gap-2">
                {difficulties.map((d, i) => (
                  <div key={d.id}>
                    <input
                      className="hidden peer"
                      type="radio"
                      defaultChecked={i === 0}
                      name="difficulty"
                      id={d.id}
                    />
                    <label
                      onClick={() => {
                        setDifficulty(d.id);
                        setText(
                          json[d.id][Math.floor(Math.random() * 10)].text,
                        );
                        setUserInput("");
                      }}
                      className={`cursor-pointer p-1 px-2 text-neutral-300 rounded-md border border-neutral-600 peer-checked:border-blue-500 peer-checked:text-blue-500 ${started ? "pointer-events-none opacity-50" : ""}`}
                      htmlFor={d.id}
                    >
                      {d.label}
                    </label>
                  </div>
                ))}
              </form>
            </div>
            <div className="flex pl-8 gap-2">
              <h2>Mode:</h2>
              <form className="flex gap-2">
                {modes.map((n, i) => (
                  <div key={n.name}>
                    <input
                      className="hidden peer"
                      type="radio"
                      defaultChecked={i === 0}
                      name="mode"
                      id={n.name}
                    />
                    <label
                      onClick={() => {
                        setMode(n.name);
                      }}
                      className={`cursor-pointer p-1 px-2 text-neutral-300 rounded-md border border-neutral-600 peer-checked:border-blue-500 peer-checked:text-blue-500 ${started ? "pointer-events-none opacity-50" : ""}`}
                      htmlFor={n.name}
                    >
                      {n.label}
                    </label>
                  </div>
                ))}
              </form>
            </div>
          </div>
        </div>
      </header>
      <main className="">
        <form
          onClick={(event) => {
            event.preventDefault();
          }}
          className="grid grid-cols-1"
        >
          {!started && (
            <div className="row-1 col-1 w-full h-full z-10 grid place-items-center">
              <div className="grid place-items-center gap-4">
                <button
                  onClick={(event) => {
                    setStarted(true);
                    setEnded(false);
                    textareaRef.current.focus();
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md cursor-pointer"
                >
                  Start Typing Test
                </button>
              </div>
            </div>
          )}
          <p
            className={`row-1 col-1 z-0 text-[2.5rem] leading-tight pb-6 ${!started ? "blur-sm" : ""}`}
          >
            {text.split("").map((char, i) => {
              if (userInput[i] === char)
                return (
                  <span className="text-green-300" key={i}>
                    {char}
                  </span>
                );
              else if (userInput[i] === undefined)
                return (
                  <span className="text-neutral-500 " key={i}>
                    {char}
                  </span>
                );
              else
                return (
                  <span className="text-red-300" key={i}>
                    {char}
                  </span>
                );
            })}
          </p>
          <textarea
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
              }
            }}
            onChange={(e) => {
              setUserInput(e.target.value);
            }}
            ref={textareaRef}
            value={userInput}
            className="resize-none h-full row-1 col-1 z-1 text-transparent focus:outline-none text-[2.5rem] leading-tight overflow-hidden select-none"
            name="test"
            id="test"
            spellCheck="false"
          ></textarea>
        </form>
      </main>
      {started && (
        <footer className="mx-auto">
          <button
            onClick={() => {
              setUserInput("");
              setStarted(false);
              setTime(60);
            }}
            className="flex items-center cursor-pointer gap-2 bg-neutral-800 hover:bg-neutral-700 text-white font-bold py-3 px-4 rounded-md"
          >
            Restart Test
            <img src={restartIcon} alt="Restart Test" />
          </button>
        </footer>
      )}
    </div>
  );
};

export default App;
