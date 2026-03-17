import "../styles/ProfileWidget.css";
import * as img from "../../../assets/react.svg";
export default function ProfileWidget() {
  return (
    <>
      <button className="userProf">
        <img src={img.default.toString()}></img>
      </button>

      {/* <div className="hoverText">
        <p>Hello</p>
      </div> */}
    </>
  );
}
