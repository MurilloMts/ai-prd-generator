
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
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-200 group-hover:scale-105">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-base-200 animate-pulse"></div>
                            </div>
                            {/* Nome */}
                            <div className="flex flex-col">
                                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent tracking-tight">
                                    PRD-Gen
                                </span>
                                <span className="text-[10px] text-content-200 -mt-1 tracking-wider uppercase">
                                    Enterprise Edition
                                </span>
                            </div>
                        </Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Link to="/" className={getLinkClass('/')}>
                            Gerador
                        </Link>
                        <Link to="/dashboard" className={getLinkClass('/dashboard')}>
                            Dashboard
                        </Link>
                        <Link to="/history" className={getLinkClass('/history')}>
                            Histórico
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
