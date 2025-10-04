export interface PaymentParams {
  to: string;
  fiat_amount: string;
  fiat_currency: string;
  rate_monad_per_usd: string;
  amount_mon: string;
  txn_id: string;
  ts: string;
  exp: string;
  nonce: string;
  sig: string;
}

export interface MonadNetwork {
  name: string;
  rpcUrl: string;
  chainId: number;
  currencySymbol: string;
  blockExplorer: string;
}
