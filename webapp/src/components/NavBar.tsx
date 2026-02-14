import { Outlet } from "react-router-dom"
import { Home, Calendar, Settings, Bell } from "lucide-react"

const NavBar = () => {
    return (
        <div className="app-container">
            <header className="flex justify-between items-center px-8 py-4 bg-darkgreen border-b border-lightgreen/20">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-lightgreen rounded-full flex items-center justify-center">
                        <img 
                            src="/assets/logo.png" 
                            alt="NutriAI Logo" 
                            className="w-6 h-6 object-contain"
                        />
                    </div>
                    <span className="text-xl font-bold text-white">
                        NutriAI
                    </span>
                </div>

                <div className="flex items-center gap-4">
                    <button 
                        className="w-11 h-11 flex items-center justify-center rounded-xl bg-green hover:bg-lightgreen/20 border border-lightgreen/40 text-lightgreen transition-all hover:scale-105"
                        aria-label="Home"
                    >
                        <Home size={20} />
                    </button>
                    
                    <button 
                        className="w-11 h-11 flex items-center justify-center rounded-xl bg-green hover:bg-lightgreen/20 border border-lightgreen/40 text-lightgreen transition-all hover:scale-105"
                        aria-label="Calendar"
                    >
                        <Calendar size={20} />
                    </button>
                    
                    <button 
                        className="w-11 h-11 flex items-center justify-center rounded-xl bg-green hover:bg-lightgreen/20 border border-lightgreen/40 text-lightgreen transition-all hover:scale-105"
                        aria-label="Settings"
                    >
                        <Settings size={20} />
                    </button>
                    
                    <button 
                        className="w-11 h-11 flex items-center justify-center rounded-xl bg-green hover:bg-lightgreen/20 border border-lightgreen/40 text-lightgreen transition-all hover:scale-105"
                        aria-label="Notifications"
                    >
                        <Bell size={20} />
                    </button>

                    <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-lightgreen ml-2 cursor-pointer hover:border-yellow transition-colors">
                        <img 
                            src="/assets/profile.jpg" 
                            alt="Profile" 
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </header>
            <Outlet/>
        </div>
    )
}

export default NavBar