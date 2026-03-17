import { EventHandler, useState } from "react";
import "../styles/smallComponents.css";

export function Toggle({ name }: { name: string }) {
  const [toggled, setToggled] = useState(false);
  return (
    <div className="main-toggle">
      <button
        className={`toggle-btn ${toggled ? "toggled" : ""}`}
        onClick={() => setToggled(!toggled)}
      >
        <div className="thumb"></div>
      </button>
      <p className="toggle-title">{name}</p>
    </div>
  );
}

export function InputField({
  title,
  placeholderText = "Enter",
}: {
  title: string;
  placeholderText: string;
}) {
  const [val, setVal] = useState("");

  const click = () => {
    alert(val);
  };
  const change = (even: any) => {
    setVal(even.target.value);
  };
  return (
    <div className="normal-textField">
      <p className="textField-title">{title}</p>
      <input
        type="text"
        value={val}
        placeholder={placeholderText}
        onChange={change}
      ></input>
    </div>
  );
}

export function RequiredPasswordField({
  title,
  placeholderText = "Enter",
}: {
  title: string;
  placeholderText: string;
}) {
  const [val, setVal] = useState("");

  const click = () => {
    alert(val);
  };
  const change = (even: any) => {
    setVal(even.target.value);
  };
  return (
    <div className="normal-textField">
      <p className="textField-title">{title}</p>
      <input
        type="password"
        required={true}
        value={val}
        placeholder={placeholderText}
        onChange={change}
      ></input>
    </div>
  );
}
export function RequiredInputField({
  title,
  placeholderText = "Enter",
}: {
  title: string;
  placeholderText: string;
}) {
  const [val, setVal] = useState("");

  const click = () => {
    alert(val);
  };
  const change = (even: any) => {
    setVal(even.target.value);
  };
  return (
    <div className="normal-textField">
      <p className="textField-title">{title}</p>
      <input
        type="text"
        required={true}
        value={val}
        placeholder={placeholderText}
        onChange={change}
      ></input>
    </div>
  );
}
