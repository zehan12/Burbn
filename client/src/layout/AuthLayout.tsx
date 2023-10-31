import { Outlet } from "react-router-dom"
import Header from "../components/layout/Header"

const AuthLayout = () => {
  return (
    <div className="w-full h-full flex flex-col items-center">
      <Header />
      <Outlet />
    </div>
  )
}

export default AuthLayout