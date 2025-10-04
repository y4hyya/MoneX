export default function DocsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              MonadPay Documentation
            </h1>
            <p className="text-xl text-gray-600">
              Deeplink Schema & Integration Guide
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            {/* Deeplink Schema */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Deeplink Schema
              </h2>
              <p className="text-gray-600 mb-4">
                MonadPay uses a custom URL scheme to enable seamless integration with Monad wallets. 
                The deeplink format allows wallets to pre-fill transaction details for easy payments.
              </p>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <code className="text-lg font-mono text-blue-600">
                  monadpay://pay?recipient={address}&amount={amount}&txnId={id}&currency={token}
                </code>
              </div>

              <h3 className="text-lg font-semibold text-gray-800 mb-3">Parameters</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2 text-left">Parameter</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Type</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Required</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-mono">recipient</td>
                      <td className="border border-gray-300 px-4 py-2">string</td>
                      <td className="border border-gray-300 px-4 py-2">Yes</td>
                      <td className="border border-gray-300 px-4 py-2">Merchant's wallet address (0x...)</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-mono">amount</td>
                      <td className="border border-gray-300 px-4 py-2">string</td>
                      <td className="border border-gray-300 px-4 py-2">Yes</td>
                      <td className="border border-gray-300 px-4 py-2">Amount to send (in token units)</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-mono">txnId</td>
                      <td className="border border-gray-300 px-4 py-2">string</td>
                      <td className="border border-gray-300 px-4 py-2">Yes</td>
                      <td className="border border-gray-300 px-4 py-2">Unique transaction identifier</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-mono">currency</td>
                      <td className="border border-gray-300 px-4 py-2">string</td>
                      <td className="border border-gray-300 px-4 py-2">No</td>
                      <td className="border border-gray-300 px-4 py-2">Token symbol (default: MON)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Example Usage */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Example Usage
              </h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Basic Payment</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <code className="text-sm font-mono text-blue-600">
                      monadpay://pay?recipient=0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6&amount=1.5&txnId=abc123
                    </code>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Payment with Currency</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <code className="text-sm font-mono text-blue-600">
                      monadpay://pay?recipient=0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6&amount=100&txnId=def456&currency=USDC
                    </code>
                  </div>
                </div>
              </div>
            </section>

            {/* Wallet Integration */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Wallet Integration
              </h2>
              
              <p className="text-gray-600 mb-4">
                To integrate MonadPay deeplinks into your wallet application, follow these steps:
              </p>

              <div className="space-y-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">1. Register URL Scheme</h3>
                  <p className="text-blue-800 text-sm mb-2">
                    Register the <code className="bg-blue-200 px-1 rounded">monadpay://</code> scheme in your app configuration.
                  </p>
                  <div className="bg-white rounded p-3 text-xs font-mono">
                    <div>// iOS (Info.plist)</div>
                    <div>&lt;key&gt;CFBundleURLSchemes&lt;/key&gt;</div>
                    <div>&lt;array&gt;</div>
                    <div>&nbsp;&nbsp;&lt;string&gt;monadpay&lt;/string&gt;</div>
                    <div>&lt;/array&gt;</div>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-green-900 mb-2">2. Handle Deeplink Events</h3>
                  <p className="text-green-800 text-sm mb-2">
                    Listen for incoming deeplink events and parse the parameters.
                  </p>
                  <div className="bg-white rounded p-3 text-xs font-mono">
                    <div>// React Native example</div>
                    <div>import &#123; Linking &#125; from 'react-native';</div>
                    <div></div>
                    <div>const handleDeeplink = (url) =&gt; &#123;</div>
                    <div>&nbsp;&nbsp;if (url.startsWith('monadpay://pay')) &#123;</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;const params = parsePaymentParams(url);</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;openPaymentScreen(params);</div>
                    <div>&nbsp;&nbsp;&#125;</div>
                    <div>&#125;;</div>
                  </div>
                </div>

                <div className="bg-purple-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-purple-900 mb-2">3. Pre-fill Transaction</h3>
                  <p className="text-purple-800 text-sm mb-2">
                    Use the parsed parameters to pre-fill the transaction form in your wallet.
                  </p>
                  <div className="bg-white rounded p-3 text-xs font-mono">
                    <div>// Example transaction object</div>
                    <div>const transaction = &#123;</div>
                    <div>&nbsp;&nbsp;to: params.recipient,</div>
                    <div>&nbsp;&nbsp;value: parseEther(params.amount),</div>
                    <div>&nbsp;&nbsp;currency: params.currency || 'MON'</div>
                    <div>&#125;;</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Testing */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Testing Deeplinks
              </h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">iOS Simulator</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <code className="text-sm font-mono text-blue-600">
                      xcrun simctl openurl booted "monadpay://pay?recipient=0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6&amount=1.5&txnId=test123"
                    </code>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Android Emulator</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <code className="text-sm font-mono text-blue-600">
                      adb shell 'am start -W -a android.intent.action.VIEW -d "monadpay://pay?recipient=0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6&amount=1.5&txnId=test123"'
                    </code>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Physical Device</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    Create an HTML page with a link to test on physical devices:
                  </p>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <code className="text-sm font-mono text-blue-600">
                      &lt;a href="monadpay://pay?recipient=0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6&amount=1.5&txnId=test123"&gt;Test Payment&lt;/a&gt;
                    </code>
                  </div>
                </div>
              </div>
            </section>

            {/* Network Information */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Monad Testnet Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-700 mb-2">Network Details</h3>
                  <div className="space-y-1 text-sm">
                    <div><span className="font-medium">Name:</span> Monad Testnet</div>
                    <div><span className="font-medium">Chain ID:</span> 10143</div>
                    <div><span className="font-medium">RPC URL:</span> https://testnet-rpc.monad.xyz/</div>
                    <div><span className="font-medium">Explorer:</span> https://testnet.monadexplorer.com/</div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-700 mb-2">Supported Tokens</h3>
                  <div className="space-y-1 text-sm">
                    <div><span className="font-medium">MON:</span> Native token (18 decimals)</div>
                    <div><span className="font-medium">USDC:</span> ERC-20 token (6 decimals)</div>
                    <div><span className="font-medium">WMON:</span> Wrapped MON (18 decimals)</div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Back to Dashboard */}
          <div className="text-center mt-8">
            <a
              href="/"
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200"
            >
              ← Back to Dashboard
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
