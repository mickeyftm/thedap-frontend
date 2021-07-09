import tokens from './tokens'
import { Ifo, Token } from './types'

const usdtToken: Token = {
  symbol: tokens.usdt.symbol,
  address: tokens.usdt.address,
  decimals: 6,
}

export const ifos: Ifo[] = [
  {
    id: 'metagamehub',
    address: '0x6Cd79D52Cf29B4cd12F7d3653CC209Bd0a434AEB',
    isActive: true,
    name: 'metagamehub (MGH)',
    poolEarly: {
      saleAmount: '9,000,000 MGH',
      distributionRatio: 0.3,
    },
    poolBasic: {
      saleAmount: '18,000,000 MGH',
      distributionRatio: 0.6,
    },
    poolUnlimited: {
      saleAmount: '3,000,000 MGH',
      distributionRatio: 0.1,
    },
    currency: usdtToken,
    token: tokens.mgh,
    releaseBlockNumber: 7707736,
    campaignId: '100010000',
    articleUrl: 'https://metagamehub.io',
    tokenOfferingPrice: 0.06,
    version: 2,
  }
]

export default ifos
