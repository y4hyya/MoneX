import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { DeeplinkHandler } from './DeeplinkHandler';
import { useRouter } from 'expo-router';

export default function App() {
  const router = useRouter();

  return (
    <DeeplinkHandler>
      <View style={styles.container}>
        <Text style={styles.title}>MonadPay Mobile</Text>
        <Text style={styles.subtitle}>Scan a QR code to make a payment</Text>
        
        <TouchableOpacity 
          style={styles.button}
          onPress={() => router.push('/pay')}
        >
          <Text style={styles.buttonText}>Test Pay Screen</Text>
        </TouchableOpacity>
        
        <StatusBar style="auto" />
      </View>
    </DeeplinkHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3b82f6',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
  },
  button: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
