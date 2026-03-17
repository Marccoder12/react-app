import { BrowserRouter, Route } from "react-router-dom";
import {
  Toggle,
  InputField,
  RequiredInputField,
  RequiredPasswordField,
} from "../../../components/SmallComps";
import "../Styles/SignUpModal.css";

export function SignUpModalForm() {
  return (
    <main className="signUpModalForm">
      <h2 className="modalTitle"> Sign Up</h2>
      <div className="fields">
        <div className="name-row">
          <InputField title="First Name" placeholderText=""></InputField>
          <InputField title="Last Name" placeholderText=""></InputField>
        </div>
        <div className="emailnPass">
          <InputField title="Email Address" placeholderText=""></InputField>
          <RequiredPasswordField
            title="Password"
            placeholderText=""
          ></RequiredPasswordField>
          {/* <RequiredInputField title="Confirm Password" placeholderText=""></RequiredInputField> */}
        </div>
        <Toggle name="Remember Me?"></Toggle>
      </div>
      <button type="submit" className="signUpBtn">
        Sign Up
      </button>
      <p>
        Already have an Account?<a href="/auth/login">LogIn</a>
      </p>
    </main>
  );
}
