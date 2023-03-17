import { Outlet } from "react-router-dom"
import Header from "./Header"

const Layout = () => {
  return (
    <div className="w-screen h-full min-h-screen bg-slate-200">
      <Header />
      <main className="container mx-auto px-3 md:px-5 max-w-5xl pt-5 md:pt-7 pb-5">
        <Outlet />
      </main>
    </div>
  )
}
export default Layout