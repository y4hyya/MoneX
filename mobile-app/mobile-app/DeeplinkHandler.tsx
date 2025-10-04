import React, { useEffect } from 'react';
import { Linking } from 'react-native';
import { useRouter } from 'expo-router';
import { PaymentParams } from './types';

interface DeeplinkHandlerProps {
  children: React.ReactNode;
}

export function DeeplinkHandler({ children }: DeeplinkHandlerProps) {
  const router = useRouter();

  useEffect(() => {
    const handleDeeplink = (url: string) => {
      console.log('Received deeplink:', url);
      
      try {
        const parsed = Linking.parse(url);
        
        if (parsed.scheme === 'monadpay' && parsed.hostname === 'pay') {
          const params: PaymentParams = {
            to: parsed.queryParams?.to as string || '',
            fiat_amount: parsed.queryParams?.fiat_amount as string || '',
            fiat_currency: parsed.queryParams?.fiat_currency as string || '',
            rate_monad_per_usd: parsed.queryParams?.rate_monad_per_usd as string || '',
            amount_mon: parsed.queryParams?.amount_mon as string || '',
            txn_id: parsed.queryParams?.txn_id as string || '',
            ts: parsed.queryParams?.ts as string || '',
            exp: parsed.queryParams?.exp as string || '',
            nonce: parsed.queryParams?.nonce as string || '',
            sig: parsed.queryParams?.sig as string || ''
          };

          // Validate required parameters
          if (!params.to || !params.amount_mon || !params.txn_id) {
            console.error('Missing required payment parameters');
            return;
          }

          // Store payment params globally for the Pay screen
          (global as any).paymentParams = params;
          
          // Navigate to Pay screen
          router.push('/pay');
        }
      } catch (error) {
        console.error('Error parsing deeplink:', error);
      }
    };

    // Handle initial URL
    Linking.getInitialURL().then(url => {
      if (url) {
        handleDeeplink(url);
      }
    });

    // Create event listener for URL changes
    const subscription = Linking.addEventListener('url', event => {
      handleDeeplink(event.url);
    });

    return () => subscription?.remove();
  }, [router]);

  return <>{children}</>;
}
