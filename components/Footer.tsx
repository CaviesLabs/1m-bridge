"use client";

import { Github, MessageCircle, Twitter } from 'lucide-react';
import { useLanguage } from './LanguageProvider';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-card border-t border-border mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">B</span>
              </div>
              <span className="text-xl font-bold text-foreground">{t.bridge}</span>
            </div>
            <p className="text-muted-foreground text-sm">
              {t.footerDescription}
            </p>
          </div>

          {/* Products */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">{t.products}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">{t.bridge}</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">{t.analytics}</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">{t.resources}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">{t.documentation}</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">{t.faq}</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">{t.support}</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">{t.auditReports}</a></li>
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">{t.community}</h3>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            {t.copyright}
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">{t.privacyPolicy}</a>
            <a href="#" className="hover:text-foreground transition-colors">{t.termsOfService}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}