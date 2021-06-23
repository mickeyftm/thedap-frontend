import React, { useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'
import { Modal, ModalBody, Text, Image, Button, BalanceInput, Flex } from '@thedac-space/thedap-uikit'
import { PoolIds, Ifo } from 'config/constants/types'
import { WalletIfoData, PublicIfoData } from 'hooks/ifo/types'
import { useTranslation } from 'contexts/Localization'
import { getBalanceNumber, formatNumber } from 'utils/formatBalance'
import { getAddress } from 'utils/addressHelpers'
import ApproveConfirmButtons from 'views/Profile/components/ApproveConfirmButtons'
import useApproveConfirmTransaction from 'hooks/useApproveConfirmTransaction'
import { DEFAULT_TOKEN_DECIMAL } from 'config'
import { useERC20 } from 'hooks/useContract'
import { BIG_NINE, BIG_TEN } from 'utils/bigNumber'

interface Props {
  poolId: PoolIds
  ifo: Ifo
  publicIfoData: PublicIfoData
  walletIfoData: WalletIfoData
  userCurrencyBalance: BigNumber
  onSuccess: (amount: BigNumber) => void
  onDismiss?: () => void
}

const multiplierValues = [0.25, 0.5, 0.75, 1]

// Default value for transaction setting, tweak based on BSC network congestion.
const gasPrice = BIG_TEN.times(BIG_TEN.pow(BIG_NINE)).toString()

const ContributeModal: React.FC<Props> = ({
  poolId,
  ifo,
  publicIfoData,
  walletIfoData,
  userCurrencyBalance,
  onDismiss,
  onSuccess,
}) => {
  const publicPoolCharacteristics = publicIfoData[poolId]
  const userPoolCharacteristics = walletIfoData[poolId]

  const { currency } = ifo
  const { token } = ifo
  const { amountTokenCommittedInLP } = userPoolCharacteristics
  const { contract } = walletIfoData
  const [value, setValue] = useState('')
  const { account } = useWeb3React()
  const raisingTokenContract = useERC20(getAddress(currency.address))
  const { t } = useTranslation()
  const valueWithTokenDecimals = new BigNumber(value).times(DEFAULT_TOKEN_DECIMAL)
  const newValue = getBalanceNumber(new BigNumber(value),currency.decimals-token.decimals).toString()
  const sentValue = getBalanceNumber(new BigNumber(value),-currency.decimals-token.decimals).toString()
  const { isApproving, isApproved, isConfirmed, isConfirming, handleApprove, handleConfirm } =
    useApproveConfirmTransaction({
      onRequiresApproval: async () => {
        try {
          const response = await raisingTokenContract.methods.allowance(account, contract.options.address).call()
          const currentAllowance = new BigNumber(response)
          return currentAllowance.gt(0)
        } catch (error) {
          return false
        }
      },
      onApprove: () => {
        return raisingTokenContract.methods
          .approve(contract.options.address, ethers.constants.MaxUint256)
          .send({ from: account, gasPrice })
      },
      onConfirm: () => {
        let pid
      if(poolId === PoolIds.poolEarly){
        pid = 0
      }else if(poolId === PoolIds.poolBasic){
        pid = 1
      }else if(poolId === PoolIds.poolUnlimited){
        pid = 2
      }
        return contract.methods
          .depositPool(valueWithTokenDecimals.toString(), pid)
          .send({ from: account, gasPrice })
      },
      onSuccess: async () => {
        await onSuccess(valueWithTokenDecimals)
        onDismiss()
      },
    })

  const maximumLpCommitable = (() => {
    return userCurrencyBalance
  })()
  
  return (
    <Modal title={t('Contribute %symbol%', { symbol: currency.symbol })} onDismiss={onDismiss}>
      <ModalBody maxWidth="320px">
        {userCurrencyBalance.isGreaterThan(0) && (
          <Flex justifyContent="space-between" mb="16px">
            <Text>{t('Max. USDT token entry')}</Text>
            <Text>{getBalanceNumber(userCurrencyBalance, currency.decimals)}</Text>
          </Flex>
        )}
        <Flex justifyContent="space-between" mb="8px">
          <Text>{t('Commit')}:</Text>
          <Flex flexGrow={1} justifyContent="flex-end">
            <Image
              src={`/images/tokens/${currency.symbol.toLocaleLowerCase()}.png`}
              width={70}
              height={24}
            />
            <Text>{currency.symbol}</Text>
          </Flex>
        </Flex>
        <BalanceInput
          value={value}
          currencyValue={sentValue.toString()}
          onUserInput={setValue}
          isWarning={valueWithTokenDecimals.isGreaterThan(maximumLpCommitable)}
          mb="8px"
        />
        <Text color="textSubtle" textAlign="right" fontSize="12px" mb="16px">
          {t('Balance: %balance%', {
            balance: formatNumber(getBalanceNumber(userCurrencyBalance, currency.decimals), 2, 5),
          })}
        </Text>
        <Flex justifyContent="space-between" mb="16px">
          {multiplierValues.map((multiplierValue, index) => (
            <Button
              key={multiplierValue}
              scale="xs"
              variant="tertiary"
              onClick={() => setValue(getBalanceNumber(maximumLpCommitable.times(multiplierValue)).toString())}
              mr={index < multiplierValues.length - 1 ? '8px' : 0}
            >
              {multiplierValue * 100}%
            </Button>
          ))}
        </Flex>
        <Text color="textSubtle" fontSize="12px" mb="24px">
          {t(
            'If you don’t commit enough USDT tokens, you may not receive any MGH tokens at all and will only receive a full refund of your USDT tokens.',
          )}
        </Text>
        <ApproveConfirmButtons
          isApproveDisabled={isConfirmed || isConfirming || isApproved}
          isApproving={isApproving}
          isConfirmDisabled={
            !isApproved || isConfirmed || valueWithTokenDecimals.isNaN() || valueWithTokenDecimals.eq(0)
          }
          isConfirming={isConfirming}
          onApprove={handleApprove}
          onConfirm={handleConfirm}
        />
      </ModalBody>
    </Modal>
  )
}

export default ContributeModal
