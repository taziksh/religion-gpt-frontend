import logo from './logo.svg';
import './App.css';
import { useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [textAreaValues, setTextAreaValues] = useState({
    textarea1: "",
    textarea2: "",
    textarea3: "",
    textarea4: "",
    textarea5: "",
    textarea6: "",
  })

  function handleChange(event) {
    setText(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    //prod: https://prophetgpt-1-v0497515.deta.app
    //dev: http://localhost:8000
    fetch(`https://prophetgpt-1-v0497515.deta.app/prompts/?question=${text}`, {
      credentials: "include",
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
          textarea4: data["Buddhism"],
          textarea5: data["Hinduism"],
          textarea6: data["Taoism"],
        })
      })
      .catch(error => console.log(error));
  }

  return (
    <div className="parent">
      <>
        <h1 className="text-4xl">📖 amenGPT</h1>
        <h3 className="italic">Daily questions, divine answers</h3>
        <form className="form" onSubmit={handleSubmit}>
          <textarea className="textarea-lg input-box" onChange={handleChange} value={text} />
          <button className="btn submit-button" type="submit">Submit</button>
        </form>
        <div className="container">
          <label className="label">
          🕌 islam
            <textarea id="textarea1" className="textarea-lg text-sm box" value={textAreaValues.textarea1} readOnly>
            </textarea>
          </label>
          <label className="label">
          ⛪️ christianity
            <textarea className="textarea-lg text-sm box" value={textAreaValues.textarea2} readOnly />
          </label>
          <label className="label">
          🕍 judaism
            <textarea className="textarea-lg text-sm box" value={textAreaValues.textarea3} readOnly />
          </label>
          <label className="label">
          ☸️ buddhism
            <textarea className="textarea-lg text-sm box" value={textAreaValues.textarea4} readOnly />
          </label>
          <label className="label">
          🛕 hinduism
            <textarea className="textarea-lg text-sm box" value={textAreaValues.textarea5} readOnly />
          </label>
          <label className="label">
          ☯️ taoism
            <textarea className="textarea-lg text-sm box" value={textAreaValues.textarea6} readOnly />
          </label>                        
        </div>
      </>
    </div>

  );
}

export default App;
