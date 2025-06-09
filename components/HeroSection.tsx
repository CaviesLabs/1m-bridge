"use client";

import { useLanguage } from './LanguageProvider';
import { Badge } from './ui/badge';

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 text-white py-16">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="space-y-6">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              {t.bridgeAndEarn}
            </h1>
            <p className="text-xl text-blue-100">
              {t.bridgeDescription}
            </p>
          </div>

          <div className="space-y-4">
            <div className="text-5xl md:text-6xl font-bold">
              $1,000,000
            </div>
            <Badge variant="secondary" className="bg-blue-900/50 text-blue-100 border-blue-400">
              {t.activeCampaign}
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
}