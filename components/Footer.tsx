'use client';

import { Github, MessageCircle, Twitter } from 'lucide-react';
import { motion } from 'motion/react';
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
              <img src="/icons/logo.svg" alt="logo" className="w-10 h-10" />
              <motion.span
                className="font-bold text-foreground"
                style={{ fontSize: '20px' }}
                transition={{
                  duration: 0.3,
                  ease: 'easeInOut',
                }}
              >
                1MBridge
              </motion.span>
            </div>
            <p className="text-muted-foreground text-sm">{t.footerDescription}</p>
          </div>

          {/* Products */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">{t.products}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  {t.bridge}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  {t.analytics}
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">{t.resources}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  {t.documentation}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  {t.faq}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  {t.support}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  {t.auditReports}
                </a>
              </li>
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
          <p className="text-sm text-muted-foreground">{t.copyright}</p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">
              {t.privacyPolicy}
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              {t.termsOfService}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
