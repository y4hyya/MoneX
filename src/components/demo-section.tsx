"use client"

export default function DemoSection() {
  return (
    <div className="w-full max-w-5xl mx-auto border rounded-lg shadow-sm overflow-hidden">
      <div className="p-8 text-center">
        <h3 className="text-2xl font-bold mb-4">Interactive Demo</h3>
        <p className="text-muted-foreground mb-6">
          Experience the power of our AI platform with this interactive demonstration.
        </p>
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg">
          <h4 className="text-xl font-semibold mb-2">Try MonadPay</h4>
          <p className="mb-4">Generate QR codes and accept crypto payments on Monad Testnet</p>
          <a 
            href="/app" 
            className="inline-block bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Launch Demo
          </a>
        </div>
      </div>
    </div>
  )
}
