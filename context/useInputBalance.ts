import { AppNumber } from '@/lib/providers/math/app-number.provider';
import { useCallback, useState } from 'react';
import { useSingleBalance } from './BalanceProvider';

export const useInputBalance = (address: string, insufficientCheck = true) => {
  const balance = useSingleBalance(address);
  const [val, setVal] = useState(AppNumber.from(0));
  const [error, setError] = useState('');

  const onChange = useCallback(
    (data: AppNumber, cb?: Function) => {
      setVal(data);
      cb && cb();

      // Bypass the check if insufficientCheck is false
      if (!insufficientCheck) return;
      if (balance?.balance?.lt(data)) {
        setError('Insufficient balance');
      } else {
        setError('');
      }
    },
    [balance]
  );

  return {
    error,
    val,
    onChange,
  };
};
