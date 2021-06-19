import React from 'react'
import styled from 'styled-components'
import { Heading, Text, BaseLayout } from '@thedac-space/thedap-uikit'
import { useTranslation } from 'contexts/Localization'
import Page from 'components/layout/Page'


const Hero = styled.div`
  align-items: center;
  background-repeat: no-repeat;
  background-position: top center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: auto;
  margin-bottom: 32px;
  padding-top: 116px;
  text-align: center;



`

const Cards = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
  margin-bottom: 24px;
  grid-gap: 24px;

  & > div {
    grid-column: span 6;
    width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    margin-bottom: 32px;
    grid-gap: 32px;

    & > div {
      grid-column: span 6;
    }
  }
`

const CTACards = styled(BaseLayout)`
  align-items: start;
  margin-bottom: 24px;
  grid-gap: 24px;

  & > div {
    grid-column: span 6;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    margin-bottom: 32px;
    grid-gap: 32px;

    & > div {
      grid-column: span 4;
    }
  }
`

const Home: React.FC = () => {
  const { t } = useTranslation()

  return (
    <Page>
        <Heading as="h1" scale="xl" mb="24px" color="secondary">
          {t('thedap.space')}
        </Heading>
        <Text>
          <br />
          {t('Lorem ipsum.')}<br />
          {t('dolor at enum.')}<br />
          </Text>
      <div style={{
    paddingTop: '50px',
  }}>
        {/*
        <Cards>
          <FarmStakingCard />
          <LotteryCard />
        </Cards>
        */}
        <CTACards>
          {/*
          <EarnAPRCard />
          */}
        </CTACards>
        {/*
        <Cards>
          <CakeStats />
          <TotalValueLockedCard />
        </Cards>
      */}
      </div>
    </Page>
  )
}

export default Home
