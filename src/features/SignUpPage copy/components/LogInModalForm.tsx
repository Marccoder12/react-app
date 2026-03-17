import {
  Toggle,
  InputField,
  RequiredInputField,
  RequiredPasswordField,
} from "../../../components/SmallComps";
import "../Styles/LogInModal.css";

export function LogInModalForm() {
  return (
    <main className="logInModalForm">
      <h2 className="modalTitle"> Log In</h2>
      <div className="fields">
        <div className="emailnPass">
          <InputField title="Email Address" placeholderText=""></InputField>
          <RequiredPasswordField
            title="Password"
            placeholderText=""
          ></RequiredPasswordField>
        </div>
        <Toggle name="Remember Me?"></Toggle>
      </div>
      <button type="submit" className="signUpBtn">
        Log In
      </button>
      <p>
        Don't have an Account?<a href="/auth/register">SignUp</a>
      </p>
    </main>
  );
}
