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
    variant: 'blue' | 'violet'
    tooltip: string
  }
}
const cardConfig: CardConfig = {
  [PoolIds.poolEarly]: {
    title: 'Early Sale',
    variant: 'blue',
    tooltip: 'Early Auction with a fix price and distribution to the earliest buyers.',
  },
  [PoolIds.poolBasic]: {
    title: 'Basic Sale',
    variant: 'blue',
    tooltip: 'Basic Auction with a price ceiling and distribution to all participants.',
  },
  [PoolIds.poolUnlimited]: {
    title: 'Unlimited Sale',
    variant: 'violet',
    tooltip: 'Unlimited Auction with no starting price and distribution to all participants.',
  },
}
const SmallCard: React.FC<IfoCardProps> = ({ poolId, ifo, publicIfoData, walletIfoData, onApprove, enableStatus }) => {
  const { t } = useTranslation()
  const config = cardConfig[poolId]
  const { hasProfile, isLoading: isProfileLoading } = {hasProfile: true,isLoading: true}
  const { targetRef, tooltip, tooltipVisible } = useTooltip(t(config.tooltip), { placement: 'bottom' })
  const isLoading = isProfileLoading || publicIfoData.status === 'idle'
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
            hasProfile={hasProfile}
            isLoading={isLoading}
            onApprove={onApprove}
            enableStatus={enableStatus}
          />
          <IfoCardActions
            poolId={poolId}
            ifo={ifo}
            publicIfoData={publicIfoData}
            walletIfoData={walletIfoData}
            hasProfile={hasProfile}
            isLoading={isLoading}
          />
          <IfoCardDetails poolId={poolId} ifo={ifo} publicIfoData={publicIfoData} />
        </CardBody>
      </Card>
    </>
  )
}

export default SmallCard
