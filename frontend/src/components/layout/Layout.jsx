import { NavLink, Outlet } from 'react-router-dom';
import { 
  ChefHat, 
  UtensilsCrossed, 
  Store, 
  ShoppingBasket, 
  User,
  Home,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';
import { currentUser } from '../../data/mockData';

const navItems = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/recipes', icon: ChefHat, label: 'Recipes' },
  { to: '/restaurants', icon: UtensilsCrossed, label: 'Restaurants' },
  { to: '/ingredients', icon: ShoppingBasket, label: 'Ingredients' },
  { to: '/stores', icon: Store, label: 'Stores' },
  { to: '/profile', icon: User, label: 'Profile' },
];

export function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <NavLink to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center transform group-hover:scale-105 transition-transform">
                <ChefHat className="w-6 h-6 text-black" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight">
                  <span className="text-amber-400">Salt</span>
                  <span className="text-white">&</span>
                  <span className="text-zinc-400">Schema</span>
                </h1>
              </div>
            </NavLink>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) => `
                    flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
                    transition-all duration-200
                    ${isActive 
                      ? 'bg-amber-500/20 text-amber-400' 
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                    }
                  `}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </NavLink>
              ))}
            </nav>

            {/* User Info (Desktop) */}
            <div className="hidden md:flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-medium text-white">{currentUser.username}</p>
                <p className="text-xs text-zinc-500">Member</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center">
                <span className="text-black font-bold">
                  {currentUser.username.charAt(0)}
                </span>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-zinc-400 hover:text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-zinc-800 bg-black/95 backdrop-blur-md">
            <nav className="px-4 py-4 space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) => `
                    flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium
                    ${isActive 
                      ? 'bg-amber-500/20 text-amber-400' 
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                    }
                  `}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="pt-16 min-h-screen">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-zinc-950 border-t border-zinc-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <ChefHat className="w-5 h-5 text-amber-400" />
              <span className="text-zinc-400 text-sm">
                Salt&Schema © 2026 - CSSE 333 Project
              </span>
            </div>
            <div className="flex items-center gap-6 text-sm text-zinc-500">
              <span>Recipe Database Application</span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">Rose-Hulman Institute of Technology</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
