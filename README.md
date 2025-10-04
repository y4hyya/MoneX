# MonadPay - QR Code & Deeplink Crypto Payments

A QR code and deeplink payment system for the Monad Testnet. Generate payment requests and accept crypto payments seamlessly using QR codes that open Monad wallets with pre-filled transaction details.

## Features

- 🎯 **Simple Payment Requests**: Enter USD amounts and generate QR codes instantly
- 📱 **Mobile-First**: QR codes open Monad wallets with pre-filled transactions
- 🔗 **Deeplink Integration**: Custom `monadpay://` scheme for seamless wallet integration
- 💰 **Real-time Pricing**: Automatic USD to MON conversion using CoinGecko API
- ⚡ **Instant Verification**: Real-time payment status checking
- 🌐 **Monad Testnet**: Built specifically for Monad Testnet (Chain ID: 10143)

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- A Monad Testnet wallet address

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd monadpay
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your merchant wallet address:
```env
NEXT_PUBLIC_MERCHANT_WALLET_ADDRESS=0xYourWalletAddress
NEXT_PUBLIC_MONAD_RPC_URL=https://testnet-rpc.monad.xyz/
NEXT_PUBLIC_CHAIN_ID=10143
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## How It Works

### For Merchants

1. **Enter Amount**: Input the USD amount you want to receive
2. **Generate QR**: Click "Generate Payment QR" to create a payment request
3. **Display QR**: Show the QR code to customers for scanning
4. **Receive Payment**: Payment status updates automatically when confirmed

### For Customers

1. **Scan QR**: Use your Monad wallet to scan the QR code
2. **Review Transaction**: Wallet opens with pre-filled payment details
3. **Confirm Payment**: Sign and send the transaction
4. **Payment Complete**: Merchant receives confirmation

## Deeplink Schema

MonadPay uses a custom URL scheme for wallet integration:

```
monadpay://pay?recipient={address}&amount={amount}&txnId={id}&currency={token}
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `recipient` | string | Yes | Merchant's wallet address (0x...) |
| `amount` | string | Yes | Amount to send (in token units) |
| `txnId` | string | Yes | Unique transaction identifier |
| `currency` | string | No | Token symbol (default: MON) |

### Example

```
monadpay://pay?recipient=0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6&amount=1.5&txnId=abc123&currency=MON
```

## Wallet Integration

To integrate MonadPay deeplinks into your wallet:

1. **Register URL Scheme**: Add `monadpay://` to your app's URL schemes
2. **Handle Deeplinks**: Listen for incoming deeplink events
3. **Parse Parameters**: Extract payment details from the URL
4. **Pre-fill Transaction**: Use parameters to populate transaction form

See the [Documentation](/docs) for detailed integration examples.

## API Endpoints

### Create Payment Request
```
POST /api/create-payment-request
Content-Type: application/json

{
  "amountUSD": 10.50
}
```

**Response:**
```json
{
  "recipient": "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6",
  "amountMON": "1.234567",
  "amountUSD": 10.50,
  "txnId": "uuid-1234",
  "timestamp": 1640995200000,
  "priceUSD": 8.50
}
```

### Verify Payment
```
POST /api/verify-payment
Content-Type: application/json

{
  "txHash": "0x...",
  "expectedAmount": "1.234567",
  "expectedRecipient": "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6"
}
```

**Response:**
```json
{
  "status": "confirmed",
  "transaction": {
    "hash": "0x...",
    "from": "0x...",
    "to": "0x...",
    "value": "1234567000000000000",
    "blockNumber": 12345,
    "gasUsed": "21000"
  }
}
```

## Monad Testnet Information

- **Network Name**: Monad Testnet
- **Chain ID**: 10143
- **RPC URL**: https://testnet-rpc.monad.xyz/
- **Explorer**: https://testnet.monadexplorer.com/
- **Currency**: MON (18 decimals)

## Development

### Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── create-payment-request/
│   │   └── verify-payment/
│   ├── docs/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   └── providers.tsx
└── lib/
    └── wagmi.ts
```

### Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Blockchain**: wagmi + viem
- **QR Codes**: qrcode.react
- **State Management**: React Query

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically

### Manual Deployment

```bash
npm run build
npm start
```

## Testing

### Test Deeplinks

**iOS Simulator:**
```bash
xcrun simctl openurl booted "monadpay://pay?recipient=0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6&amount=1.5&txnId=test123"
```

**Android Emulator:**
```bash
adb shell 'am start -W -a android.intent.action.VIEW -d "monadpay://pay?recipient=0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6&amount=1.5&txnId=test123"'
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Support

For questions or support, please open an issue on GitHub or contact the development team.

---

Built with ❤️ for the Monad ecosystem