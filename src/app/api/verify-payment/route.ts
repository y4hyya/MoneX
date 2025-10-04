import { NextRequest, NextResponse } from 'next/server'
import { createPublicClient, http, parseEther } from 'viem'
import { monadTestnet } from '@/lib/wagmi'

export async function POST(request: NextRequest) {
  try {
    const { txHash, expectedAmount, expectedRecipient } = await request.json()

    if (!txHash || !expectedAmount || !expectedRecipient) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      )
    }

    // Create viem client for Monad Testnet
    const client = createPublicClient({
      chain: monadTestnet,
      transport: http(process.env.NEXT_PUBLIC_MONAD_RPC_URL),
    })

    // Fetch transaction details
    const transaction = await client.getTransaction({ hash: txHash as `0x${string}` })
    
    if (!transaction) {
      return NextResponse.json(
        { status: 'invalid', error: 'Transaction not found' }
      )
    }

    // Check if transaction is confirmed
    const receipt = await client.getTransactionReceipt({ hash: txHash as `0x${string}` })
    
    if (!receipt || receipt.status !== 'success') {
      return NextResponse.json(
        { status: 'pending', error: 'Transaction not confirmed' }
      )
    }

    // Verify recipient address
    if (transaction.to?.toLowerCase() !== expectedRecipient.toLowerCase()) {
      return NextResponse.json(
        { status: 'invalid', error: 'Recipient address mismatch' }
      )
    }

    // Verify amount (convert expected amount to wei for comparison)
    const expectedAmountWei = parseEther(expectedAmount.toString())
    const actualAmountWei = BigInt(transaction.value)

    // Allow for small precision differences (within 0.1%)
    const tolerance = expectedAmountWei / 1000n
    const amountDifference = expectedAmountWei > actualAmountWei 
      ? expectedAmountWei - actualAmountWei 
      : actualAmountWei - expectedAmountWei

    if (amountDifference > tolerance) {
      return NextResponse.json(
        { status: 'invalid', error: 'Amount mismatch' }
      )
    }

    return NextResponse.json({
      status: 'confirmed',
      transaction: {
        hash: transaction.hash,
        from: transaction.from,
        to: transaction.to,
        value: transaction.value.toString(),
        blockNumber: receipt.blockNumber,
        gasUsed: receipt.gasUsed.toString()
      }
    })
  } catch (error) {
    console.error('Error verifying payment:', error)
    return NextResponse.json(
      { status: 'error', error: 'Failed to verify payment' },
      { status: 500 }
    )
  }
}
