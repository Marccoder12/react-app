import SideNav from "../features/HomePage/components/SideNav/SideNav";
import MainPage from "../features/HomePage/components/MainPage";
import { useTheme } from "../context/ThemeContext";
import BottomNav from "../features/HomePage/components/BottomNav/BottomNav";

export default function Home() {
  return (
    <main
      className={`h-full grid gap-4 pb-4 pt-4 pr-4 not-md:p-0 md:grid-cols-[220px_1fr] not-md:grid-rows-[1fr_80px]`}
    >
      {/* <p>Hello World</p> */}
      <SideNav />
      <MainPage />
      <BottomNav />
    </main>
  );
}

// // Assuming you have a 'supabase' client instance imported and initialized
// async function handleLogOut() {

//   const { error } = await supabase.auth.signOut();

//   if (error) {
//     console.error('Error signing out:', error.message);
//     // You might want to display an error message to the user
//   } else {
//     console.log('User signed out successfully');
//     // Redirect the user to a public page, e.g., the login page
//     // router.push('/login');
//   }
// }

13522809874;
