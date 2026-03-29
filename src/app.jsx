import React from "react";

const App = () => {
  return (
    <div className="font-sora mx-auto container items-center p-8 text-neutral-500 ">
      <header className="grid gap-16">
        <div className="flex justify-between items-center">
          <img className="" src="assets/images/logo-large.svg" alt="" />
          <h1 className="before:bg flex items-center">
            <img
              className="mr-2"
              src="assets/images/icon-personal-best.svg"
              alt=""
            />
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
              <form className="flex gap-2" action="">
                <div>
                  <input
                    className="hidden peer"
                    type="radio"
                    name="difficulty"
                    id="easy"
                  />
                  <label
                    className="p-1 px-2 text-neutral-300 rounded-md border border-neutral-600 peer-checked:border-blue-500 peer-checked:text-blue-500"
                    htmlFor="easy"
                  >
                    Easy
                  </label>
                </div>
                <div>
                  <input
                    className="hidden peer"
                    type="radio"
                    name="difficulty"
                    id="medium"
                  />
                  <label
                    className="p-1 px-2 text-neutral-300 rounded-md border border-neutral-600 peer-checked:border-blue-500 peer-checked:text-blue-500"
                    htmlFor="medium"
                  >
                    Medium
                  </label>
                </div>
                <div>
                  <input
                    className="hidden peer"
                    type="radio"
                    name="difficulty"
                    id="hard"
                  />
                  <label
                    className="p-1 px-2 text-neutral-300 rounded-md border border-neutral-600 peer-checked:border-blue-500 peer-checked:text-blue-500"
                    htmlFor="hard"
                  >
                    Hard
                  </label>
                </div>
              </form>
            </div>
            <div className="flex pl-8 gap-2">
              <h2>Mode:</h2>
              <form className="flex gap-2" action="">
                <div>
                  <input
                    className="hidden peer"
                    type="radio"
                    name="mode"
                    id="time"
                  />
                  <label
                    className="p-1 px-2 text-neutral-300 rounded-md border border-neutral-600 peer-checked:border-blue-500 peer-checked:text-blue-500"
                    htmlFor="time"
                  >
                    Time(60s)
                  </label>
                </div>
                <div>
                  <input
                    className="hidden peer"
                    type="radio"
                    name="mode"
                    id="passage"
                  />
                  <label
                    className="py-1 px-2 text-neutral-300 rounded-md border border-neutral-600 peer-checked:border-blue-500 peer-checked:text-blue-500"
                    htmlFor="passage"
                  >
                    Passage
                  </label>
                </div>
              </form>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default App;
