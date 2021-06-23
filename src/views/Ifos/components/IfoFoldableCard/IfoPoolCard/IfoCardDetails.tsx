import React from 'react'
import { Text, Flex, Box, Skeleton } from '@thedac-space/thedap-uikit'
import { PublicIfoData } from 'hooks/ifo/types'
import { useTranslation } from 'contexts/Localization'
import { Ifo, PoolIds } from 'config/constants/types'
import { getBalanceNumber, formatNumber } from 'utils/formatBalance'
import { SkeletonCardDetails } from './Skeletons'

export interface IfoCardDetailsProps {
  poolId: PoolIds
  ifo: Ifo
  publicIfoData: PublicIfoData
}

export interface FooterEntryProps {
  label: string
  value: string | number
}

const FooterEntry: React.FC<FooterEntryProps> = ({ label, value }) => {
  return (
    <Flex justifyContent="space-between" alignItems="center">
      <Text small color="textSubtle">
        {label}
      </Text>
      {value ? (
        <Text small textAlign="right">
          {value}
        </Text>
      ) : (
        <Skeleton height={21} width={80} />
      )}
    </Flex>
  )
}

const IfoCardDetails: React.FC<IfoCardDetailsProps> = ({ poolId, ifo, publicIfoData }) => {
  const { t } = useTranslation()
  const { status, currencyPriceInUSD } = publicIfoData
  const poolCharacteristic = publicIfoData[poolId]
 
  /* Format start */
  const offeringAmountPool = getBalanceNumber(poolCharacteristic.offeringAmountPool, ifo.token.decimals)
  const totalAmountPool = getBalanceNumber(poolCharacteristic.totalAmountPool, ifo.currency.decimals)
  const priceA = 1/ getBalanceNumber(poolCharacteristic.priceA, ifo.token.decimals-ifo.currency.decimals)
  const priceB = 1/ getBalanceNumber(poolCharacteristic.priceB, ifo.token.decimals-ifo.currency.decimals)
  const priceC = totalAmountPool / offeringAmountPool
  let priceD = priceC 
  if(priceD<priceA){priceD=priceA}else if(priceD>priceB){priceD=priceB}

  const totalCommittedPercent0 = Math.round(totalAmountPool/(offeringAmountPool*priceA)*10000)/ 100
  const totalCommittedPercent1 = Math.round(totalAmountPool/(offeringAmountPool*priceD)*10000)/ 100

  const totalCommitted0 = `~$${formatNumber(totalAmountPool)} (${totalCommittedPercent0}%)`
  const totalCommitted1 = `~$${formatNumber(totalAmountPool)} (${totalCommittedPercent1}%)`
  const totalCommitted2 = `~$${formatNumber(totalAmountPool)}`

  /* Format end */

  const renderBasedOnIfoStatus = () => {
    if (status === 'coming_soon') {
      return (
        <>
          <FooterEntry label={t('MGH offered:')} value={offeringAmountPool} />
          {poolId === PoolIds.poolEarly &&<FooterEntry
            label={t('fix.price per %symbol%:', { symbol: ifo.token.symbol })}
            value={priceA}
          />}
          {poolId === PoolIds.poolBasic &&<FooterEntry
            label={t('min.price per %symbol%:', { symbol: ifo.token.symbol })}
            value={priceA}
          />}
          {poolId === PoolIds.poolBasic &&<FooterEntry
            label={t('max.price per %symbol%:', { symbol: ifo.token.symbol })}
            value={priceB}
          />}
        </>
      )
    }
    if (status === 'live') {
      return (
        <>
          <FooterEntry label={t('MGH offered:')} value={offeringAmountPool} />

          {poolId === PoolIds.poolEarly &&<FooterEntry label={t('USDT participated:')} value={totalCommitted0} />}
          {poolId === PoolIds.poolBasic &&<FooterEntry label={t('USDT participated:')} value={totalCommitted1} />}
          {poolId === PoolIds.poolUnlimited &&<FooterEntry label={t('USDT participated:')} value={totalCommitted2} />}
          {poolId === PoolIds.poolEarly && <FooterEntry label={t('fix.price')} value={priceA} />}
          {poolId === PoolIds.poolBasic && <FooterEntry label={t('now.price')} value={priceD} />}
          {poolId === PoolIds.poolBasic && <FooterEntry label={t('min.price')} value={priceA} />}
          {poolId === PoolIds.poolBasic && <FooterEntry label={t('max.price')} value={priceB} />}
          {poolId === PoolIds.poolUnlimited && <FooterEntry label={t('now.price')} value={priceC} />}
        </>
      )
    }
    if (status === 'finished') {
      return (
        <>
          <FooterEntry label={t('MGH offered:')} value={offeringAmountPool} />
          {poolId === PoolIds.poolEarly &&<FooterEntry label={t('USDT participated:')} value={totalCommitted0} />}
          {poolId === PoolIds.poolBasic &&<FooterEntry label={t('USDT participated:')} value={totalCommitted1} />}
          {poolId === PoolIds.poolUnlimited &&<FooterEntry label={t('USDT participated:')} value={totalCommitted2} />}
          {poolId === PoolIds.poolEarly && <FooterEntry label={t('price')} value={priceA} />}
          {poolId === PoolIds.poolBasic && <FooterEntry label={t('price')} value={priceD} />}
          {poolId === PoolIds.poolUnlimited && <FooterEntry label={t('price')} value={priceC} />}
        </>
      )
    }
    return <SkeletonCardDetails />
  }

  return <Box paddingTop="24px">{renderBasedOnIfoStatus()}</Box>
}

export default IfoCardDetails
