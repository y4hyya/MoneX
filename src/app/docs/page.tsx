export default function DocsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              MoneX Documentation
            </h1>
            <p className="text-xl text-gray-700 font-medium">
              Deeplink Schema & Integration Guide
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-10 border border-gray-200">
            {/* Deeplink Schema */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-3">
                Deeplink Schema
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                MoneX uses a custom URL scheme to enable seamless integration with Monad wallets. 
                The deeplink format allows wallets to pre-fill transaction details for easy payments.
              </p>
              
              <div className="bg-gray-900 rounded-xl p-6 mb-6 border border-gray-300">
                <code className="text-lg font-mono text-green-400 leading-relaxed">
                  monex://pay?recipient=&#123;address&#125;&amount=&#123;amount&#125;&txnId=&#123;id&#125;&currency=&#123;token&#125;
                </code>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-4">Parameters</h3>
              <div className="overflow-x-auto rounded-xl border border-gray-300">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border-b border-gray-300 px-6 py-4 text-left font-bold text-gray-900">Parameter</th>
                      <th className="border-b border-gray-300 px-6 py-4 text-left font-bold text-gray-900">Type</th>
                      <th className="border-b border-gray-300 px-6 py-4 text-left font-bold text-gray-900">Required</th>
                      <th className="border-b border-gray-300 px-6 py-4 text-left font-bold text-gray-900">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-gray-50">
                      <td className="border-b border-gray-200 px-6 py-4 font-mono text-blue-600 font-semibold">recipient</td>
                      <td className="border-b border-gray-200 px-6 py-4 text-gray-700">string</td>
                      <td className="border-b border-gray-200 px-6 py-4"><span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm font-medium">Yes</span></td>
                      <td className="border-b border-gray-200 px-6 py-4 text-gray-700">Merchant's wallet address (0x...)</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border-b border-gray-200 px-6 py-4 font-mono text-blue-600 font-semibold">amount</td>
                      <td className="border-b border-gray-200 px-6 py-4 text-gray-700">string</td>
                      <td className="border-b border-gray-200 px-6 py-4"><span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm font-medium">Yes</span></td>
                      <td className="border-b border-gray-200 px-6 py-4 text-gray-700">Amount to send (in token units)</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border-b border-gray-200 px-6 py-4 font-mono text-blue-600 font-semibold">txnId</td>
                      <td className="border-b border-gray-200 px-6 py-4 text-gray-700">string</td>
                      <td className="border-b border-gray-200 px-6 py-4"><span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm font-medium">Yes</span></td>
                      <td className="border-b border-gray-200 px-6 py-4 text-gray-700">Unique transaction identifier</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border-b border-gray-200 px-6 py-4 font-mono text-blue-600 font-semibold">currency</td>
                      <td className="border-b border-gray-200 px-6 py-4 text-gray-700">string</td>
                      <td className="border-b border-gray-200 px-6 py-4"><span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-sm font-medium">No</span></td>
                      <td className="border-b border-gray-200 px-6 py-4 text-gray-700">Token symbol (default: MON)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Example Usage */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-3">
                Example Usage
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Basic Payment</h3>
                  <div className="bg-gray-900 rounded-xl p-6 border border-gray-300">
                    <code className="text-sm font-mono text-green-400 leading-relaxed">
                      monex://pay?recipient=0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6&amount=1.5&txnId=abc123
                    </code>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Payment with Currency</h3>
                  <div className="bg-gray-900 rounded-xl p-6 border border-gray-300">
                    <code className="text-sm font-mono text-green-400 leading-relaxed">
                      monex://pay?recipient=0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6&amount=100&txnId=def456&currency=USDC
                    </code>
                  </div>
                </div>
              </div>
            </section>

            {/* Wallet Integration */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-3">
                Wallet Integration
              </h2>
              
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                To integrate MoneX deeplinks into your wallet application, follow these steps:
              </p>

              <div className="space-y-6">
                <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                  <h3 className="text-xl font-bold text-blue-900 mb-3">1. Register URL Scheme</h3>
                  <p className="text-blue-800 mb-3 leading-relaxed">
                    Register the <code className="bg-blue-200 px-2 py-1 rounded font-mono text-blue-900">monex://</code> scheme in your app configuration.
                  </p>
                  <div className="bg-gray-900 rounded-lg p-4 text-sm font-mono text-green-400">
                    <div>// iOS (Info.plist)</div>
                    <div>&lt;key&gt;CFBundleURLSchemes&lt;/key&gt;</div>
                    <div>&lt;array&gt;</div>
                    <div>&nbsp;&nbsp;&lt;string&gt;monex&lt;/string&gt;</div>
                    <div>&lt;/array&gt;</div>
                  </div>
                </div>

                <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                  <h3 className="text-xl font-bold text-green-900 mb-3">2. Handle Deeplink Events</h3>
                  <p className="text-green-800 mb-3 leading-relaxed">
                    Listen for incoming deeplink events and parse the parameters.
                  </p>
                  <div className="bg-gray-900 rounded-lg p-4 text-sm font-mono text-green-400">
                    <div>// React Native example</div>
                    <div>import &#123; Linking &#125; from 'react-native';</div>
                    <div></div>
                    <div>const handleDeeplink = (url) =&gt; &#123;</div>
                    <div>&nbsp;&nbsp;if (url.startsWith('monex://pay')) &#123;</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;const params = parsePaymentParams(url);</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;openPaymentScreen(params);</div>
                    <div>&nbsp;&nbsp;&#125;</div>
                    <div>&#125;;</div>
                  </div>
                </div>

                <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                  <h3 className="text-xl font-bold text-purple-900 mb-3">3. Pre-fill Transaction</h3>
                  <p className="text-purple-800 mb-3 leading-relaxed">
                    Use the parsed parameters to pre-fill the transaction form in your wallet.
                  </p>
                  <div className="bg-gray-900 rounded-lg p-4 text-sm font-mono text-green-400">
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
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-3">
                Testing Deeplinks
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">iOS Simulator</h3>
                  <div className="bg-gray-900 rounded-xl p-6 border border-gray-300">
                    <code className="text-sm font-mono text-green-400 leading-relaxed">
                      xcrun simctl openurl booted "monex://pay?recipient=0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6&amount=1.5&txnId=test123"
                    </code>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Android Emulator</h3>
                  <div className="bg-gray-900 rounded-xl p-6 border border-gray-300">
                    <code className="text-sm font-mono text-green-400 leading-relaxed">
                      adb shell 'am start -W -a android.intent.action.VIEW -d "monex://pay?recipient=0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6&amount=1.5&txnId=test123"'
                    </code>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Physical Device</h3>
                  <p className="text-gray-700 mb-3 leading-relaxed">
                    Create an HTML page with a link to test on physical devices:
                  </p>
                  <div className="bg-gray-900 rounded-xl p-6 border border-gray-300">
                    <code className="text-sm font-mono text-green-400 leading-relaxed">
                      &lt;a href="monex://pay?recipient=0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6&amount=1.5&txnId=test123"&gt;Test Payment&lt;/a&gt;
                    </code>
                  </div>
                </div>
              </div>
            </section>

            {/* Network Information */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-3">
                Monad Testnet Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Network Details</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between"><span className="font-semibold text-gray-700">Name:</span> <span className="text-gray-600">Monad Testnet</span></div>
                    <div className="flex justify-between"><span className="font-semibold text-gray-700">Chain ID:</span> <span className="text-gray-600 font-mono">10143</span></div>
                    <div className="flex justify-between"><span className="font-semibold text-gray-700">RPC URL:</span> <span className="text-gray-600 font-mono text-xs">https://testnet-rpc.monad.xyz/</span></div>
                    <div className="flex justify-between"><span className="font-semibold text-gray-700">Explorer:</span> <span className="text-gray-600 font-mono text-xs">https://testnet.monadexplorer.com/</span></div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Supported Tokens</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between"><span className="font-semibold text-gray-700">MON:</span> <span className="text-gray-600">Native token (18 decimals)</span></div>
                    <div className="flex justify-between"><span className="font-semibold text-gray-700">USDC:</span> <span className="text-gray-600">ERC-20 token (6 decimals)</span></div>
                    <div className="flex justify-between"><span className="font-semibold text-gray-700">WMON:</span> <span className="text-gray-600">Wrapped MON (18 decimals)</span></div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Back to Dashboard */}
          <div className="text-center mt-12">
            <a
              href="/"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-xl transition duration-200 shadow-lg hover:shadow-xl"
            >
              ← Back to Dashboard
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
