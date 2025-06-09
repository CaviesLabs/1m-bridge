"use client";

import React, { useState } from 'react';
import { useTheme } from './ThemeProvider';
import { useLanguage } from './LanguageProvider';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Moon, Sun, Globe, Menu, X } from 'lucide-react';

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const LanguageSwitcher = ({ className = "" }: { className?: string }) => (
    <div className={`flex items-center gap-2 ${className}`}>
      <Globe className="w-4 h-4 text-muted-foreground" />
      <Select value={language} onValueChange={(value) => setLanguage(value as 'en' | 'vi')}>
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

  const ThemeToggle = ({ className = "" }: { className?: string }) => (
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

  return (
    <header className="bg-card border-b border-border w-full">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left Side: Logo + Navigation */}
          <div className="flex items-center gap-8">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">B</span>
              </div>
              <span className="text-2xl font-bold text-foreground">{t.bridge}</span>
            </div>

            {/* Desktop Navigation - positioned on the left */}
            <nav className="hidden md:flex items-center gap-6">
              <a 
                href="#" 
                className="text-foreground font-medium hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-accent"
              >
                {t.bridge}
              </a>
              <a 
                href="#analytics" 
                className="text-muted-foreground font-medium hover:text-foreground transition-colors px-3 py-2 rounded-md hover:bg-accent"
              >
                {t.analytics}
              </a>
              <a 
                href="#faq" 
                className="text-muted-foreground font-medium hover:text-foreground transition-colors px-3 py-2 rounded-md hover:bg-accent"
              >
                {t.faq}
              </a>
              <a 
                href="#docs" 
                className="text-muted-foreground font-medium hover:text-foreground transition-colors px-3 py-2 rounded-md hover:bg-accent"
              >
                {t.documentation}
              </a>
            </nav>
          </div>

          {/* Right Side: Desktop Controls */}
          <div className="hidden md:flex items-center gap-4">
            <LanguageSwitcher />
            <ThemeToggle />
            <Button>{t.connectWallet}</Button>
          </div>

          {/* Mobile Controls */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            
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
                      <a 
                        href="#" 
                        className="block p-3 rounded-lg hover:bg-accent transition-colors font-medium"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {t.bridge}
                      </a>
                      <a 
                        href="#analytics" 
                        className="block p-3 rounded-lg hover:bg-accent transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {t.analytics}
                      </a>
                      <a 
                        href="#faq" 
                        className="block p-3 rounded-lg hover:bg-accent transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {t.faq}
                      </a>
                      <a 
                        href="#docs" 
                        className="block p-3 rounded-lg hover:bg-accent transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {t.documentation}
                      </a>
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
                    <Button 
                      className="w-full h-12"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="mr-2">🔗</span>
                      {t.connectWallet}
                    </Button>
                  </div>

                  {/* Additional Info */}
                  <div className="pt-6 space-y-4 border-t border-border">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">
                        {t.footerDescription}
                      </p>
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
      </div>
    </header>
  );
}