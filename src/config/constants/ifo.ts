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
      saleAmount: '20,000,000 MGH',
      distributionRatio: 0.4,
    },
    poolBasic: {
      saleAmount: '20,000,000 MGH',
      distributionRatio: 0.4,
    },
    poolUnlimited: {
      saleAmount: '10,000,000 MGH',
      distributionRatio: 0.2,
    },
    currency: usdtToken,
    token: tokens.mgh,
    releaseBlockNumber: 7707736,
    campaignId: '100010000',
    articleUrl: 'https://metagamehub.io',
    tokenOfferingPrice: 1,
    version: 2,
  }
]

export default ifos
