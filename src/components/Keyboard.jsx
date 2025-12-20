export default function Keyboard({ onKeyPress, letterStatus, activeKey }) {
  const rows = [
    ["q","w","e","r","t","y","u","i","o","p"],
    ["a","s","d","f","g","h","j","k","l"],
    ["Enter","z","x","c","v","b","n","m","Backspace"],
  ];

  return (
    <div className="keyboard">
      {rows.map((row, i) => (
        <div className="key-row" key={i}>
          {row.map((key) => (
            <button
              key={key}
              className={`key 
                ${letterStatus[key] || ""} 
                ${activeKey === key ? "pressed" : ""}
              `}
              onClick={() => onKeyPress(key)}
            >
              {key === "Backspace" ? "⌫" : key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}