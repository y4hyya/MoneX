'use client'

import { useState, useEffect, useRef } from 'react'
import { QRCodeCanvas } from 'qrcode.react'

interface RateData {
  rate_monad_per_usd: number
  ts: string
  signature: string
}

interface QRData {
  deeplink: string
  qrDataUrl: string
  txn_id: string
  ts: string
  exp: number
}

interface CreatePaymentRequestProps {
  onQRGenerated?: (qrData: QRData) => void
  isWalletConnected: boolean
  connectedAddress?: string
}

export default function CreatePaymentRequest({ onQRGenerated, isWalletConnected, connectedAddress }: CreatePaymentRequestProps) {
  const [fiatAmount, setFiatAmount] = useState<string>('')
  const [amountMon, setAmountMon] = useState<number | null>(null)
  const [rateMonadPerUsd, setRateMonadPerUsd] = useState<number | null>(null)
  const [qrData, setQrData] = useState<QRData | null>(null)
  
  const [isConverting, setIsConverting] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [timeLeft, setTimeLeft] = useState<number | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Countdown timer effect
  useEffect(() => {
    if (timeLeft !== null && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev === null || prev <= 1) {
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else if (timeLeft === 0) {
      // Payment expired - clear all data
      setQrData(null)
      setMonAmount(null)
      setRate(null)
      setError('Payment request has expired. Please enter a new amount and convert again.')
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [timeLeft])

  const startCountdown = () => {
    setTimeLeft(60) // 1 minute countdown
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleConvert = async () => {
    if (!fiatAmount || parseFloat(fiatAmount) <= 0) {
      setError('Please enter a valid USD amount')
      return
    }

    if (parseFloat(fiatAmount) < 0.01) {
      setError('Minimum amount is $0.01')
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
      setRateMonadPerUsd(rateData.rate_monad_per_usd)
      
      const calculatedAmountMon = parseFloat(fiatAmount) * rateData.rate_monad_per_usd
      setAmountMon(calculatedAmountMon)
      
      // Start countdown when conversion is complete
      startCountdown()
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to convert currency')
    } finally {
      setIsConverting(false)
    }
  }

  const handleGeneratePaymentLink = async () => {
    if (!fiatAmount || !amountMon || !rateMonadPerUsd) {
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
          fiat_amount: parseFloat(fiatAmount),
          fiat_currency: 'USD',
          rate_monad_per_usd: rateMonadPerUsd,
          amount_mon: amountMon,
          to: connectedAddress
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate payment link')
      }

      const qrData: QRData = await response.json()
      setQrData(qrData)
      
      // Pass QR data to parent component
      if (onQRGenerated) {
        onQRGenerated(qrData)
      }
      
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
    setFiatAmount('')
    setAmountMon(null)
    setRateMonadPerUsd(null)
    setQrData(null)
    setError(null)
    setTimeLeft(null)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }

  // Show wallet connection requirement if not connected
  if (!isWalletConnected) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Create Payment Request
        </h2>
        
        <div className="text-center py-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-yellow-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Wallet Connection Required
          </h3>
          <p className="text-gray-600 mb-4">
            Please connect your wallet to create payment requests and receive MONAD payments.
          </p>
          <p className="text-sm text-gray-500">
            Your wallet address will be used as the recipient for payments.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Create Payment Request
      </h2>
      
      <div className="space-y-6">
        {/* Wallet Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-blue-800 font-medium">Connected Wallet</span>
          </div>
          <p className="text-blue-700 font-mono text-sm">
            {connectedAddress}
          </p>
          <p className="text-blue-600 text-xs mt-1">
            This address will receive MONAD payments
          </p>
        </div>

        {/* Step 1: USD Input */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount (USD) - Min $0.01
            </label>
            <div className="flex space-x-3">
              <input
                type="number"
                step="0.01"
                min="0.01"
                value={fiatAmount}
                onChange={(e) => setFiatAmount(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                placeholder="Enter amount in USD"
                disabled={isConverting || isGenerating}
              />
              <button
                onClick={handleConvert}
                disabled={!fiatAmount || isConverting || isGenerating}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition duration-200"
              >
                {isConverting ? 'Converting...' : 'Convert to MON'}
              </button>
            </div>
          </div>
        </div>

        {/* Step 2: Conversion Result */}
        {amountMon && rateMonadPerUsd && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold text-green-800">
                Conversion Result
              </h3>
              {timeLeft !== null && timeLeft > 0 && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-green-600 font-medium">Expires in:</span>
                  <span className={`text-lg font-bold px-3 py-1 rounded ${
                    timeLeft <= 10 ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {formatTime(timeLeft)}
                  </span>
                </div>
              )}
            </div>
            
            {/* Expiry Warning in Conversion Section */}
            {timeLeft !== null && timeLeft <= 10 && timeLeft > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <p className="text-red-800 font-medium text-sm">
                    Conversion expires in {timeLeft} seconds! Generate payment link quickly or convert again.
                  </p>
                </div>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-green-600 font-medium">USD Amount:</span>
                <p className="text-green-800 font-semibold">${fiatAmount}</p>
              </div>
              <div>
                <span className="text-green-600 font-medium">Exchange Rate:</span>
                <p className="text-green-800 font-semibold">{rateMonadPerUsd} MON per $1</p>
              </div>
              <div>
                <span className="text-green-600 font-medium">MON Amount:</span>
                <p className="text-green-800 font-semibold">{amountMon.toFixed(6)} MON</p>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Generate Payment Link */}
        {amountMon && rateMonadPerUsd && (
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

        {/* Success Message */}
        {qrData && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <p className="text-green-800 font-medium">
                Payment request generated successfully! Check the QR code on the right.
              </p>
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
