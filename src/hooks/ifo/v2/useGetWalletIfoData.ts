import { useEffect, useState, useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import { Ifo, PoolIds } from 'config/constants/types'
import { useERC20, useIfoV2Contract } from 'hooks/useContract'
import useRefresh from 'hooks/useRefresh'
import makeBatchRequest from 'utils/makeBatchRequest'
import { getAddress } from 'utils/addressHelpers'
import { BIG_ZERO } from 'utils/bigNumber'
import { WalletIfoState, WalletIfoData } from '../types'

/**
 * Gets all data from an IFO related to a wallet
 */
const useGetWalletIfoData = (ifo: Ifo): WalletIfoData => {
  const { fastRefresh } = useRefresh()
  const [state, setState] = useState<WalletIfoState>({
    poolEarly: {
      amountTokenCommittedInLP: BIG_ZERO,
      offeringAmountInToken: BIG_ZERO,
      refundingAmountInLP: BIG_ZERO,
      hasClaimed: false,
      isPendingTx: false,
    },
    poolBasic: {
      amountTokenCommittedInLP: BIG_ZERO,
      offeringAmountInToken: BIG_ZERO,
      refundingAmountInLP: BIG_ZERO,
      hasClaimed: false,
      isPendingTx: false,
    },
    poolUnlimited: {
      amountTokenCommittedInLP: BIG_ZERO,
      offeringAmountInToken: BIG_ZERO,
      refundingAmountInLP: BIG_ZERO,
      hasClaimed: false,
      isPendingTx: false,
    },
  })

  const { address, currency } = ifo

  const { account } = useWeb3React()
  const contract = useIfoV2Contract(address)
  const currencyContract = useERC20(getAddress(currency.address))

  const setPendingTx = (status: boolean, poolId: PoolIds) =>
    setState((prevState) => ({
      ...prevState,
      [poolId]: {
        ...prevState[poolId],
        isPendingTx: status,
      },
    }))

  const setIsClaimed = (poolId: PoolIds) => {
    setState((prevState) => ({
      ...prevState,
      [poolId]: {
        ...prevState[poolId],
        hasClaimed: false,
      },
    }))
  }

  const fetchIfoData = useCallback(async () => {
    const [userInfo, amounts] = await makeBatchRequest([
      contract.methods.viewUserAmount(account, [0,1,2]).call,
      contract.methods.viewUserOfferingAndRefundingAmountsForPools(account, [0,1,2]).call,
    ])

    setState((prevState) => ({
      ...prevState,
      poolEarly: {
        ...prevState.poolBasic,
        amountTokenCommittedInLP: new BigNumber(userInfo[0]),
        offeringAmountInToken: new BigNumber(amounts[0][0]),
        refundingAmountInLP: new BigNumber(amounts[0][1]),
        hasClaimed: !userInfo[0],
      },
      poolBasic: {
        ...prevState.poolBasic,
        amountTokenCommittedInLP: new BigNumber(userInfo[1]),
        offeringAmountInToken: new BigNumber(amounts[1][0]),
        refundingAmountInLP: new BigNumber(amounts[1][1]),
        hasClaimed: !userInfo[1],
      },
      poolUnlimited: {
        ...prevState.poolUnlimited,
        amountTokenCommittedInLP: new BigNumber(userInfo[2]),
        offeringAmountInToken: new BigNumber(amounts[2][0]),
        refundingAmountInLP: new BigNumber(amounts[2][1]),
        hasClaimed: !userInfo[2],
      },
    }))
  }, [account, contract])

  useEffect(() => {
    if (account) {
      fetchIfoData()
    }
  }, [account, fetchIfoData, fastRefresh])

  return { ...state, contract, setPendingTx, setIsClaimed, fetchIfoData }
}

export default useGetWalletIfoData
