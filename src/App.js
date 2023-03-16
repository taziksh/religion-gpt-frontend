import logo from './logo.svg';
import './App.css';
import { useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [textAreaValues, setTextAreaValues] = useState({
    textarea1: "",
    textarea2: "",
    textarea3: "",
  })

  function handleChange(event) {
    setText(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    fetch(`http://localhost:8000/prompts/?question=${text}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "accept": "application/json",
        "Cookie": "deta_app_token=S6DMT0cYNhQBTnLiaU6kTbjlYxrYWX51PInb4L0F5dYL1aVM"
      },
      // body: JSON.stringify({ topic: text })
    })
      .then(response => response.json())
      .then(data => {
        setTextAreaValues({
          textarea1: data["Islam"],
          textarea2: data["Christianity"],
          textarea3: data["Judaism"],
        })
      })
      .catch(error => console.log(error));
  }

  return (
    <div className="parent">
      <h1 className="text-4xl">📖 ongpt</h1>
      <form className="form" onSubmit={handleSubmit}>
        <textarea className="textarea-lg input-box" onChange={handleChange} value={text} />
        <button className="btn submit-button" type="submit">Submit</button>
      </form>
      <div className="container">
        <label>
        🕌 holy quran
          <textarea className="textarea-lg text-sm box" value={textAreaValues.textarea1} readOnly />
        </label>
        <label>
        ⛪️ bible
          <textarea className="textarea-lg text-sm box" value={textAreaValues.textarea2} readOnly />
        </label>
        <label>
        🕍 torah
          <textarea className="textarea-lg text-sm box" value={textAreaValues.textarea3} readOnly />
        </label>
      </div>
    </div>

  );
}

export default App;
