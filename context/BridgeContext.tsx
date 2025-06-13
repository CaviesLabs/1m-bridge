'use client';

import React, { createContext, useCallback, useContext, useState } from 'react';

export type BridgeStep = 'connect' | 'bridge' | 'signing' | 'claim' | 'completed';

interface BridgeContextType {
  currentStep: BridgeStep;
  isWalletConnected: boolean;
  isSigning: boolean;
  isCompleted: boolean;
  connectWallet: () => void;
  startBridge: () => void;
  claimTokens: () => void;
  reset: () => void;
}

const BridgeContext = createContext<BridgeContextType | undefined>(undefined);

export function BridgeProvider({ children }: { children: React.ReactNode }) {
  const [currentStep, setCurrentStep] = useState<BridgeStep>('connect');
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [isSigning, setIsSigning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const connectWallet = useCallback(() => {
    setIsWalletConnected(true);
    setCurrentStep('bridge');
  }, []);

  const startBridge = useCallback(async () => {
    setCurrentStep('signing');
    setIsSigning(true);

    // Simulate transaction signing delay
    setTimeout(() => {
      setIsSigning(false);
      setCurrentStep('claim');
    }, 2000);
  }, []);

  const claimTokens = useCallback(() => {
    setCurrentStep('completed');
    setIsCompleted(true);
  }, []);

  const reset = useCallback(() => {
    setCurrentStep('connect');
    setIsWalletConnected(false);
    setIsSigning(false);
    setIsCompleted(false);
  }, []);

  return (
    <BridgeContext.Provider
      value={{
        currentStep,
        isWalletConnected,
        isSigning,
        isCompleted,
        connectWallet,
        startBridge,
        claimTokens,
        reset,
      }}
    >
      {children}
    </BridgeContext.Provider>
  );
}

export function useBridge() {
  const context = useContext(BridgeContext);
  if (context === undefined) {
    throw new Error('useBridge must be used within a BridgeProvider');
  }
  return context;
}
