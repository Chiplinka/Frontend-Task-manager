import Link from "next/link";
import ButtonLogOut from "@/components/logout";

// const Navbar = ({ isAuthenticated, setIsAuthenticated }: any) => {
//   return (
//     <nav className="bg-gray-400">
//       <div className="">
//         <ul className="flex items-center justify-around font-bold">
//           <li>
//             <Link href={"/"}>Home</Link>
//           </li>
//           <li>
//             <Link href={"/tasks"}>Task</Link>
//           </li>
//           <li>
//             <Link href={"/about"}>About</Link>
//           </li>
//           {/* <li>
//             <ButtonLogOut/>
//           </li> */}
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import React from "react";

const Navbar = () => {
  const navElCss =
    "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-xl font-medium";
  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-white text-3xl font-semibold">My App</span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link className={navElCss} href={"/"}>
                  Home
                </Link>
                <Link className={navElCss} href={"/tasks"}>
                  Task
                </Link>
                <Link className={navElCss} href={"/about"}>
                  About
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
