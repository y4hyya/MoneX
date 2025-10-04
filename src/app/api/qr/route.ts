import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import { createHmac } from 'crypto'

export async function POST(request: NextRequest) {
  try {
    const { 
      fiat_amount, 
      fiat_currency, 
      rate_monad_per_usd, 
      amount_mon, 
      to 
    } = await request.json()

    if (!fiat_amount || !fiat_currency || !rate_monad_per_usd || !amount_mon || !to) {
      return NextResponse.json(
        { error: 'Missing required fields: fiat_amount, fiat_currency, rate_monad_per_usd, amount_mon, to' },
        { status: 400 }
      )
    }

    // Generate required parameters
    const txn_id = uuidv4()
    const ts = new Date().toISOString()
    const exp = 300 // 5 minutes expiry
    const nonce = Math.random().toString(36).substring(2, 15)
    
    // Create payload for signature
    const payload = `to=${to}&fiat_amount=${fiat_amount}&fiat_currency=${fiat_currency}&rate_monad_per_usd=${rate_monad_per_usd}&amount_mon=${amount_mon}&txn_id=${txn_id}&ts=${ts}&exp=${exp}&nonce=${nonce}`
    
    // Create mock signature (in production, use proper HMAC with secret key)
    const secret = 'mock-secret-key' // In production, use environment variable
    const sig = createHmac('sha256', secret).update(payload).digest('base64')

    // Create deeplink with exact format
    const params = new URLSearchParams({
      to,
      fiat_amount: fiat_amount.toString(),
      fiat_currency,
      rate_monad_per_usd: rate_monad_per_usd.toString(),
      amount_mon: amount_mon.toString(),
      txn_id,
      ts,
      exp: exp.toString(),
      nonce,
      sig
    })
    
    const deeplink = `monadpay://pay?${params.toString()}`

    // Generate QR code data URL (base64 encoded)
    // In a real implementation, you would use a QR code library on the server
    const qrDataUrl = `data:image/png;base64,${Buffer.from(deeplink).toString('base64')}`

    return NextResponse.json({
      deeplink,
      qrDataUrl,
      txn_id,
      ts,
      exp
    })
  } catch (error) {
    console.error('Error generating QR:', error)
    return NextResponse.json(
      { error: 'Failed to generate payment QR' },
      { status: 500 }
    )
  }
}
