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
    address: '0xbaD3739052b2C9a92Ed56dec06c01E649Cf57017',
    isActive: true,
    name: 'metagamehub (MGH)',
    poolEarly: {
      saleAmount: '400,000 MGH',
      distributionRatio: 0.4,
    },
    poolBasic: {
      saleAmount: '400,000 MGH',
      distributionRatio: 0.4,
    },
    poolUnlimited: {
      saleAmount: '200,000 MGH',
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
