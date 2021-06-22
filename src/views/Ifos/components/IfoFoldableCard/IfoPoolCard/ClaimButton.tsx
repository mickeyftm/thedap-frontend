import React from 'react'
import { useWeb3React } from '@web3-react/core'
import { AutoRenewIcon, Button } from '@thedac-space/thedap-uikit'
import { PoolIds } from 'config/constants/types'
import { WalletIfoData } from 'hooks/ifo/types'
import { useTranslation } from 'contexts/Localization'
import useToast from 'hooks/useToast'

interface Props {
  poolId: PoolIds
  ifoVersion: number
  walletIfoData: WalletIfoData
}

const ClaimButton: React.FC<Props> = ({ poolId, ifoVersion, walletIfoData }) => {
  const userPoolCharacteristics = walletIfoData[poolId]
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const { toastError, toastSuccess } = useToast()

  const setPendingTx = (isPending: boolean) => walletIfoData.setPendingTx(isPending, poolId)

  const handleClaim = async () => {
    try {
      setPendingTx(true)
      let pid
      if(poolId === PoolIds.poolEarly){
        pid = 0
      }else if(poolId === PoolIds.poolBasic){
        pid = 1
      }else if(poolId === PoolIds.poolUnlimited){
        pid = 2
      }
        await walletIfoData.contract.methods.harvestPool(pid).send({ from: account })


      walletIfoData.setIsClaimed(poolId)
      toastSuccess(t('Success!'), t('You have successfully claimed your rewards.'))
    } catch (error) {
      toastError(t('Error'), error?.message)
      console.error(error)
    } finally {
      setPendingTx(false)
    }
  }

  return (
    <Button
      onClick={handleClaim}
      disabled={userPoolCharacteristics.isPendingTx}
      width="100%"
      isLoading={userPoolCharacteristics.isPendingTx}
      endIcon={userPoolCharacteristics.isPendingTx ? <AutoRenewIcon spin color="currentColor" /> : null}
    >
      {t('Claim')}
    </Button>
  )
}

export default ClaimButton
