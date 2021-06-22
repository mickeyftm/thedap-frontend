import { useEffect, useState, useCallback } from 'react'
import BigNumber from 'bignumber.js'
import { BSC_BLOCK_TIME } from 'config'
import { Ifo, IfoStatus } from 'config/constants/types'
import { useBlock } from 'state/hooks'
import {  useIfoV2Contract } from 'hooks/useContract'
import useRefresh from 'hooks/useRefresh'
import makeBatchRequest from 'utils/makeBatchRequest'
import { BIG_ZERO } from 'utils/bigNumber'
import { PublicIfoData, PoolCharacteristics } from '../types'
import { getStatus } from '../helpers'

// https://github.com/pancakeswap/pancake-contracts/blob/master/projects/ifo/contracts/IFOV2.sol#L431

// 1,000,000,000 / 100

const TAX_PRECISION = 10000000000

const formatPool = (pool) => ({
  offeringAmountPool: new BigNumber(pool[0]),
  priceA: new BigNumber(pool[1]),
  priceB: new BigNumber(pool[2]),
  totalAmountPool: new BigNumber(pool[3]),
})

/**
 * Gets all public data of an IFO
 */
const useGetPublicIfoData = (ifo: Ifo): PublicIfoData => {
  const { address, releaseBlockNumber } = ifo
  const lpTokenPriceInUsd = new BigNumber(1)    
  const { fastRefresh } = useRefresh()

  const [state, setState] = useState({
    status: 'idle' as IfoStatus,
    blocksRemaining: 0,
    secondsUntilStart: 0,
    progress: 5,
    secondsUntilEnd: 0,
    poolEarly: {
      offeringAmountPool: BIG_ZERO,
      totalAmountPool: BIG_ZERO,
      priceA: BIG_ZERO,
      priceB: BIG_ZERO,
    },
    poolBasic: {
      offeringAmountPool: BIG_ZERO,
      totalAmountPool: BIG_ZERO,
      priceA: BIG_ZERO,
      priceB: BIG_ZERO,
    },
    poolUnlimited: {
      offeringAmountPool: BIG_ZERO,
      totalAmountPool: BIG_ZERO,
      priceA: BIG_ZERO,
      priceB: BIG_ZERO,
    },
    startBlockNum: 0,
    endBlockNum: 0,
  })
  const { currentBlock } = useBlock()
  const contract = useIfoV2Contract(address)

  const fetchIfoData = useCallback(async () => {
    const [startBlock, endBlock, poolEarly, poolBasic, poolUnlimited] = (await makeBatchRequest([
      contract.methods.startBlock().call,
      contract.methods.endBlock().call,
      contract.methods.viewPoolInformation(0).call,
      contract.methods.viewPoolInformation(1).call,
      contract.methods.viewPoolInformation(2).call,
    ])) as [string, string, PoolCharacteristics,PoolCharacteristics, PoolCharacteristics]

    const poolEarlyFormatted = formatPool(poolEarly)
    const poolBasicFormatted = formatPool(poolBasic)
    const poolUnlimitedFormatted = formatPool(poolUnlimited)

    const startBlockNum = parseInt(startBlock, 10)
    const endBlockNum = parseInt(endBlock, 10)

    const status = getStatus(currentBlock, startBlockNum, endBlockNum)
    const totalBlocks = endBlockNum - startBlockNum
    const blocksRemaining = endBlockNum - currentBlock

    // Calculate the total progress until finished or until start
    const progress =
      currentBlock > startBlockNum
        ? ((currentBlock - startBlockNum) / totalBlocks) * 100
        : ((currentBlock - releaseBlockNumber) / (startBlockNum - releaseBlockNumber)) * 100

    setState((prev) => ({
      ...prev,
      secondsUntilEnd: blocksRemaining * BSC_BLOCK_TIME,
      secondsUntilStart: (startBlockNum - currentBlock) * BSC_BLOCK_TIME,
      poolEarly: { ...poolEarlyFormatted },
      poolBasic: { ...poolBasicFormatted },
      poolUnlimited: { ...poolUnlimitedFormatted },
      status,
      progress,
      blocksRemaining,
      startBlockNum,
      endBlockNum,
    }))
  }, [contract, currentBlock, releaseBlockNumber])

  useEffect(() => {
    fetchIfoData()
  }, [fetchIfoData, fastRefresh])

  return { ...state, currencyPriceInUSD: lpTokenPriceInUsd, fetchIfoData }
}

export default useGetPublicIfoData
