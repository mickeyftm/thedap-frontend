import React from 'react'
import styled from 'styled-components'
import every from 'lodash/every'
import { Stepper, Step, StepStatus, Card, CardBody, Heading, Text, Button, Link, OpenNewIcon } from '@thedac-space/thedap-uikit'
import { Ifo } from 'config/constants/types'
import { WalletIfoData } from 'hooks/ifo/types'
import { useTranslation } from 'contexts/Localization'
import useTokenBalance from 'hooks/useTokenBalance'
import Container from 'components/layout/Container'
import { getAddress } from 'utils/addressHelpers'

interface Props {
  ifo: Ifo
  walletIfoData: WalletIfoData
}

const Wrapper = styled(Container)`
  background: ${({ theme }) => theme.colors.gradients.bubblegum};
  margin-left: -16px;
  margin-right: -16px;
  padding-top: 48px;
  padding-bottom: 48px;

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-left: -24px;
    margin-right: -24px;
  }
`

const IfoSteps: React.FC<Props> = ({ ifo, walletIfoData }) => {
  const { poolEarly, poolBasic, poolUnlimited } = walletIfoData
  const { t } = useTranslation()
  const { balance } = useTokenBalance(getAddress(ifo.currency.address))
  const stepsValidationStatus = [
    balance.isGreaterThan(0),
    poolEarly.amountTokenCommittedInLP.isGreaterThan(0) || poolBasic.amountTokenCommittedInLP.isGreaterThan(0) || poolUnlimited.amountTokenCommittedInLP.isGreaterThan(0),
    poolEarly.hasClaimed || poolBasic.hasClaimed || poolUnlimited.hasClaimed,
  ]

  const getStatusProp = (index: number): StepStatus => {
    const arePreviousValid = index === 0 ? true : every(stepsValidationStatus.slice(0, index), Boolean)
    if (stepsValidationStatus[index]) {
      return arePreviousValid ? 'past' : 'future'
    }
    return arePreviousValid ? 'current' : 'future'
  }

  const renderCardBody = (step: number) => {

    const isStepValid = stepsValidationStatus[step]
    switch (step) {
      case 0:
        return (
          <CardBody>
            <Heading as="h4" color="secondary" mb="16px">
              {t('Connect Wallet')}
            </Heading>
            <Text color="textSubtle" small mb="16px">
              {t('You’ll need a MetaMask Wallet to participate.')}
            </Text>
            {isStepValid ? (
              <Text color="success" bold>
                {t('USDT ready')}
              </Text>
            ):(   <Text color="error" bold>
            {t('You’ll need USDT')}
          </Text>)}
          </CardBody>
        )
      case 1:
        return (
          <CardBody>
            <Heading as="h4" color="secondary" mb="16px">
              {t('Participate')}
            </Heading>
            <Text color="textSubtle" small>
              {t('You can participate USDT for a MGH DAO membership.')}
            </Text>
          </CardBody>
        )
      case 2:
        return (
          <CardBody>
            <Heading as="h4" color="secondary" mb="16px">
              {t('Claim your membership')}
            </Heading>
            <Text color="textSubtle" small>
              {t('After the MGH membership event finished, you can claim any MGH tokens, and any unspent USDT will be returned to your wallet. This will be possible starting 01.08.21.')} <br />
            </Text>
          </CardBody>
        )
      default:
        return null
    }
  }

  return (
    <Wrapper>
      <Heading as="h2" scale="xl" color="secondary" mb="24px" textAlign="center">
        {t('How to Participate')}
      </Heading>
      <CardBody>
    <Heading as="h4" color="secondary" mb="16px">
      {t('Accept DAO Participation Agreement')}
    </Heading>
    <Text color="textSubtle" small mb="16px">
      {t('You’ll need to accept the DAO Participation Agreement.')}
    </Text>
    <Button
              as={Link}
              external
              href='https://drive.google.com/file/d/1i3D7ivVxBLfuILPy1lA2_dakbzUPqQrX/view?usp=sharing'
              endIcon={<OpenNewIcon color="white" />}
              mt="16px"
            >
              {t('Participation Agreement')}
            </Button>
    </CardBody>
      <Stepper>
        {stepsValidationStatus.map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Step key={index} index={index} status={getStatusProp(index)}>
            <Card>{renderCardBody(index)}</Card>
          </Step>
        ))}
      </Stepper>
    </Wrapper>
  )
}

export default IfoSteps
