import { Link, useNavigate } from "react-router-dom";
import { InputField, Button } from "../../../components/SmallComps";
import "../Styles/SignUpModal.css";
import {supabase} from "../../../lib/supabase/client";
import { FormEvent, useState } from "react";

export function SignUpModalForm() {
  const navigate = useNavigate(); 

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      //show Toast message
      console.log("Paswwords do not match!");
      setPassword("");
      setConfirmPassword("");
      return;
    }
    if (!email?.trim() || !password) {
      //show Toast message
      console.log("Email and paswword are required");
      setPassword("");
      setConfirmPassword("");
      return;
    }
    if(password.length < 8){
      //extra security prompts
    }

    try{
      const { data, error } = await supabase.auth.signUp({
        email : email,
        password: password,
        options: {
          // Verify important for confirmation redirect
          emailRedirectTo: `${window.location.origin}/welcome`,
          
          //Send names as metadata -> they'll go into auth.users.raw_ysers_meta_data
          data: {
            first_name: firstName.trim().toLowerCase(),
            last_name: lastName.trim().toLowerCase(),
          },
        }
      });
      if(error){
        alert(error.message);
        setPassword('');
        setConfirmPassword('');
        return;
      }

      //_______________________________________
      //🔥Immediately clear ALL sensitive fields
      //_______________________________________
      setPassword("");
      setConfirmPassword("");
      setEmail(""); //optional but good practice


      //Success -> redirect to welcome / check-your-email page
      // window.location.href = "/welcome?justSignedUp=true";    
      navigate('/welcome?justSignedUp=true');
    }catch(err : any){
      console.log(err.message || "SignUp failed. Please try again.");
      //Still clear passwords even on the error(good practice)
      setPassword("");
      setConfirmPassword("");
    }
  };
  return (
    <main className="signUpModalForm">
      <h2 className="modalTitle"> Sign Up</h2>
      {/* Keep the form tag - it gives you e.preventDefault() and Enter key support */}

      <form className="fields" onSubmit={handleSubmit}>
        <div className="name-row">
        
          <InputField title="First Name" placeholderText="" onChange={setFirstName} value={firstName}/>
          <InputField title="Last Name" placeholderText="" onChange={setLastName} value={lastName}/>
        
        </div>
        
        <div className="emailnPass">

          <InputField title="Email Address" placeholderText="" onChange={setEmail} value={email} type="email"/>
          <InputField title="Password" placeholderText="" onChange={setPassword} value={password} type="password"/>
          <InputField title="Confirm Password" placeholderText="" onChange={setConfirmPassword} value={confirmPassword} type="password"/>
        
        </div>
         {/* onToggle={setRememberMe} //<- pass the setter directly */}
        {/* Button stays inside form -> type ="submit" works naturally */}
        {/* <button type="submit" className="signUpBtn"> Register</button> */}
        <Button btype="submit" title="Sign Up"/>
      </form>
      <p>
        Already have an Account?<Link to="/auth/login">Log In</Link>
      </p>
    </main>
  );
}
