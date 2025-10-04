# MonadPay - QR Code & Deeplink Crypto Payments

A complete merchant-to-mobile payment system for the Monad Testnet, featuring QR code generation and deeplink handling for seamless MON token transfers.

## 🏗️ Architecture

### Merchant Side (Web)
- **Framework**: Next.js 15 + TypeScript + Tailwind CSS
- **Blockchain**: wagmi + viem for wallet connection
- **QR Generation**: qrcode.react
- **APIs**: Next.js API routes for rate conversion and QR generation

### Mobile Side (Expo)
- **Framework**: Expo (React Native) + TypeScript
- **Blockchain**: ethers.js for Monad Testnet transactions
- **Deeplink**: React Native Linking for custom scheme handling
- **Navigation**: Expo Router

## 🌐 Network Configuration

**Monad Testnet**
- **Network Name**: Monad Testnet
- **RPC URL**: https://testnet-rpc.monad.xyz/
- **Chain ID**: 10143
- **Currency Symbol**: MON
- **Block Explorer**: https://testnet.monadexplorer.com/

## 🔗 Deeplink Format

```
monadpay://pay?to={address}&fiat_amount={usd}&fiat_currency=USD&rate_monad_per_usd={rate}&amount_mon={mon}&txn_id={uuid}&ts={iso}&exp=300&nonce={random}&sig={hmac}
```

### Parameters
- `to`: Target merchant wallet address
- `fiat_amount`: USD amount (e.g., "100")
- `fiat_currency`: Always "USD"
- `rate_monad_per_usd`: Exchange rate (e.g., "2.0")
- `amount_mon`: Calculated MON amount (e.g., "200")
- `txn_id`: Unique transaction identifier (UUID)
- `ts`: ISO timestamp
- `exp`: Expiry in seconds (300 = 5 minutes)
- `nonce`: Random nonce for security
- `sig`: HMAC signature over payload

## 🚀 Quick Start

### 1. Merchant Web App

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Edit .env.local with your configuration

# Run development server
npm run dev
```

**Environment Variables:**
```env
NEXT_PUBLIC_MERCHANT_WALLET_ADDRESS=0xYourWalletAddress
NEXT_PUBLIC_MONAD_RPC_URL=https://testnet-rpc.monad.xyz/
NEXT_PUBLIC_CHAIN_ID=10143
```

### 2. Mobile App

```bash
cd mobile-app/mobile-app

# Install dependencies
npm install

# Start Expo development server
npx expo start
```

## 📱 Usage Flow

### Merchant Side
1. **Connect Wallet**: Click "Connect Wallet" to link MetaMask
2. **Enter Amount**: Input USD amount (minimum $0.01)
3. **Convert**: Click "Convert to MON" to fetch exchange rate
4. **Generate QR**: Click "Generate Payment Link" to create deeplink
5. **Display QR**: QR code appears in right panel for customer scanning

### Customer Side (Mobile)
1. **Scan QR**: Use camera to scan QR code from merchant
2. **Review Payment**: App opens with pre-filled payment details
3. **Confirm**: Tap "Send Payment" to broadcast MON transfer
4. **Success**: View transaction hash and explorer link

## 🔧 API Endpoints

### GET /api/rate?pair=MONAD_USD
Returns current exchange rate with signature.

**Response:**
```json
{
  "rate_monad_per_usd": 2.0,
  "ts": "2025-10-04T12:34:56Z",
  "signature": "base64-hmac-signature"
}
```

### POST /api/qr
Generates payment deeplink and QR code.

**Request:**
```json
{
  "fiat_amount": 100,
  "fiat_currency": "USD",
  "rate_monad_per_usd": 2.0,
  "amount_mon": 200,
  "to": "0xMerchantAddress"
}
```

**Response:**
```json
{
  "deeplink": "monadpay://pay?...",
  "qrDataUrl": "data:image/png;base64...",
  "txn_id": "uuid",
  "ts": "2025-10-04T12:34:56Z",
  "exp": 300
}
```

## 🧪 Testing

### Test Deeplinks

**iOS Simulator:**
```bash
xcrun simctl openurl booted "monadpay://pay?to=0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6&fiat_amount=100&fiat_currency=USD&rate_monad_per_usd=2.0&amount_mon=200&txn_id=test123&ts=2025-10-04T12:34:56Z&exp=300&nonce=abc123&sig=test"
```

**Android Emulator:**
```bash
adb shell 'am start -W -a android.intent.action.VIEW -d "monadpay://pay?to=0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6&fiat_amount=100&fiat_currency=USD&rate_monad_per_usd=2.0&amount_mon=200&txn_id=test123&ts=2025-10-04T12:34:56Z&exp=300&nonce=abc123&sig=test"'
```

### Test Flow
1. Start merchant web app: `npm run dev`
2. Start mobile app: `cd mobile-app/mobile-app && npx expo start`
3. Connect wallet in web app
4. Generate payment request
5. Scan QR code with mobile app
6. Complete payment transaction

## 🔒 Security Features

- **HMAC Signatures**: All API responses include cryptographic signatures
- **Expiry Timestamps**: Payment requests expire after 5 minutes
- **Nonce Generation**: Random nonces prevent replay attacks
- **Parameter Validation**: Strict validation of all deeplink parameters
- **Network Verification**: Automatic network switching to Monad Testnet

## 📁 Project Structure

```
monadpay/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── rate/route.ts      # Exchange rate API
│   │   │   └── qr/route.ts        # QR generation API
│   │   ├── docs/page.tsx          # Documentation
│   │   ├── layout.tsx             # Root layout
│   │   └── page.tsx               # Main dashboard
│   ├── components/
│   │   ├── CreatePaymentRequest.tsx
│   │   └── providers.tsx
│   └── lib/
│       └── wagmi.ts               # Blockchain config
├── mobile-app/
│   ├── mobile-app/
│   │   ├── App.tsx                # Main app
│   │   ├── DeeplinkHandler.tsx    # Deeplink handling
│   │   ├── pay.tsx                # Payment screen
│   │   ├── types.ts               # TypeScript types
│   │   ├── network.ts             # Network config
│   │   └── app.json               # Expo config
└── README.md
```

## 🚀 Deployment

### Web App (Vercel)
1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables
4. Deploy automatically

### Mobile App (Expo)
1. Build for production: `npx expo build`
2. Submit to app stores via Expo Application Services (EAS)
3. Or use Expo Go for testing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.

## 🆘 Support

For questions or issues:
- Open an issue on GitHub
- Check the documentation at `/docs`
- Review the deeplink format specifications

---

**Built for the Monad ecosystem** 🚀