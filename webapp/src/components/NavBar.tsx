import { Outlet, Link, useNavigate } from "react-router-dom"
import { User, LogOut, ChevronDown, Menu, X } from "lucide-react"
import { useState } from "react"
import logoComp from '@/assets/logo_comp.png';

interface NavBarProps {
    userName?: string;
    userImage?: string;
}

const NavBar = ({ userName = "John Doe", userImage }: NavBarProps = {}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
            <nav className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl">
                <div className="bg-white/95 backdrop-blur-md border border-primary-green/20 rounded-full px-4 md:px-6 py-3 shadow-lg shadow-primary-green/10">
                    <div className="flex items-center justify-between">

                        <div className="flex items-center gap-6 md:gap-8">
                            <img src={logoComp} alt="NutriAI Logo" className="h-8 md:h-10 w-auto" />
                            
                            <div className="hidden md:flex items-center gap-8">
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
                                    Recipe Builder
                                </Link>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 md:gap-0">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="md:hidden p-2 text-dark-green-2 hover:text-primary-green transition-colors"
                                aria-label="Toggle menu"
                            >
                                {isMobileMenuOpen ? (
                                    <X className="w-5 h-5" />
                                ) : (
                                    <Menu className="w-5 h-5" />
                                )}
                            </button>

                            <div className="relative">
                                <button
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    className="flex items-center gap-2 md:gap-3 hover:opacity-80 transition-opacity"
                                >
                                    <span className="hidden sm:block text-dark-green-2 font-medium text-sm">{userName}</span>
                                    <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-primary-green/20 border-2 border-primary-green overflow-hidden flex items-center justify-center">
                                        {userImage ? (
                                            <img 
                                                src={userImage} 
                                                alt={userName} 
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <User className="w-4 h-4 md:w-5 md:h-5 text-primary-green" />
                                        )}
                                    </div>
                                    <ChevronDown 
                                        className={`hidden sm:block w-4 h-4 text-dark-green-1 transition-transform ${
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

                    {isMobileMenuOpen && (
                        <div className="md:hidden mt-4 pt-4 border-t border-primary-green/20 space-y-2 pb-2">
                            <Link 
                                to="/recipes" 
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block px-4 py-2 text-dark-green-2 hover:bg-primary-green/10 rounded-full transition-colors text-sm font-medium"
                            >
                                Recipes
                            </Link>
                            <Link 
                                to="/settings" 
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block px-4 py-2 text-dark-green-2 hover:bg-primary-green/10 rounded-full transition-colors text-sm font-medium"
                            >
                                Recipe Builder
                            </Link>
                        </div>
                    )}
                </div>
            </nav>
            <div className="pt-20 md:pt-24">
                <Outlet/>
            </div>
        </div>
    )
}

export default NavBar