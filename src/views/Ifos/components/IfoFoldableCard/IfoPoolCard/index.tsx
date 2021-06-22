import React from 'react'
import { useTranslation } from 'contexts/Localization'
import { Card, CardBody, CardHeader, Text, useTooltip, HelpIcon, Flex } from '@thedac-space/thedap-uikit'
import { Ifo, PoolIds } from 'config/constants/types'
import { PublicIfoData, WalletIfoData } from 'hooks/ifo/types'
import { EnableStatus } from '../types'
import IfoCardTokens from './IfoCardTokens'
import IfoCardActions from './IfoCardActions'
import IfoCardDetails from './IfoCardDetails'

interface IfoCardProps {
  poolId: PoolIds
  ifo: Ifo
  publicIfoData: PublicIfoData
  walletIfoData: WalletIfoData
  onApprove: () => Promise<any>
  enableStatus: EnableStatus
}

interface CardConfig {
  [key: string]: {
    title: string
    variant: 'blue' | 'violet' | 'default'
    tooltip: string
  }
}
const cardConfig: CardConfig = {
  [PoolIds.poolEarly]: {
    title: 'Early Pool',
    variant: 'default',
    tooltip: 'Early Pool with a fix price and distribution to the earliest buyers.',
  },
  [PoolIds.poolBasic]: {
    title: 'Basic Pool',
    variant: 'blue',
    tooltip: 'Basic Pool with a price ceiling and distribution to all participants.',
  },
  [PoolIds.poolUnlimited]: {
    title: 'Unlimited Pool',
    variant: 'violet',
    tooltip: 'Unlimited Pool with no starting price and distribution to all participants.',
  },
}
const SmallCard: React.FC<IfoCardProps> = ({ poolId, ifo, publicIfoData, walletIfoData, onApprove, enableStatus }) => {
  const { t } = useTranslation()
  const config = cardConfig[poolId]
  const { targetRef, tooltip, tooltipVisible } = useTooltip(t(config.tooltip), { placement: 'bottom' })
  const isLoading =  publicIfoData.status === 'idle'
  return (
    <>
      {tooltipVisible && tooltip}
      <Card>
        <CardHeader variant={config.variant}>
          <Flex justifyContent="space-between" alignItems="center">
            <Text bold fontSize="20px">
              {t(config.title)}
            </Text>
            <div ref={targetRef}>
              <HelpIcon />
            </div>
          </Flex>
        </CardHeader>
        <CardBody>
          <IfoCardTokens
            poolId={poolId}
            ifo={ifo}
            publicIfoData={publicIfoData}
            walletIfoData={walletIfoData}
            isLoading={isLoading}
            onApprove={onApprove}
            enableStatus={enableStatus}
          />
          <IfoCardActions
            poolId={poolId}
            ifo={ifo}
            publicIfoData={publicIfoData}
            walletIfoData={walletIfoData}
            isLoading={isLoading}
          />
          <IfoCardDetails poolId={poolId} ifo={ifo} publicIfoData={publicIfoData} />
        </CardBody>
      </Card>
    </>
  )
}

export default SmallCard
