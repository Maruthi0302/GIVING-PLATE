
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Show limited navigation for request food portal
  const isRequestPortal = location.pathname === '/request-food-portal';
  
  const navItems = isRequestPortal 
    ? [
        { href: "/", label: "Home" },
        { href: "/blog", label: "Blog" },
        { href: "/contact", label: "Contact" },
      ]
    : [
        { href: "/", label: "Home" },
        { href: "/about", label: "About" },
        { href: "/donate", label: "Donate Food" },
        { href: "/ai-engine", label: "AI Engine" },
        { href: "/volunteer", label: "Volunteer" },
        { href: "/blog", label: "Blog" },
        { href: "/contact", label: "Contact" },
      ];

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-7 h-6 rounded-lg flex items-center justify-center overflow-hidden">
              <img 
                src="/care.png" 
                alt="Giving Plate Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-bold text-xl text-foreground">Giving Plate</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  location.pathname === item.href
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* CTA Buttons - Only show donate button when not in request portal */}
          {!isRequestPortal && (
            <div className="hidden lg:flex items-center space-x-4">
              <Button variant="donate" size="sm" asChild>
                <Link to="/donate">Donate Now</Link>
              </Button>
            </div>
          )}

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    location.pathname === item.href
                      ? "text-primary"
                      : "text-muted-foreground"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              {!isRequestPortal && (
                <div className="flex flex-col space-y-2 pt-4">
                  <Button variant="donate" size="sm" asChild>
                    <Link to="/donate" onClick={() => setIsOpen(false)}>
                      Donate Now
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
