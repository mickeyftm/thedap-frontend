import { ContextApi } from 'contexts/Localization/types'
import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'thedap.space',
  description:
    'The first DAO Governance Aggregator! DAO Offerings NPTs, and more.',
  image: 'https://pancakeswap.finance/images/hero.png',
}

export const getCustomMeta = (path: string, t: ContextApi['t']): PageMeta => {
  switch (path) {
    case '/':
      return {
        title: `${t('Home')} | ${t('thedap.space')}`,
      }
    case '/ifo':
      return {
        title: `${t('DAO Offering')} | ${t('thedap.sapce')}`,
      }
    default:
      return null
  }
}
