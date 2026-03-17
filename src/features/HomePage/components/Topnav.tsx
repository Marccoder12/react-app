import ProfileWidget from "./ProfileWidget";
import "../styles/Topnav.css";

export default function Topnav() {
  return (
    <header className="flex-header">
      TOPNAV
      <img className="logo"></img>
      <ProfileWidget></ProfileWidget>
    </header>
  );
}
