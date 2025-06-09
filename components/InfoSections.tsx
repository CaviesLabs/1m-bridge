"use client";

import { ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useLanguage } from './LanguageProvider';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';

export function TermsSection() {
  const { t } = useLanguage();
  
  const terms = [
    t.rewardEligibility,
    t.campaignPeriod,
    t.rewardPool,
    t.minimumAmount,
    t.supportedNetworks,
    t.modifications
  ];

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">{t.termsAndConditions}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {terms.map((term, index) => (
            <li key={index} className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
              <span className="text-muted-foreground">{term}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

export function FAQSection() {
  const { t } = useLanguage();
  
  const faqs = [
    {
      question: t.faqQuestions.bridgeTime,
      answer: t.faqQuestions.bridgeTimeAnswer
    },
    {
      question: t.faqQuestions.fees,
      answer: t.faqQuestions.feesAnswer
    },
    {
      question: t.faqQuestions.safety,
      answer: t.faqQuestions.safetyAnswer
    },
    {
      question: t.faqQuestions.supportedTokens,
      answer: t.faqQuestions.supportedTokensAnswer
    },
    {
      question: t.faqQuestions.rewardCalculation,
      answer: t.faqQuestions.rewardCalculationAnswer
    },
    {
      question: t.faqQuestions.rewardDistribution,
      answer: t.faqQuestions.rewardDistributionAnswer
    },
    {
      question: t.faqQuestions.multipleBridges,
      answer: t.faqQuestions.multipleBridgesAnswer
    },
    {
      question: t.faqQuestions.failedTransaction,
      answer: t.faqQuestions.failedTransactionAnswer
    }
  ];

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">{t.faq}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {faqs.map((faq, index) => (
          <Collapsible key={index}>
            <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
              <span className="font-medium text-left">{faq.question}</span>
              <ChevronDown className="w-4 h-4 text-muted-foreground transition-transform duration-200 ui-open:rotate-180" />
            </CollapsibleTrigger>
            <AnimatePresence>
              <CollapsibleContent>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="p-4 text-muted-foreground"
                  >
                    {faq.answer}
                  </motion.div>
                </motion.div>
              </CollapsibleContent>
            </AnimatePresence>
          </Collapsible>
        ))}
      </CardContent>
    </Card>
  );
}