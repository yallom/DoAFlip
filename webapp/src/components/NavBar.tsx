import { Outlet } from "react-router-dom"

const NavBar = () => {
    const selected = "Homepage"

    const navItems = ["Homepage", "Transactions", "Coins", "Settings"]

    return (
        <div className="app-container">
            <header className="flex justify-between items-center p-8 bg-[#251927]">
                <div className="flex gap-2 rounded-xl border border-[#E637BF] p-3 shadow-[0_8px_24px_rgba(230,55,191,0.1)]">
                    {navItems.map((item) => {
                        const isSelected = item === selected
                        return (
                            <a
                                key={item}
                                href="#"
                                className={`rounded-xl px-4 py-1 text-md font-medium hover:text-[#E637BF]/80 ${
                                    isSelected ? "text-[#E637BF]" : "text-[#FBCAEF]"
                                }`}
                            >
                                {item}
                            </a>
                        )
                    })}
                </div>
                <p className="rounded-xl bg-[#E637BF] p-3 shadow-[0_8px_24px_rgba(230,55,191,0.15)]">
                    <span className="rounded-xl px-4 py-1 text-md font-bold text-[#251927]">
                        Balance: 0.00 €
                    </span>
                </p>
            </header>
            <Outlet/>
        </div>
    )
}

export default NavBar