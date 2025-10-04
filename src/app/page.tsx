'use client'

import { useState, useEffect } from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { injected } from 'wagmi/connectors'
import CreatePaymentRequest from '@/components/CreatePaymentRequest'


interface PaymentData {
  recipient: string
  amountMON: string
  amountUSD: number
  txnId: string
  timestamp: number
  priceUSD: number
}

interface PaymentStatus {
  status: 'waiting' | 'pending' | 'confirmed' | 'error'
  message: string
  transaction?: any
}

export default function MerchantDashboard() {
  const [amountUSD, setAmountUSD] = useState<string>('')
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null)
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>({
    status: 'waiting',
    message: 'Enter an amount to generate a payment request'
  })
  const [isLoading, setIsLoading] = useState(false)
  const [qrData, setQrData] = useState<any>(null)
  
  // Wallet connection
  const { address, isConnected } = useAccount()
  const { connect } = useConnect()
  const { disconnect } = useDisconnect()

  const generatePaymentRequest = async () => {
    if (!amountUSD || parseFloat(amountUSD) <= 0) {
      setPaymentStatus({
        status: 'error',
        message: 'Please enter a valid USD amount'
      })
      return
    }

    setIsLoading(true)
    setPaymentStatus({ status: 'waiting', message: 'Creating payment request...' })

    try {
      const response = await fetch('/api/create-payment-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amountUSD: parseFloat(amountUSD) }),
      })

      if (!response.ok) {
        throw new Error('Failed to create payment request')
      }

      const data = await response.json()
      setPaymentData(data)
      setPaymentStatus({
        status: 'waiting',
        message: 'Payment request created. Waiting for payment...'
      })

      // Start polling for payment verification
      startPaymentVerification(data)
    } catch (error) {
      console.error('Error creating payment request:', error)
      setPaymentStatus({
        status: 'error',
        message: 'Failed to create payment request'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const startPaymentVerification = (data: PaymentData) => {
    const interval = setInterval(async () => {
      try {
        // For now, we'll simulate payment verification
        // In a real implementation, you would check the blockchain
        // or use a webhook system
        console.log('Checking for payment...')
        
        // Simulate random payment completion for demo purposes
        if (Math.random() < 0.1) { // 10% chance per check
          setPaymentStatus({
            status: 'confirmed',
            message: 'Payment confirmed! Transaction completed successfully.'
          })
          clearInterval(interval)
        }
      } catch (error) {
        console.error('Error verifying payment:', error)
      }
    }, 5000) // Check every 5 seconds

    // Clear interval after 5 minutes
    setTimeout(() => {
      clearInterval(interval)
      if (paymentStatus.status === 'waiting') {
        setPaymentStatus({
          status: 'error',
          message: 'Payment timeout. Please try again.'
        })
      }
    }, 300000)
  }

  const generateDeeplink = (data: PaymentData) => {
    const params = new URLSearchParams({
      recipient: data.recipient,
      amount: data.amountMON,
      txnId: data.txnId,
      currency: 'MON'
    })
    return `monadpay://pay?${params.toString()}`
  }

  const copyDeeplink = () => {
    if (paymentData) {
      const deeplink = generateDeeplink(paymentData)
      navigator.clipboard.writeText(deeplink)
      alert('Deeplink copied to clipboard!')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  MonadPay
                </h1>
                <p className="text-xl text-gray-600 mb-6">
                  QR Code & Deeplink Crypto Payments on Monad Testnet
                </p>
                
                {/* Wallet Connection */}
                <div className="flex justify-center mb-6">
                  {!isConnected ? (
                    <button
                      onClick={() => connect({ connector: injected() })}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
                    >
                      Connect Wallet
                    </button>
                  ) : (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-green-800 font-medium">Wallet Connected</span>
                        </div>
                        <div className="text-sm text-green-700 font-mono">
                          {address?.slice(0, 6)}...{address?.slice(-4)}
                        </div>
                        <button
                          onClick={() => disconnect()}
                          className="text-green-600 hover:text-green-800 text-sm font-medium"
                        >
                          Disconnect
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* New Payment Request Component */}
                <CreatePaymentRequest 
                  onQRGenerated={setQrData} 
                  isWalletConnected={isConnected}
                  connectedAddress={address}
                />

                {/* QR Code Display */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                    Payment QR Code
                  </h2>
                  
                  {qrData ? (
                    <div className="space-y-4">
                      <div className="flex justify-center">
                        <div className="p-4 bg-white border-2 border-gray-200 rounded-lg">
                          <QRCodeCanvas
                            value={qrData.deeplink}
                            size={200}
                            level="M"
                            includeMargin={true}
                          />
                        </div>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Transaction ID:</span>
                          <span className="font-mono text-xs">{qrData.txn_id}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Created:</span>
                          <span className="font-mono text-xs">{new Date(qrData.ts).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Expires:</span>
                          <span className="font-mono text-xs">{Math.floor(qrData.exp / 60)} minutes</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Payment Deeplink:
                        </label>
                        <div className="flex space-x-2">
                          <input
                            type="text"
                            value={qrData.deeplink}
                            readOnly
                            className="flex-1 px-3 py-2 bg-gray-100 border border-gray-300 rounded text-xs font-mono text-black"
                          />
                          <button
                            onClick={() => navigator.clipboard.writeText(qrData.deeplink)}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded transition duration-200"
                          >
                            Copy
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-gray-500 py-8">
                      <div className="w-32 h-32 mx-auto mb-4 bg-gray-200 rounded-lg flex items-center justify-center">
                        <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </div>
                      <p>Generate a payment request to see the QR code</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Instructions */}
              <div className="mt-8 bg-blue-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-4">
                  How to Use MonadPay
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-blue-800">
                  <div className="flex items-start space-x-2">
                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">1</span>
                    <span>Enter the USD amount you want to receive</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">2</span>
                    <span>Click "Generate Payment QR" to create a payment request</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">3</span>
                    <span>Customer scans QR code with their Monad wallet to pay</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  )
}