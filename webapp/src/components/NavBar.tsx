import { Outlet, Link, useNavigate } from "react-router-dom"
import { User, LogOut, ChevronDown } from "lucide-react"
import { useState } from "react"
import logoComp from '@/assets/logo_comp.png';

interface NavBarProps {
    userName?: string;
    userImage?: string;
}

const NavBar = ({ userName = "John Doe", userImage }: NavBarProps = {}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleSignOut = () => {
        console.log('Sign out');
        navigate('/login');
    };

    const handleProfile = () => {
        navigate('/profile');
        setIsMenuOpen(false);
    };

    return (
        <div className="app-container">
            <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-6xl">
                <div className="bg-white/95 backdrop-blur-md border border-primary-green/20 rounded-full px-6 py-3 shadow-lg shadow-primary-green/10">
                    <div className="flex items-center justify-between">

                        <div className="flex items-center">
                            <Link to="/" className="flex items-center">
                                <img src={logoComp} alt="NutriAI Logo" className="h-10 w-auto" />
                            </Link>
                        </div>

                        <div className="flex items-center gap-8">
                            <Link 
                                to="/weekly-plan" 
                                className="text-dark-green-2 hover:text-primary-green font-medium transition-colors text-sm"
                            >
                                Weekly Plan
                            </Link>
                            <Link 
                                to="/recipes" 
                                className="text-dark-green-2 hover:text-primary-green font-medium transition-colors text-sm"
                            >
                                Recipes
                            </Link>
                            <Link 
                                to="/settings" 
                                className="text-dark-green-2 hover:text-primary-green font-medium transition-colors text-sm"
                            >
                                Settings
                            </Link>
                        </div>

                        <div className="relative">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                            >
                                <span className="text-dark-green-2 font-medium text-sm">{userName}</span>
                                <div className="w-10 h-10 rounded-full bg-primary-green/20 border-2 border-primary-green overflow-hidden flex items-center justify-center">
                                    {userImage ? (
                                        <img 
                                            src={userImage} 
                                            alt={userName} 
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <User className="w-5 h-5 text-primary-green" />
                                    )}
                                </div>
                                <ChevronDown 
                                    className={`w-4 h-4 text-dark-green-1 transition-transform ${
                                        isMenuOpen ? 'rotate-180' : ''
                                    }`} 
                                />
                            </button>

                            {isMenuOpen && (
                                <>
                                    <div 
                                        className="fixed inset-0 z-40" 
                                        onClick={() => setIsMenuOpen(false)}
                                    />
                                    <div className="absolute right-0 mt-3 w-48 bg-white border border-primary-green/20 rounded-2xl shadow-lg shadow-primary-green/10 overflow-hidden z-50">
                                        <button
                                            onClick={handleProfile}
                                            className="w-full px-4 py-3 text-left text-dark-green-2 hover:bg-primary-green/10 transition-colors flex items-center gap-3"
                                        >
                                            <User className="w-4 h-4 text-primary-green" />
                                            <span className="text-sm font-medium">Profile</span>
                                        </button>
                                        <div className="border-t border-primary-green/10" />
                                        <button
                                            onClick={handleSignOut}
                                            className="w-full px-4 py-3 text-left text-dark-green-1 hover:bg-red-50 transition-colors flex items-center gap-3"
                                        >
                                            <LogOut className="w-4 h-4 text-red-500" />
                                            <span className="text-sm font-medium">Sign Out</span>
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
            <div className="pt-24">
                <Outlet/>
            </div>
        </div>
    )
}

export default NavBar