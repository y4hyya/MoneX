import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator,
  Linking,
} from 'react-native';
import { ethers } from 'ethers';
import { PaymentParams } from './types';
import { MONAD_TESTNET } from './network';

export default function PayScreen() {
  const [paymentParams, setPaymentParams] = useState<PaymentParams | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Get payment params from global storage
    const params = (global as any).paymentParams;
    if (params) {
      setPaymentParams(params);
    } else {
      setError('No payment parameters found');
    }
  }, []);

  const handleSendPayment = async () => {
    if (!paymentParams) return;

    setIsLoading(true);
    setError(null);

    try {
      // Check if MetaMask is available
      if (!window.ethereum) {
        throw new Error('MetaMask not found. Please install MetaMask.');
      }

      // Request account access
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      // Create provider and signer
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // Check if we're on the correct network
      const network = await provider.getNetwork();
      if (Number(network.chainId) !== MONAD_TESTNET.chainId) {
        // Request to switch to Monad Testnet
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: `0x${MONAD_TESTNET.chainId.toString(16)}` }],
        });
      }

      // Convert amount to wei
      const amountWei = ethers.parseEther(paymentParams.amount_mon);

      // Create transaction
      const tx = {
        to: paymentParams.to,
        value: amountWei,
        gasLimit: 21000, // Standard gas limit for simple transfer
      };

      // Send transaction
      const transaction = await signer.sendTransaction(tx);
      setTxHash(transaction.hash);

      // Wait for confirmation
      const receipt = await transaction.wait();
      
      if (receipt.status === 1) {
        Alert.alert(
          'Payment Successful!',
          `Transaction confirmed: ${transaction.hash}`,
          [
            {
              text: 'View on Explorer',
              onPress: () => {
                const explorerUrl = `${MONAD_TESTNET.blockExplorer}/tx/${transaction.hash}`;
                Linking.openURL(explorerUrl);
              }
            },
            { text: 'OK' }
          ]
        );
      } else {
        throw new Error('Transaction failed');
      }

    } catch (err: any) {
      console.error('Payment error:', err);
      setError(err.message || 'Payment failed');
    } finally {
      setIsLoading(false);
    }
  };

  const openExplorer = () => {
    if (txHash) {
      const explorerUrl = `${MONAD_TESTNET.blockExplorer}/tx/${txHash}`;
      Linking.openURL(explorerUrl);
    }
  };

  if (!paymentParams) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No payment parameters found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>MonadPay</Text>
        <Text style={styles.subtitle}>Send MON Payment</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Payment Details</Text>
        
        <View style={styles.detailRow}>
          <Text style={styles.label}>Network:</Text>
          <Text style={styles.value}>{MONAD_TESTNET.name}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Recipient:</Text>
          <Text style={styles.value} numberOfLines={1}>
            {paymentParams.to}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Amount (MON):</Text>
          <Text style={styles.value}>{paymentParams.amount_mon}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>USD Amount:</Text>
          <Text style={styles.value}>${paymentParams.fiat_amount}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Rate:</Text>
          <Text style={styles.value}>{paymentParams.rate_monad_per_usd} MON per $1</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Transaction ID:</Text>
          <Text style={styles.value} numberOfLines={1}>
            {paymentParams.txn_id}
          </Text>
        </View>
      </View>

      {error && (
        <View style={styles.errorCard}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {txHash && (
        <View style={styles.successCard}>
          <Text style={styles.successTitle}>Payment Successful!</Text>
          <Text style={styles.txHash} numberOfLines={1}>
            {txHash}
          </Text>
          <TouchableOpacity style={styles.explorerButton} onPress={openExplorer}>
            <Text style={styles.explorerButtonText}>View on Explorer</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity
        style={[styles.sendButton, isLoading && styles.sendButtonDisabled]}
        onPress={handleSendPayment}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.sendButtonText}>Send Payment</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#3b82f6',
    padding: 20,
    paddingTop: 60,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    marginTop: 4,
  },
  card: {
    backgroundColor: 'white',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  value: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
    flex: 2,
    textAlign: 'right',
  },
  errorCard: {
    backgroundColor: '#fee2e2',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#fecaca',
  },
  errorText: {
    color: '#dc2626',
    fontSize: 14,
  },
  successCard: {
    backgroundColor: '#d1fae5',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#a7f3d0',
  },
  successTitle: {
    color: '#065f46',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  txHash: {
    color: '#047857',
    fontSize: 12,
    fontFamily: 'monospace',
    marginBottom: 8,
  },
  explorerButton: {
    backgroundColor: '#059669',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  explorerButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  sendButton: {
    backgroundColor: '#3b82f6',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#9ca3af',
  },
  sendButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
