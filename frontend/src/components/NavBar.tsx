import { Outlet } from "react-router-dom"

const NavBar = () => {

    return (
        <div className="lg:flex select-none w-full h-screen place-items-end">
            <div className={`overflow-hidden flex justify-center items-center w-full h-9/10 lg:h-full lg:w-1000`}>
                <Outlet />
            </div>
        </div>
    )
}

export default NavBar