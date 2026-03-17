import "../styles/HomePage.css";
import Topnav from "../features/HomePage/components/Topnav";
import SideNav from "../features/HomePage/components/SideNav";
import MainContent from "../features/HomePage/components/MainContent";
import SideBar from "../features/HomePage/components/Sidebar";
import Footer from "../features/HomePage/components/Footer";
export default function Home() {
  return (
    <>
      <Topnav></Topnav>;
      <SideNav></SideNav>
      <MainContent></MainContent>
      <SideBar></SideBar>
      <Footer></Footer>
    </>
  );
}
