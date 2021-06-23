import React from 'react'
import { Modal, ModalBody, Text, Image, Button, Link, OpenNewIcon } from '@thedac-space/thedap-uikit'
import { Token } from 'config/constants/types'
import { useTranslation } from 'contexts/Localization'

interface Props {
  currency: Token
  onDismiss?: () => void
}

const GetLpModal: React.FC<Partial<Props>> = ({ currency, onDismiss }) => {
  const { t } = useTranslation()
  return (
    <Modal title={t('USDT tokens required')} onDismiss={onDismiss}>
      <ModalBody maxWidth="288px">
        <Image
          src={`/images/tokens/${currency.symbol}.png`}
          width={66}
          height={22}
          margin="auto"
          mb="24px"
        />
        <Text mb="16px">{t('You’ll need USDT tokens to participate in the DAO membership pools!')}</Text>
      </ModalBody>
    </Modal>
  )
}

export default GetLpModal
