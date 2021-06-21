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
  const offeringAmountPool = getBalanceNumber(poolCharacteristic.offeringAmountPool, ifo.currency.decimals)
  const totalAmountPool = getBalanceNumber(poolCharacteristic.totalAmountPool, ifo.currency.decimals)
  const priceA = 1/ getBalanceNumber(poolCharacteristic.priceA, ifo.currency.decimals)
  const priceB = 1/ getBalanceNumber(poolCharacteristic.priceB, ifo.currency.decimals)
  const priceC = totalAmountPool / offeringAmountPool

  const totalCommittedPercent = poolCharacteristic.totalAmountPool
    .div(poolCharacteristic.offeringAmountPool)
    .times(100)
    .toFixed(2)

  const totalLPCommittedInUSD = currencyPriceInUSD.times(totalAmountPool)
  const totalCommitted = `~$${formatNumber(totalLPCommittedInUSD.toNumber())} (${totalCommittedPercent}%)`

  /* Format end */

  const renderBasedOnIfoStatus = () => {
    if (status === 'coming_soon') {
      return (
        <>
          {poolId === PoolIds.poolBasic && <FooterEntry label={t('MGh available')} value={offeringAmountPool} />}
          <FooterEntry label={t('Funds to raise:')} value={ifo[poolId].saleAmount} />
          <FooterEntry
            label={t('Price per %symbol%:', { symbol: ifo.token.symbol })}
            value={`$${ifo.tokenOfferingPrice}`}
          />
        </>
      )
    }
    if (status === 'live') {
      return (
        <>
          {poolId === PoolIds.poolEarly && <FooterEntry label={t('offeringAmountPool')} value={offeringAmountPool} />}
          {poolId === PoolIds.poolEarly && <FooterEntry label={t('priceA')} value={priceA} />}
          {poolId === PoolIds.poolEarly && <FooterEntry label={t('priceB')} value={priceB} />}
          {poolId === PoolIds.poolEarly && <FooterEntry label={t('priceC')} value={priceC} />}
          {poolId === PoolIds.poolBasic && <FooterEntry label={t('offeringAmountPool')} value={offeringAmountPool} />}
          {poolId === PoolIds.poolBasic && <FooterEntry label={t('priceA')} value={priceA} />}
          {poolId === PoolIds.poolBasic && <FooterEntry label={t('priceB')} value={priceB} />}
          {poolId === PoolIds.poolBasic && <FooterEntry label={t('priceC')} value={priceC} />}
          {poolId === PoolIds.poolUnlimited && <FooterEntry label={t('offeringAmountPool')} value={offeringAmountPool} />}
          {poolId === PoolIds.poolUnlimited && <FooterEntry label={t('priceA')} value={priceA} />}
          {poolId === PoolIds.poolUnlimited && <FooterEntry label={t('priceB')} value={priceB} />}
          {poolId === PoolIds.poolUnlimited && <FooterEntry label={t('priceC')} value={priceC} />}
          <FooterEntry label={t('Total committed:')} value={currencyPriceInUSD.gt(0) ? totalCommitted : null} />
        </>
      )
    }
    if (status === 'finished') {
      return (
        <>
          {poolId === PoolIds.poolEarly && <FooterEntry label={t('offeringAmountPool')} value={offeringAmountPool} />}
          {poolId === PoolIds.poolBasic && <FooterEntry label={t('offeringAmountPool')} value={offeringAmountPool} />}
          {poolId === PoolIds.poolUnlimited && <FooterEntry label={t('offeringAmountPool')} value={offeringAmountPool} />}
          <FooterEntry label={t('Total committed:')} value={currencyPriceInUSD.gt(0) ? totalCommitted : null} />
          <FooterEntry label={t('Funds to raise:')} value={ifo[poolId].saleAmount} />
          <FooterEntry
            label={t('Price per %symbol%:', { symbol: ifo.token.symbol })}
            value={`$${ifo.tokenOfferingPrice ? ifo.tokenOfferingPrice : '?'}`}
          />
        </>
      )
    }
    return <SkeletonCardDetails />
  }

  return <Box paddingTop="24px">{renderBasedOnIfoStatus()}</Box>
}

export default IfoCardDetails
