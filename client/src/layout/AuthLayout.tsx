import { Outlet } from "react-router-dom"

const AuthLayout = () => {
  return (
    <div className="w-full h-full flex flex-col items-center">
        <Outlet />
    </div>
  )
}

export default AuthLayout