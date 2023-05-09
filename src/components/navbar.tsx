import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-gray-400">
      <div className="">
        <ul className="flex items-center justify-between font-bold">
          <li>
            <Link href={"/"}>Home</Link>
          </li>
          <li>
            <Link href={"/tasks"}>Task</Link>
          </li>
          <li>
            <Link href={"/about"}>About</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
