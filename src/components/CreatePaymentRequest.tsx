'use client'

import { useState } from 'react'
import { QRCodeCanvas } from 'qrcode.react'

interface RateData {
  pair: string
  rate: number
  timestamp: number
}

interface QRData {
  deeplink: string
  qrText: string
  txnId: string
  recipient: string
  amount: number
  currency: string
  usdAmount: number
  rate: number
  timestamp: number
}

export default function CreatePaymentRequest() {
  const [usdAmount, setUsdAmount] = useState<string>('')
  const [monAmount, setMonAmount] = useState<number | null>(null)
  const [rate, setRate] = useState<number | null>(null)
  const [qrData, setQrData] = useState<QRData | null>(null)
  
  const [isConverting, setIsConverting] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleConvert = async () => {
    if (!usdAmount || parseFloat(usdAmount) <= 0) {
      setError('Please enter a valid USD amount')
      return
    }

    setIsConverting(true)
    setError(null)

    try {
      const response = await fetch('/api/rate?pair=MONAD_USD')
      
      if (!response.ok) {
        throw new Error('Failed to fetch exchange rate')
      }

      const rateData: RateData = await response.json()
      setRate(rateData.rate)
      
      const calculatedMonAmount = parseFloat(usdAmount) * rateData.rate
      setMonAmount(calculatedMonAmount)
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to convert currency')
    } finally {
      setIsConverting(false)
    }
  }

  const handleGeneratePaymentLink = async () => {
    if (!usdAmount || !monAmount || !rate) {
      setError('Please convert USD to MON first')
      return
    }

    setIsGenerating(true)
    setError(null)

    try {
      const response = await fetch('/api/qr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          usdAmount: parseFloat(usdAmount),
          monAmount,
          rate
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate payment link')
      }

      const qrData: QRData = await response.json()
      setQrData(qrData)
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate payment link')
    } finally {
      setIsGenerating(false)
    }
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      // You could add a toast notification here
      alert('Link copied to clipboard!')
    } catch (err) {
      console.error('Failed to copy to clipboard:', err)
    }
  }

  const resetForm = () => {
    setUsdAmount('')
    setMonAmount(null)
    setRate(null)
    setQrData(null)
    setError(null)
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Create Payment Request
      </h2>
      
      <div className="space-y-6">
        {/* Step 1: USD Input */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount (USD)
            </label>
            <div className="flex space-x-3">
              <input
                type="number"
                step="0.01"
                min="0"
                value={usdAmount}
                onChange={(e) => setUsdAmount(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter amount in USD"
                disabled={isConverting || isGenerating}
              />
              <button
                onClick={handleConvert}
                disabled={!usdAmount || isConverting || isGenerating}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition duration-200"
              >
                {isConverting ? 'Converting...' : 'Convert'}
              </button>
            </div>
          </div>
        </div>

        {/* Step 2: Conversion Result */}
        {monAmount && rate && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-green-800 mb-2">
              Conversion Result
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-green-600 font-medium">USD Amount:</span>
                <p className="text-green-800 font-semibold">${usdAmount}</p>
              </div>
              <div>
                <span className="text-green-600 font-medium">Exchange Rate:</span>
                <p className="text-green-800 font-semibold">1 MONAD = ${rate.toFixed(4)}</p>
              </div>
              <div>
                <span className="text-green-600 font-medium">MONAD Amount:</span>
                <p className="text-green-800 font-semibold">{monAmount.toFixed(6)} MONAD</p>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Generate Payment Link */}
        {monAmount && rate && (
          <div className="space-y-4">
            <button
              onClick={handleGeneratePaymentLink}
              disabled={isGenerating}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
            >
              {isGenerating ? 'Generating...' : 'Generate Payment Link'}
            </button>
          </div>
        )}

        {/* Step 4: Display Results */}
        {qrData && (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-blue-800 mb-4">
                Payment Request Generated
              </h3>
              
              {/* QR Code */}
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-white border-2 border-gray-200 rounded-lg">
                  <QRCodeCanvas
                    value={qrData.qrText}
                    size={200}
                    level="M"
                    includeMargin={true}
                  />
                </div>
              </div>

              {/* Payment Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-4">
                <div>
                  <span className="text-blue-600 font-medium">Transaction ID:</span>
                  <p className="text-blue-800 font-mono text-xs break-all">{qrData.txnId}</p>
                </div>
                <div>
                  <span className="text-blue-600 font-medium">Recipient:</span>
                  <p className="text-blue-800 font-mono text-xs break-all">{qrData.recipient}</p>
                </div>
                <div>
                  <span className="text-blue-600 font-medium">Amount (USD):</span>
                  <p className="text-blue-800 font-semibold">${qrData.usdAmount}</p>
                </div>
                <div>
                  <span className="text-blue-600 font-medium">Amount (MONAD):</span>
                  <p className="text-blue-800 font-semibold">{qrData.amount} MONAD</p>
                </div>
              </div>

              {/* Deeplink */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-blue-700">
                  Payment Deeplink:
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={qrData.deeplink}
                    readOnly
                    className="flex-1 px-3 py-2 bg-gray-100 border border-gray-300 rounded text-xs font-mono"
                  />
                  <button
                    onClick={() => copyToClipboard(qrData.deeplink)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded transition duration-200"
                  >
                    Copy Link
                  </button>
                </div>
              </div>
            </div>

            {/* Reset Button */}
            <div className="flex justify-center">
              <button
                onClick={resetForm}
                className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition duration-200"
              >
                Create New Payment
              </button>
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="text-red-800 font-medium">{error}</p>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-700 mb-2">How to use:</h4>
          <ol className="text-sm text-gray-600 space-y-1">
            <li>1. Enter the USD amount you want to receive</li>
            <li>2. Click "Convert" to get the current MONAD rate and calculate the equivalent amount</li>
            <li>3. Click "Generate Payment Link" to create a QR code and deeplink</li>
            <li>4. Share the QR code or deeplink with your customer for payment</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
