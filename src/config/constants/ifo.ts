import tokens from './tokens'
import { Ifo, Token } from './types'

const usdtToken: Token = {
  symbol: tokens.usdt.symbol,
  address: tokens.usdt.address,
  decimals: 18,
}

export const ifos: Ifo[] = [
  {
    id: 'metagamehub',
    address: '0x4c590D0874aBd0c64Ed3477B0BAe731776A0f135',
    isActive: true,
    name: 'metagamehub (MGH)',
    poolEarly: {
      saleAmount: '20,000,000 MGH',
      raiseAmount: '$2,000,000',
      cakeToBurn: '$0',
      distributionRatio: 0.4,
    },
    poolBasic: {
      saleAmount: '20,000,000 MGH',
      raiseAmount: '$2,000,000',
      cakeToBurn: '$0',
      distributionRatio: 0.4,
    },
    poolUnlimited: {
      saleAmount: '10,000,000 MGH',
      raiseAmount: '$1,000,000',
      cakeToBurn: '$0',
      distributionRatio: 0.2,
    },
    currency: usdtToken,
    token: tokens.mgh,
    releaseBlockNumber: 7707736,
    campaignId: '100010000',
    articleUrl: 'https://metagamehub.io',
    tokenOfferingPrice: 0.1,
    version: 2,
  }
]

export default ifos
