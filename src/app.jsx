import React, { useState } from "react";
import logo from "../assets/images/logo-large.svg";
import personalBest from "../assets/images/icon-personal-best.svg";
import restart from "../assets/images/icon-restart.svg";
import json from "../data.json";

const App = () => {
  const [userInput, setUserInput] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [mode, setMode] = useState("time");
  const [text, setText] = useState(
    json[difficulty][Math.floor(Math.random() * 10)].text,
  );
  const difficulties = [
    { id: "easy", label: "Easy" },
    { id: "medium", label: "Medium" },
    { id: "hard", label: "Hard" },
  ];
  const modes = [
    { name: "time", label: "Time(60s)" },
    { name: "passage", label: "Passage" },
  ];

  return (
    <div className="font-sora mx-auto container items-center p-8 text-neutral-500 grid gap-8 divide-y-2 divide-neutral-800">
      <header className="grid gap-16 pb-6">
        <div className="flex justify-between items-center">
          <img className="" src={logo} alt="" />
          <h1 className="before:bg flex items-center">
            <img className="mr-2" src={personalBest} alt="" />
            Personal best:<span className="pl-2 text-neutral-300">00 WPM</span>
          </h1>
        </div>
        <div className="flex justify-between">
          <div className="flex divide-x divide-neutral-800">
            <p className="flex gap-4 pr-8">
              WPM: <span className="text-white">00</span>
            </p>
            <p className="flex gap-4 px-8">
              Accuracy: <span className="text-red-400">00%</span>
            </p>{" "}
            <p className="flex gap-4 pl-8">
              Time: <span className="text-yellow-200">0:00</span>
            </p>
          </div>
          <div className="flex divide-x divide-neutral-800">
            <div className="flex pr-8 gap-2">
              <h2>Difficulty:</h2>
              <form className="flex gap-2">
                {difficulties.map((d, i) => (
                  <div
                    onClick={() => {
                      setDifficulty(d.id);
                      setText(json[d.id][Math.floor(Math.random() * 10)].text);
                      setUserInput("");
                    }}
                    key={d.id}
                  >
                    <input
                      className="hidden peer"
                      type="radio"
                      defaultChecked={i === 0}
                      name="difficulty"
                      id={d.id}
                    />
                    <label
                      className="cursor-pointer p-1 px-2 text-neutral-300 rounded-md border border-neutral-600 peer-checked:border-blue-500 peer-checked:text-blue-500"
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
                  <div
                    onClick={() => {
                      setMode(n.name);
                    }}
                    key={n.name}
                  >
                    <input
                      className="hidden peer"
                      type="radio"
                      defaultChecked={i === 0}
                      name="mode"
                      id={n.name}
                    />
                    <label
                      className="cursor-pointer p-1 px-2 text-neutral-300 rounded-md border border-neutral-600 peer-checked:border-blue-500 peer-checked:text-blue-500"
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
      <main className="pb-6">
        <form className="grid grid-cols-1">
          <p className="row-1 col-1 z-0 text-[2.5rem] leading-tight">
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
            onChange={(e) => {
              setUserInput(e.target.value);
            }}
            value={userInput}
            className="resize-none h-full row-1 col-1 z-1 text-transparent focus:outline-none text-[2.5rem] leading-tight"
            name="test"
            id="test"
            spellCheck="false"
          ></textarea>
        </form>
      </main>
      <footer className="mx-auto">
        <button
          onClick={() => setUserInput("")}
          className="flex items-center cursor-pointer gap-2 bg-neutral-800 hover:bg-neutral-700 text-white font-bold py-3 px-4 rounded-md"
        >
          Restart Test
          <img src={restart} alt="Restart Test" />
        </button>
      </footer>
    </div>
  );
};

export default App;
