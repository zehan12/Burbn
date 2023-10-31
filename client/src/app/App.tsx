import ApplicationRoutes from "../routes/ApplicationRoutes"
import { useAppSelector } from "./hooks"

function App() {
  useAppSelector((state)=> console.log(state))
  return (
    <>
        <ApplicationRoutes />
    </>
  )
}

export default App
