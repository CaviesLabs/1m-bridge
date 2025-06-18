'use client';

import { Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { Provider } from 'react-redux';
import { BridgeInterfaceContainer } from './components/BridgeInterface';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { FAQSection, TermsSection } from './components/InfoSections';
import { LanguageProvider, useLanguage } from './components/LanguageProvider';
import { OnLoadModule } from './components/OnLoadModule';
import { ThemeProvider } from './components/ThemeProvider';
import { Card, CardContent } from './components/ui/card';
import { Toaster } from './components/ui/sonner';
import { BalanceProvider } from './context/BalanceProvider';
import { BridgeProvider } from './context/BridgeContext';
import { SignerProvider } from './context/SignerProvider';
import { SolanaBalancesProvider } from './context/SolanaBalanceProvider';
import { SolanaJupiterProvider } from './context/SolanaWeb3JupiterProvider';
import { SolanaConnectProvider } from './context/SolanaWeb3Provider';
import { SolanaSignerProvider } from './context/useSolanaSigner';
import { WalletProvider } from './context/WalletProvider';
import { Web3ModalProvider } from './context/Web3ModalProvider';
import { store } from './redux/store';

function AppContent() {
  const { t } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: 'easeOut',
      },
    },
    hover: {
      y: -5,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="pt-20">
        {' '}
        {/* Add padding to account for fixed header */}
        {/* <HeroSection /> */}
        <main className="relative">
          {/* Bridge Section with Enhanced Layout */}
          <section className="py-20 bg-gradient-to-b from-background to-muted/20 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 blur-3xl" />
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />

            <div className="max-w-6xl mx-auto px-6 relative">
              {/* Bridge Process Overview */}
              <motion.div
                className="text-center mb-16"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                variants={containerVariants}
              >
                <motion.div
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-primary/5 text-primary px-6 py-3 rounded-full mb-6 backdrop-blur-sm border border-primary/20"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Zap className="w-4 h-4" />
                  <span className="font-medium">{t.crossChainBridge}</span>
                </motion.div>

                <motion.h2
                  className="text-4xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent"
                  variants={itemVariants}
                >
                  {t.bridgeYourAssets}
                </motion.h2>
                <motion.p
                  className="text-xl text-muted-foreground max-w-2xl mx-auto"
                  variants={itemVariants}
                >
                  {t.bridgeYourAssetsDescription}
                </motion.p>
              </motion.div>

              {/* Bridge Interface Container */}
              <BridgeInterfaceContainer />

              {/* Enhanced Additional Info Cards */}
              <motion.div
                className="grid md:grid-cols-3 gap-6 mt-16"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                variants={containerVariants}
              >
                <motion.div variants={cardVariants} whileHover="hover">
                  <Card className="text-center hover:shadow-lg transition-all duration-300 border-blue-100 dark:border-blue-900/20">
                    <CardContent className="p-6">
                      <motion.div
                        className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl flex items-center justify-center mx-auto mb-4"
                        whileHover={{ rotate: 10, scale: 1.1 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <span className="text-2xl">🔒</span>
                      </motion.div>
                      <h4 className="font-semibold mb-2">{t.secure}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {t.secureDescription}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div variants={cardVariants} whileHover="hover">
                  <Card className="text-center hover:shadow-lg transition-all duration-300 border-green-100 dark:border-green-900/20">
                    <CardContent className="p-6">
                      <motion.div
                        className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/20 dark:to-green-800/20 rounded-xl flex items-center justify-center mx-auto mb-4"
                        whileHover={{ rotate: -10, scale: 1.1 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <span className="text-2xl">⚡</span>
                      </motion.div>
                      <h4 className="font-semibold mb-2">{t.fast}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {t.fastDescription}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div variants={cardVariants} whileHover="hover">
                  <Card className="text-center hover:shadow-lg transition-all duration-300 border-purple-100 dark:border-purple-900/20">
                    <CardContent className="p-6">
                      <motion.div
                        className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl flex items-center justify-center mx-auto mb-4"
                        whileHover={{ rotate: 10, scale: 1.1 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <span className="text-2xl">💰</span>
                      </motion.div>
                      <h4 className="font-semibold mb-2">{t.rewarding}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {t.rewardingDescription}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* Information Sections */}
          <section className="py-16 bg-background">
            <div className="max-w-4xl mx-auto px-6 space-y-16">
              <TermsSection />
              <FAQSection />
            </div>
          </section>
        </main>
        <Footer />
      </div>{' '}
      {/* Close padding div */}
      {/* Toast Notifications */}
      <Toaster />
    </div>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <OnLoadModule />
      <ThemeProvider>
        <LanguageProvider>
          <WalletProvider>
            <Web3ModalProvider>
              <SignerProvider>
                <BalanceProvider>
                  <SolanaConnectProvider>
                    <SolanaJupiterProvider>
                      <SolanaSignerProvider>
                        <SolanaBalancesProvider>
                          <BridgeProvider>
                            <AppContent />
                          </BridgeProvider>
                        </SolanaBalancesProvider>
                      </SolanaSignerProvider>
                    </SolanaJupiterProvider>
                  </SolanaConnectProvider>
                </BalanceProvider>
              </SignerProvider>
            </Web3ModalProvider>
          </WalletProvider>
        </LanguageProvider>
      </ThemeProvider>
    </Provider>
  );
}
