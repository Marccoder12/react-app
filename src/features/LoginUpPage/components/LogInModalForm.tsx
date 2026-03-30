import { useState, FormEvent } from "react";
import { Toggle, InputField, Button } from "../../../components/SmallComps";
import "../Styles/LogInModal.css";
import { supabase } from "../../../lib/supabase/client";
import { Link, useNavigate } from "react-router-dom";

export function LogInModalForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    //show Toast message
    if (password.length < 8) {
      if (!password) {
        console.log("Invalid Password");
        setPassword("");
        return;
      }
    }
    if (!email?.trim() || !password) {
      //show Toast message
      console.log("Email and paswword are required");
      setPassword("");
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (error) throw error;

      //_______________________________________
      //🔥Immediately clear ALL sensitive fields
      //_______________________________________
      setPassword("");
      setEmail(""); //optional but good practice
      //Success -> redirect to welcome / check-your-email page
      //(use react-router navigate if you have it, or window.location)
      // window.location.href = "/welcome?justSignedUp=true";
      // window.location.href = "/";
      navigate("/home");
    } catch (err: any) {
      console.log(err.message || "SignUp failed. Please try again.");
      //Still clear passwords even on the error(good practice)
      setPassword("");
    }
  };

  return (
    <main className="logInModalForm">
      <h2 className="modalTitle"> Log In</h2>
      <form className="fields" onSubmit={handleSubmit}>
        <div className="emailnPass">
          <InputField
            title="Email Address"
            placeholderText=""
            onChange={setEmail}
            value={email}
            type="email"
          />
          <InputField
            title="Password"
            placeholderText=""
            onChange={setPassword}
            value={password}
            type="password"
          />
          {/* <Toggle name="Remember Me?" onToggle={setRememberMe} /> */}
        </div>
        <Button btype="submit" title="Log In" />
      </form>
      <p>
        Don't have an Account?<Link to="/auth/register">Sign Up</Link>
      </p>
    </main>
  );
}
