import { AlertCircle, ArrowRight, CheckCircle, Clock, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { BridgeStep } from '../components/useBridge';
import { useLanguage } from './LanguageProvider';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';

export const BridgeStepCards = ({
  currentStep,
  isCompleted,
}: {
  currentStep: BridgeStep;
  isCompleted: boolean;
}) => {
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

  const arrowVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: 0.4,
        ease: 'easeOut',
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

  // Determine step 1 state
  const getStep1State = () => {
    if (isCompleted || currentStep === 'claim' || currentStep === 'signing') {
      return {
        badgeVariant: 'default' as const,
        badgeColor:
          'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 dark:from-green-900/30 dark:to-emerald-900/30 dark:text-green-400 border-green-200 dark:border-green-700',
        cardBorder: 'border-2 border-green-200 dark:border-green-800',
        numberBg: 'bg-gradient-to-br from-green-400 to-emerald-500',
        icon: <CheckCircle className="w-3 h-3 mr-1" />,
        status: t.completed,
        shouldPulse: false,
      };
    } else if (currentStep === 'bridge' || currentStep === 'connect') {
      return {
        badgeVariant: 'default' as const,
        badgeColor:
          'bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 dark:from-yellow-900/30 dark:to-orange-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-700',
        cardBorder:
          'border-2 border-transparent bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50',
        numberBg: 'bg-gradient-to-br from-yellow-400 to-orange-500',
        icon: <Zap className="w-3 h-3 mr-1" />,
        status: t.active,
        shouldPulse: true,
      };
    }

    return {
      badgeVariant: 'outline' as const,
      badgeColor: 'border-muted-foreground/30 text-muted-foreground',
      cardBorder: 'border-2 border-dashed border-muted-foreground/20',
      numberBg: 'bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700',
      icon: <Clock className="w-3 h-3 mr-1" />,
      status: t.pending,
      shouldPulse: false,
    };
  };

  // Determine step 2 state
  const getStep2State = () => {
    if (isCompleted) {
      return {
        badgeVariant: 'default' as const,
        badgeColor:
          'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 dark:from-green-900/30 dark:to-emerald-900/30 dark:text-green-400 border-green-200 dark:border-green-700',
        cardBorder: 'border-2 border-green-200 dark:border-green-800',
        numberBg: 'bg-gradient-to-br from-green-400 to-emerald-500',
        icon: <CheckCircle className="w-3 h-3 mr-1" />,
        status: t.completed,
        shouldPulse: false,
      };
    } else if (currentStep === 'claim') {
      return {
        badgeVariant: 'default' as const,
        badgeColor:
          'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 dark:from-purple-900/30 dark:to-pink-900/30 dark:text-purple-400 border-purple-200 dark:border-purple-700',
        cardBorder: 'border-2 border-purple-200 dark:border-purple-800',
        numberBg: 'bg-gradient-to-br from-purple-400 to-pink-500',
        icon: <AlertCircle className="w-3 h-3 mr-1" />,
        status: t.readyToClaim,
        shouldPulse: true,
      };
    } else if (currentStep === 'signing') {
      return {
        badgeVariant: 'default' as const,
        badgeColor:
          'bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 dark:from-yellow-900/30 dark:to-orange-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-700',
        cardBorder: 'border-2 border-yellow-200 dark:border-yellow-800',
        numberBg: 'bg-gradient-to-br from-yellow-400 to-orange-500',
        icon: <Clock className="w-3 h-3 mr-1" />,
        status: t.pending,
        shouldPulse: true,
      };
    }

    return {
      badgeVariant: 'outline' as const,
      badgeColor: 'border-muted-foreground/30 text-muted-foreground',
      cardBorder: 'border-2 border-dashed border-muted-foreground/20',
      numberBg: 'bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700',
      icon: <Clock className="w-3 h-3 mr-1" />,
      status: t.pending,
      shouldPulse: false,
    };
  };

  const step1State = getStep1State();
  const step2State = getStep2State();

  return (
    <motion.div
      className="grid lg:grid-cols-3 gap-8 items-center mb-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={containerVariants}
    >
      {/* Step 1 Card */}
      <motion.div variants={cardVariants} whileHover="hover" className="relative">
        <Card
          className={`relative overflow-hidden ${step1State.cardBorder} shadow-lg hover:shadow-xl transition-all duration-300`}
        >
          {step1State.cardBorder.includes('gradient') && (
            <>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 rounded-lg opacity-20" />
              <div className="absolute inset-[2px] bg-card rounded-lg" />
            </>
          )}

          <CardContent className="relative p-8 text-center">
            <motion.div
              className={`w-20 h-20 ${step1State.numberBg} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}
              variants={step1State.shouldPulse ? pulseVariants : {}}
              animate={step1State.shouldPulse ? 'pulse' : ''}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <span className="text-2xl font-bold text-white">1</span>
            </motion.div>

            <motion.h3
              className="text-xl font-semibold mb-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {t.sendTokens}
            </motion.h3>

            <motion.p
              className="text-muted-foreground mb-4 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {t.sendTokensDescription}
            </motion.p>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
            >
              <Badge className={`${step1State.badgeColor} px-4 py-1 font-medium`}>
                {step1State.icon}
                {step1State.status}
              </Badge>
            </motion.div>
          </CardContent>

          {step1State.shouldPulse && (
            <motion.div
              className="absolute top-4 right-4 text-yellow-500"
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <Zap className="w-6 h-6" />
            </motion.div>
          )}
        </Card>
      </motion.div>

      {/* Enhanced Animated Arrow */}
      <motion.div className="flex justify-center relative" variants={arrowVariants}>
        <div className="relative">
          <motion.div
            className="absolute inset-0 flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <motion.div
              className="h-0.5 bg-gradient-to-r from-yellow-400 to-gray-400 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: currentStep !== 'connect' ? '100%' : '50%' }}
              transition={{
                duration: 2,
                delay: 0.8,
                ease: 'easeInOut',
              }}
              style={{ width: '120px' }}
            />
          </motion.div>

          <motion.div
            className="flex items-center gap-3 bg-muted/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg border border-border/50"
            whileHover={{ scale: 1.05 }}
            animate={{
              x: [0, 5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <div className="h-px bg-border flex-1 w-6" />
            <ArrowRight className="w-5 h-5 text-muted-foreground" />
            <div className="h-px bg-border flex-1 w-6" />
          </motion.div>
        </div>
      </motion.div>

      {/* Step 2 Card */}
      <motion.div variants={cardVariants} whileHover="hover" className="relative">
        <Card
          className={`relative overflow-hidden ${step2State.cardBorder} shadow-lg hover:shadow-xl transition-all duration-300`}
        >
          <CardContent className="relative p-8 text-center">
            <motion.div
              className={`w-20 h-20 ${step2State.numberBg} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}
              variants={step2State.shouldPulse ? pulseVariants : {}}
              animate={step2State.shouldPulse ? 'pulse' : ''}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <span className="text-2xl font-bold text-white">2</span>
            </motion.div>

            <motion.h3
              className="text-xl font-semibold mb-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {t.claimTokens}
            </motion.h3>

            <motion.p
              className="text-muted-foreground mb-4 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {t.claimTokensDescription}
            </motion.p>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
            >
              <Badge className={`${step2State.badgeColor} px-4 py-1 font-medium`}>
                {step2State.icon}
                {step2State.status}
              </Badge>
            </motion.div>
          </CardContent>

          {currentStep === 'signing' && (
            <div className="absolute top-4 right-4">
              <motion.div
                className="flex gap-1"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <div className="w-2 h-2 bg-muted-foreground rounded-full" />
                <div
                  className="w-2 h-2 bg-muted-foreground rounded-full"
                  style={{ animationDelay: '0.2s' }}
                />
                <div
                  className="w-2 h-2 bg-muted-foreground rounded-full"
                  style={{ animationDelay: '0.4s' }}
                />
              </motion.div>
            </div>
          )}
        </Card>
      </motion.div>
    </motion.div>
  );
};
