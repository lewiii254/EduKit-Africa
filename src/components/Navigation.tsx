import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { BookOpen, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export function Navigation() {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/tracks', label: 'Tracks' },
    { to: '/youtube', label: 'YouTube' },
    { to: '/free-certificates', label: 'Free Certificates' },
    { to: '/contribute', label: 'Contribute' },
    { to: '/about', label: 'About' },
    ...(user ? [{ to: '/dashboard', label: 'Dashboard' }] : []),
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="bg-hero-gradient bg-clip-text text-transparent">
              EduKit Africa
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary',
                  location.pathname === link.to
                    ? 'text-primary'
                    : 'text-muted-foreground'
                )}
              >
                {link.label}
              </Link>
            ))}
            {user ? (
              <Button onClick={signOut} variant="outline" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            ) : (
              <Link to="/auth">
                <Button size="sm">Sign In</Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  'block py-2 text-sm font-medium transition-colors',
                  location.pathname === link.to
                    ? 'text-primary'
                    : 'text-muted-foreground'
                )}
              >
                {link.label}
              </Link>
            ))}
            {user ? (
              <Button onClick={signOut} variant="outline" size="sm" className="w-full">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            ) : (
              <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                <Button size="sm" className="w-full">Sign In</Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
