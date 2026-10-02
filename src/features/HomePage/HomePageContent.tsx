import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FineTaskContent } from "../FineTaskPage/FineTaskContent";
import SideNav from "./components/SideNav/SideNav";
import MainPage from "./components/MainPage";
import BottomNav from "./components/BottomNav/BottomNav";

export const HomePageContent = () => {
  return (
    <main className='grid grid-cols-[1fr_0.55fr] m-3 w-auto h-10/12'>
      <SideNav></SideNav>
      <MainPage></MainPage>
      {/* <BrowserRouter>
        <Routes>
          <Route path="/dashboard/finetask" element={<FineTaskList />}></Route>
        </Routes>
      </BrowserRouter> */}
    </main>
  );
};
