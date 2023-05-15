import AccountManagment from "../components/authorization";
import { useRouter } from 'next/router'

export default function Page() {
  // const router = useRouter()

  // if (router.basePath === '/') {
  //   return 
  // }

  return (
    <>
      <h1>Hello, Next.js!</h1>
      <AccountManagment></AccountManagment>
    </>
  );
}
