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
        
        // Handle MetaMask deeplinks for native currency transfer
        if (parsed.scheme === 'https' && parsed.hostname === 'link.metamask.io' && parsed.pathname?.startsWith('/send/')) {
          // Extract recipient and chainId from path
          const pathParts = parsed.pathname.split('/');
          const recipientAndChain = pathParts[2]; // Format: recipient@chainId
          const [recipient, chainId] = recipientAndChain.split('@');
          
          // Extract value from query params
          const value = parsed.queryParams?.value as string || '0';
          
          // Convert wei to MON (18 decimals)
          const amountMon = (parseInt(value) / Math.pow(10, 18)).toString();
          
          const params: PaymentParams = {
            to: recipient,
            fiat_amount: '0', // Not available in MetaMask deeplink
            fiat_currency: 'USD',
            rate_monad_per_usd: '2.0', // Default rate
            amount_mon: amountMon,
            txn_id: Math.random().toString(36).substring(2, 15),
            ts: new Date().toISOString(),
            exp: '300',
            nonce: Math.random().toString(36).substring(2, 15),
            sig: ''
          };

          // Validate required parameters
          if (!params.to || !params.amount_mon) {
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
