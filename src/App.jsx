import React, { useState, useEffect } from "react";
import "./App.css";
import Keyboard from "./components/Keyboard";
import EmptyContainer from "./components/EmptyContainer";
import { list } from "./words";

function App() {
  const [guesses, setGuesses] = useState([]);
  const [input, setInput] = useState(["", "", "", "", ""]);
  const [success, setSuccess] = useState(false);
  const [activeKey, setActiveKey] = useState(null);

  const [answer] = useState(() =>
    list[Math.floor(Math.random() * list.length)].split("")
  );

  let emptyLists = [];

  // 알파벳
  const alphabet = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(97 + i)
  );

  const PushEmpty = (length) => {
    for (let i = 0; i < length; i++) {
      emptyLists.push(<EmptyContainer />);
    }
  };

  if (!success) {
    PushEmpty(4 - guesses.length);
  } else {
    PushEmpty(5 - guesses.length);
  }

  const handleKeyPress = (key) => {
    setActiveKey(key);

    window.dispatchEvent(new KeyboardEvent("keydown", { key }));

    setTimeout(() => {
      setActiveKey(null);
    }, 120);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      setActiveKey(e.key);

      setTimeout(() => {
        setActiveKey(null);
      }, 120);

      if (alphabet.includes(e.key)) {
        setInput((prev) => {
          //빈 칸이 없는 경우 입력 무효화
          if (!prev.includes("")) return prev;

          const next = [...prev];
          next[next.indexOf("")] = e.key;
          return next;
        });
      }

      if (e.key === "Backspace") {
        setInput((prev) => {
          const next = [...prev];
          const last = [...next].reverse().findIndex((x) => x !== "");

          //전부 빈 칸이 아니어야 지우는 것
          if (last !== -1) {
            next[4 - last] = "";
          }
          return next;
        });
      }

      if (e.key === "Enter") {
        if (input.includes("")) return;

        setGuesses((prev) => [...prev, input]);

        if (input.join("") === answer.join("")) {
          setSuccess(true);
        } else if (guesses.length >= 4) {
          alert(
            "실패하셨습니다 다시 한번 도전해보세요~ \n 단어: " + answer.join("")
          );
          window.location.reload();
        }

        setInput(["", "", "", "", ""]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [alphabet, input, guesses, answer]);

  const getColors = (inputArr, answerArr) => {
    const result = [];
    const tempAnswer = [...answerArr];

    inputArr.forEach((letter, i) => {
      if (letter === tempAnswer[i]) {
        result[i] = "green";
        tempAnswer[i] = null;
      }
    });

    inputArr.forEach((letter, i) => {
      if (!result[i]) {
        const index = tempAnswer.indexOf(letter);
        if (index !== -1) {
          result[i] = "yellow";
          tempAnswer[index] = null;
        } else {
          result[i] = "grey";
        }
      }
    });

    return result;
  };

  return (
    <div class="board">
      {guesses.map((x) => {
        const validity = getColors(x, answer);
        return (
          <div className="corres">
            {x.map((t, i) => (
              <div
                className={`flip container ${validity[i]}`}
                style={{ animationDelay: `${i * 0.2}s` }}
                key={i}
              >
                {t}
              </div>
            ))}
          </div>
        );
      })}
      <div class="corres">
        {!success &&
          input.slice(-5).map((x) => <div class="container">{x}</div>)}
      </div>
      {emptyLists}

      <Keyboard
        onKeyPress={handleKeyPress}
        letterStatus={{}}
        activeKey={activeKey}
      />
    </div>
  );
}

export default App;
