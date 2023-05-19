import Link from "next/link";
import ButtonLogOut from "@/components/logout";

const Navbar = ({ isAuthenticated, setIsAuthenticated }: any) => {
  return (
    <nav className="bg-gray-400">
      <div className="">
        <ul className="flex items-center justify-around font-bold">
          <li>
            <Link href={"/"}>Home</Link>
          </li>
          <li>
            <Link href={"/tasks"}>Task</Link>
          </li>
          <li>
            <Link href={"/about"}>About</Link>
          </li>
          {/* <li>
            <ButtonLogOut/>
          </li> */}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
