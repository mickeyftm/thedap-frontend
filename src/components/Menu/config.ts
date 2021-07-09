import { MenuEntry } from '@thedac-space/thedap-uikit'
import { ContextApi } from 'contexts/Localization/types'

const config: (t: ContextApi['t']) => MenuEntry[] = (t) => [
  {
    label: t('MGH'),
    icon: 'HomeIcon',
    href: '/',
  },
]

export default config
