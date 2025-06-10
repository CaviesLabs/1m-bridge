import { ArrowDown, DollarSign, Sparkles, Timer, TrendingUp, Users, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from './LanguageProvider';
import { Button } from './ui/button';

export function HeroSection() {
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
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  const floatingVariants = {
    float: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  const scrollToSection = () => {
    const bridgeSection = document.querySelector('main');
    if (bridgeSection) {
      bridgeSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Primary gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/30 to-pink-600/20" />

        {/* Animated gradient orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -40, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        />

        <motion.div
          className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 30, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 4,
          }}
        />

        {/* Floating particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
              backgroundSize: '50px 50px',
            }}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Campaign Badge */}
          <motion.div variants={itemVariants} className="flex justify-center">
            <motion.div
              variants={pulseVariants}
              animate="pulse"
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3"
            >
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-medium text-white/90">{t.activeCampaign}</span>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            </motion.div>
          </motion.div>

          {/* Main Headline */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">
              <span className="block bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                {t.bridgeAndEarn}
              </span>
            </h1>

            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-blue-100/80 max-w-3xl mx-auto leading-relaxed"
            >
              {t.bridgeDescription}
            </motion.p>
          </motion.div>

          {/* Campaign Amount with Animation */}
          <motion.div variants={itemVariants} className="space-y-4">
            <motion.div
              className="text-6xl md:text-8xl lg:text-9xl font-bold"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 bg-clip-text text-transparent">
                $1,000,000
              </span>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="text-lg md:text-xl text-white/70 font-medium"
            >
              Total Reward Pool Available
            </motion.div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6"
            >
              <motion.div variants={floatingVariants} animate="float">
                <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-3" />
              </motion.div>
              <div className="text-2xl font-bold text-white mb-2">15,432</div>
              <div className="text-sm text-white/60">Active Bridgers</div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6"
            >
              <motion.div variants={floatingVariants} animate="float" transition={{ delay: 0.5 }}>
                <DollarSign className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              </motion.div>
              <div className="text-2xl font-bold text-white mb-2">$45.2M</div>
              <div className="text-sm text-white/60">Total Bridged</div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6"
            >
              <motion.div variants={floatingVariants} animate="float" transition={{ delay: 1 }}>
                <Timer className="w-8 h-8 text-purple-400 mx-auto mb-3" />
              </motion.div>
              <div className="text-2xl font-bold text-white mb-2">87 days</div>
              <div className="text-sm text-white/60">Time Remaining</div>
            </motion.div>
          </motion.div>

          {/* CTA Section */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  onClick={scrollToSection}
                  className="h-14 px-8 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 shadow-2xl shadow-blue-500/25"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  {t.startBridgingNow}
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 px-8 text-lg bg-white/10 backdrop-blur-md border-2 border-white/30 text-white hover:bg-white/20 hover:border-white/40 transition-all duration-200 shadow-lg"
                >
                  <Users className="w-5 h-5 mr-2" />
                  {t.viewLeaderboard}
                </Button>
              </motion.div>
            </div>

            <motion.div variants={itemVariants} className="text-sm text-white/50">
              No registration required • Connect any wallet • Start earning instantly
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div variants={itemVariants} className="pt-8">
            <motion.button
              onClick={scrollToSection}
              className="mx-auto flex flex-col items-center gap-2 text-white/60 hover:text-white/80 transition-colors group"
              whileHover={{ y: -2 }}
            >
              <span className="text-sm">Explore Bridge</span>
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="group-hover:text-white/80"
              >
                <ArrowDown className="w-5 h-5" />
              </motion.div>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background/50 to-transparent" />
    </section>
  );
}
