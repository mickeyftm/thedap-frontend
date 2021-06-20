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
  /**
  {
    id: 'kalmar',
    address: '0x1aFB32b76696CdF05593Ca3f3957AEFB23a220FB',
    isActive: false,
    name: 'Kalmar (KALM)',
    poolBasic: {
      saleAmount: '375,000 KALM',
      raiseAmount: '$750,000',
      cakeToBurn: '$375,000',
      distributionRatio: 0.3,
    },
    poolUnlimited: {
      saleAmount: '875,000 KALM',
      raiseAmount: '$2,500,000',
      cakeToBurn: '$1,250,000',
      distributionRatio: 0.7,
    },
    currency: cakeBnbLpToken,
    token: tokens.kalm,
    releaseBlockNumber: 7707736,
    campaignId: '511110000',
    articleUrl: 'https://pancakeswap.medium.com/kalmar-kalm-ifo-to-be-hosted-on-pancakeswap-4540059753e4',
    tokenOfferingPrice: 2.0,
    version: 2,
  },
   */
]

export default ifos
