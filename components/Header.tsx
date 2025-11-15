
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
    const location = useLocation();

    const getLinkClass = (path: string) => {
        return location.pathname === path
            ? 'bg-base-300 text-content-100 px-3 py-2 rounded-md text-sm font-medium'
            : 'text-content-200 hover:bg-base-200 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors';
    };

    return (
        <header className="bg-base-200 shadow-md border-b border-base-300">
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center gap-3">
                        <Link to="/" className="flex items-center gap-3 group">
                            {/* Logo */}
                            <div className="relative">
                                                <img 
                                    src="/logo.png" 
                                    alt="PRD Logo" 
                                    className="w-10 h-10 rounded-lg shadow-lg group-hover:shadow-xl transition-all duration-200 group-hover:scale-105"
                                />
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-base-200 animate-pulse"></div>
                            </div>
                            {/* Nome */}
                            <div className="flex items-center">
                                <span className="text-sm sm:text-base font-semibold text-content-200 tracking-wider uppercase">
                                    Enterprise Edition
                                </span>
                            </div>
                        </Link>
                    </div>
                    <div className="flex items-center space-x-2 sm:space-x-4">
                        <Link to="/" className={getLinkClass('/')}>
                            <span className="hidden sm:inline">Gerador</span>
                            <span className="sm:hidden">📝</span>
                        </Link>
                        <Link to="/dashboard" className={getLinkClass('/dashboard')}>
                            <span className="hidden sm:inline">Dashboard</span>
                            <span className="sm:hidden">📊</span>
                        </Link>
                        <Link to="/history" className={getLinkClass('/history')}>
                            <span className="hidden sm:inline">Histórico</span>
                            <span className="sm:hidden">📚</span>
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
