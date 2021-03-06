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
    address: '0xd7806003635D0B815D935c61986cf67fa346DF8a',
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
