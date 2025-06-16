'use client';

import { ChevronDown, Globe, Menu, Moon, Sun } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { useLanguage } from './LanguageProvider';
import { useTheme } from './ThemeProvider';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuGroup, DropdownMenuItem } from './ui/dropdown-menu-v2';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import { useBreakpoint } from './ui/use-breakpoint';
import { WalletButton } from './WalletButton';

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('#');
  const isBelowBreakpoint = useBreakpoint(1060);

  // Scroll detection
  // useEffect(() => {
  //   const handleScroll = () => {
  //     const currentScrollY = window.scrollY;
  //     setScrollY(currentScrollY);
  //     setIsScrolled(currentScrollY > 50);

  //     // Detect current section for active navigation
  //     const sections = ['#', '#analytics', '#faq', '#docs'];
  //     const sectionElements = sections.map(section =>
  //       section === '#' ? document.querySelector('main') : document.querySelector(section)
  //     );

  //     for (let i = sectionElements.length - 1; i >= 0; i--) {
  //       const element = sectionElements[i];
  //       if (element) {
  //         const rect = element.getBoundingClientRect();
  //         if (rect.top <= 100) {
  //           setActiveSection(sections[i]);
  //           break;
  //         }
  //       }
  //     }
  //   };

  //   window.addEventListener('scroll', handleScroll, { passive: true });
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);

  const LanguageSwitcher = ({ className = '' }: { className?: string }) => (
    <div className={`flex items-center gap-2 ${className}`}>
      <Globe className="w-4 h-4 text-muted-foreground" />
      <Select value={language} onValueChange={value => setLanguage(value as 'en' | 'vi')}>
        <SelectTrigger className="w-20 h-8 border-0 bg-transparent">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="en">
            <div className="flex items-center gap-2">
              <span>🇺🇸</span>
              <span>EN</span>
            </div>
          </SelectItem>
          <SelectItem value="vi">
            <div className="flex items-center gap-2">
              <span>🇻🇳</span>
              <span>VI</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );

  const ThemeToggle = ({ className = '' }: { className?: string }) => (
    <div className={`flex items-center bg-secondary rounded-full p-1 ${className}`}>
      <button
        onClick={toggleTheme}
        className={`p-2 rounded-full transition-all ${
          theme === 'light' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
        }`}
      >
        <Sun className="w-4 h-4" />
      </button>
      <button
        onClick={toggleTheme}
        className={`p-2 rounded-full transition-all ${
          theme === 'dark' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
        }`}
      >
        <Moon className="w-4 h-4" />
      </button>
    </div>
  );

  // Navigation items for reuse
  const navigationItems = [
    { href: '#', label: t.bridge, isActive: activeSection === '#' },
    { href: '#analytics', label: t.analytics, isActive: activeSection === '#analytics' },
    { href: '#faq', label: t.faq, isActive: activeSection === '#faq' },
    { href: '#docs', label: t.documentation, isActive: activeSection === '#docs' },
  ];

  // Get the active navigation item for dropdown button text
  const activeNavItem = navigationItems.find(item => item.isActive) || navigationItems[0];

  const handleNavClick = (href: string) => {
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 w-full">
      {/* Header Container with Dynamic Width and Centering */}
      <motion.div
        className="flex justify-center p-0"
        animate={{
          paddingTop: isScrolled ? '1rem' : '0',
          paddingBottom: isScrolled ? '0' : '0',
        }}
        transition={{
          duration: 0.4,
          ease: 'easeInOut',
        }}
      >
        <motion.header
          className="bg-card/95 backdrop-blur-md border-b border-border relative"
          animate={{
            width: isScrolled ? '90%' : '100%',
            maxWidth: isScrolled ? '1200px' : '100%',
            borderRadius: isScrolled ? '1rem' : '0',
            borderBottomLeftRadius: isScrolled ? '1rem' : '0',
            borderBottomRightRadius: isScrolled ? '1rem' : '0',
          }}
          transition={{
            duration: 0.4,
            ease: 'easeInOut',
          }}
          style={{
            boxShadow: isScrolled ? '0 10px 25px rgba(0, 0, 0, 0.1)' : 'none',
          }}
        >
          <motion.div
            className="mx-auto px-6"
            animate={{
              paddingTop: isScrolled ? '0.75rem' : '1rem',
              paddingBottom: isScrolled ? '0.75rem' : '1rem',
            }}
            transition={{
              duration: 0.3,
              ease: 'easeInOut',
            }}
          >
            <div className="flex items-center justify-between">
              {/* Left Side: Logo + Navigation */}
              <div className="flex items-center gap-8">
                {/* Logo with animation */}
                <motion.div
                  className="flex items-center gap-2 cursor-pointer"
                  animate={{
                    scale: isScrolled ? 0.9 : 1,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: 'easeInOut',
                  }}
                  onClick={() => handleNavClick('#')}
                >
                  <motion.div
                    className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center"
                    animate={{
                      width: isScrolled ? '28px' : '32px',
                      height: isScrolled ? '28px' : '32px',
                    }}
                    transition={{
                      duration: 0.3,
                      ease: 'easeInOut',
                    }}
                  >
                    <motion.span
                      className="text-white font-bold"
                      animate={{
                        fontSize: isScrolled ? '14px' : '18px',
                      }}
                      transition={{
                        duration: 0.3,
                        ease: 'easeInOut',
                      }}
                    >
                      B
                    </motion.span>
                  </motion.div>
                  <motion.span
                    className="font-bold text-foreground"
                    animate={{
                      fontSize: isScrolled ? '20px' : '24px',
                    }}
                    transition={{
                      duration: 0.3,
                      ease: 'easeInOut',
                    }}
                  >
                    {t.bridge}
                  </motion.span>
                </motion.div>

                {/* Desktop Navigation - Toggle between full nav and dropdown */}
                <AnimatePresence mode="wait">
                  {!isScrolled && !isBelowBreakpoint ? (
                    // Full Navigation (when not scrolled)
                    <motion.nav
                      key="full-nav"
                      className="hidden md:flex items-center gap-6"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      {navigationItems.map((item, index) => (
                        <motion.button
                          key={item.href}
                          onClick={() => handleNavClick(item.href)}
                          className={`font-medium transition-colors px-3 py-2 rounded-md hover:bg-accent ${
                            item.isActive
                              ? 'text-foreground hover:text-primary'
                              : 'text-muted-foreground hover:text-foreground'
                          }`}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          {item.label}
                        </motion.button>
                      ))}
                    </motion.nav>
                  ) : (
                    <DropdownMenu
                      trigger={
                        <Button
                          variant="ghost"
                          className="h-9 px-3 gap-2 text-sm font-medium hover:bg-accent"
                        >
                          <span className="truncate max-w-24">{activeNavItem.label}</span>
                          <ChevronDown className="w-4 h-4 shrink-0" />
                        </Button>
                      }
                      className="min-w-[200px]"
                      align="start"
                      side="bottom"
                    >
                      {onClickItem => (
                        <DropdownMenuGroup>
                          {navigationItems.map(item => (
                            <DropdownMenuItem
                              key={item.href}
                              onClick={() => {
                                handleNavClick(item.href);
                                onClickItem();
                              }}
                            >
                              {item.label}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuGroup>
                      )}
                    </DropdownMenu>
                  )}
                </AnimatePresence>
              </div>

              {/* Right Side: Desktop Controls */}
              <motion.div
                className="hidden md:flex items-center gap-4"
                animate={{
                  gap: isScrolled ? '12px' : '16px',
                }}
                transition={{
                  duration: 0.3,
                  ease: 'easeInOut',
                }}
              >
                <motion.div
                  animate={{
                    scale: isScrolled ? 0.9 : 1,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: 'easeInOut',
                  }}
                >
                  <LanguageSwitcher />
                </motion.div>
                <motion.div
                  animate={{
                    scale: isScrolled ? 0.9 : 1,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: 'easeInOut',
                  }}
                >
                  <ThemeToggle />
                </motion.div>
                <motion.div
                  animate={{
                    scale: isScrolled ? 0.9 : 1,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: 'easeInOut',
                  }}
                >
                  <WalletButton size={isScrolled ? 'sm' : 'default'} />
                </motion.div>
              </motion.div>

              {/* Mobile Controls */}
              <div className="flex md:hidden items-center gap-2">
                <motion.div
                  animate={{
                    scale: isScrolled ? 0.9 : 1,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: 'easeInOut',
                  }}
                >
                  <ThemeToggle />
                </motion.div>

                {/* Mobile Menu Trigger */}
                <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-10 w-10">
                      <Menu className="w-5 h-5" />
                      <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                  </SheetTrigger>

                  <SheetContent side="right" className="w-80 sm:w-96">
                    <SheetHeader className="border-b border-border pb-4 mb-6">
                      <div className="flex items-center justify-between">
                        <SheetTitle className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">B</span>
                          </div>
                          <span className="text-lg font-bold">{t.bridge}</span>
                        </SheetTitle>
                      </div>
                      <SheetDescription className="text-left text-muted-foreground">
                        Access navigation menu, language settings, and connect your wallet.
                      </SheetDescription>
                    </SheetHeader>

                    <div className="flex flex-col space-y-6">
                      {/* Navigation Menu */}
                      <nav className="space-y-4">
                        <h3 className="font-semibold text-muted-foreground text-sm uppercase tracking-wide">
                          Navigation
                        </h3>
                        <div className="space-y-2">
                          {navigationItems.map(item => (
                            <button
                              key={item.href}
                              onClick={() => {
                                handleNavClick(item.href);
                                setIsMenuOpen(false);
                              }}
                              className={`w-full text-left block p-3 rounded-lg hover:bg-accent transition-colors ${
                                item.isActive ? 'font-medium bg-accent' : ''
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span>{item.label}</span>
                                {item.isActive && (
                                  <div className="w-2 h-2 bg-primary rounded-full" />
                                )}
                              </div>
                            </button>
                          ))}
                        </div>
                      </nav>

                      {/* Language Switcher */}
                      <div className="space-y-4">
                        <h3 className="font-semibold text-muted-foreground text-sm uppercase tracking-wide">
                          Language
                        </h3>
                        <div className="p-3 bg-muted/30 rounded-lg">
                          <LanguageSwitcher className="justify-start" />
                        </div>
                      </div>

                      {/* Connect Wallet Button */}
                      <div className="pt-4 border-t border-border">
                        <WalletButton className="w-full h-12" />
                      </div>

                      {/* Additional Info */}
                      <div className="pt-6 space-y-4 border-t border-border">
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">{t.footerDescription}</p>
                        </div>

                        {/* Social Links */}
                        <div className="flex justify-center gap-4">
                          <a
                            href="#"
                            className="p-2 rounded-lg hover:bg-accent transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            <span className="text-lg">🐦</span>
                          </a>
                          <a
                            href="#"
                            className="p-2 rounded-lg hover:bg-accent transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            <span className="text-lg">📱</span>
                          </a>
                          <a
                            href="#"
                            className="p-2 rounded-lg hover:bg-accent transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            <span className="text-lg">💬</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </motion.div>
        </motion.header>
      </motion.div>
    </div>
  );
}
