import { ChangeEvent, EventHandler, MouseEventHandler, useState } from "react";
import "../styles/smallComponents.css";

export function Toggle({name, onToggle}: {name: string; onToggle?: (bit: boolean) => void;}) {
  const [toggled, setToggled] = useState(false);

  const handleChange = () => {
    setToggled(!toggled);
    onToggle?.(!toggled); //notify Parent
  };
  return (
    <div className="main-toggle">
      <button type="button" className={`toggle-btn ${toggled ? "toggled" : ""}`} onClick={handleChange}>
        <div className="thumb"></div>
      </button> <p className="toggle-title">{name}</p>
    </div>
  );
}

// inputs
interface InputFieldProps {
  title: string;
  placeholderText?: string;
  onChange?: (newValue: string) => void;
  initialValue?: string;
  type?: "text" | "email" | "password" | "tel"; //bonus
  require?: boolean;
}

export function InputField({title, placeholderText = "Enter", value, onChange, initialValue = "", type = "text", require, }: InputFieldProps & { value: string }) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value); //notify Parent
  };
  return (
    <div className="normal-textField">
      <p className="textField-title">{title}</p>
      <input type={type} value={value} placeholder={placeholderText} onChange={handleChange} required={require}></input>
    </div>
  );
}

export function Button({title, btype="button"}: {title:string, btype:"button" | "submit" | "reset"}){
  return <button type={btype} className="base-btn">{title}</button>
}
