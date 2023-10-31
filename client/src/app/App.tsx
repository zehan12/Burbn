import ApplicationRoutes from "../routes/ApplicationRoutes"
import { useAppSelector } from "./hooks"

function App() {
  useAppSelector((state)=> console.log(state))
  return (
    <div className="h-[100vh] dark:text-white dark:bg-black">
        <ApplicationRoutes />
    </div>
  )
}

export default App
