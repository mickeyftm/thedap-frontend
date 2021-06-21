import React from 'react'
import { useTranslation } from 'contexts/Localization'
import { Route, useRouteMatch, Link } from 'react-router-dom'
import { ButtonMenu, ButtonMenuItem, Flex,Heading, Text,Image } from '@thedac-space/thedap-uikit'
import Page from 'components/layout/Page'
import PageHeader from 'components/PageHeader'
import Container from 'components/layout/Container'
import Hero from './components/Hero'
import CurrentIfo from './CurrentIfo'
import PastIfo from './PastIfo'

const Ifos = () => {
  const { t } = useTranslation()
  const { path, url, isExact } = useRouteMatch()

  return (
    <>
    <PageHeader>
    <Flex justifyContent="space-between" flexDirection={['column', null, null, 'row']}>
      <Flex flex="1" flexDirection="column" mr={['8px', 0]}>
        <Heading as="h1" scale="xxl" color="secondary" mb="24px">
          {t('MGH private DAO offering')}
        </Heading>
        <Heading scale="md" color="text">
          {t('Participate exclusively in MGH DAO private offering.')}
        </Heading>
      </Flex>
    </Flex>
  </PageHeader>
      <Page>
        {/*
        <Flex justifyContent="center" alignItems="center" mb="32px">
          <ButtonMenu activeIndex={!isExact ? 1 : 0} scale="sm" variant="subtle">
            <ButtonMenuItem as={Link} to={`${url}`}>
              {t('Next IDO')}
            </ButtonMenuItem>
            <ButtonMenuItem as={Link} to={`${url}/history`}>
              {t('Past IDOs')}
            </ButtonMenuItem> 
          </ButtonMenu>
        </Flex>
        */}
        <Route exact path={`${path}`}>
          <CurrentIfo />
        </Route>
        <Route path={`${path}/history`}>
          <PastIfo />
        </Route>
      </Page>
    </>
  )
}

export default Ifos
