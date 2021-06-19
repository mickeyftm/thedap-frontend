import React, { lazy } from 'react'
import { Router, Redirect, Route, Switch } from 'react-router-dom'
import { ResetCSS } from '@thedac-space/thedap-uikit'
import BigNumber from 'bignumber.js'
import useEagerConnect from 'hooks/useEagerConnect'
import {  usePollBlockNumber } from 'state/hooks'
import GlobalStyle from './style/Global'
import Menu from './components/Menu'
import SuspenseWithChunkError from './components/SuspenseWithChunkError'
import ToastListener from './components/ToastListener'
import PageLoader from './components/PageLoader'
import history from './routerHistory'

// Route-based code splitting
// Only pool is included in the main bundle because of it's the most visited page
const Home = lazy(() => import('./views/Home'))
const Ifos = lazy(() => import('./views/Ifos'))
const NotFound = lazy(() => import('./views/NotFound'))
/*

const Profile = lazy(() => import('./views/Profile'))
const Farms = lazy(() => import('./views/Farms'))
const Profile = lazy(() => import('./views/Profile'))
const Lottery = lazy(() => import('./views/Lottery'))
const Collectibles = lazy(() => import('./views/Collectibles'))
const Teams = lazy(() => import('./views/Teams'))
const Team = lazy(() => import('./views/Teams/Team'))
const TradingCompetition = lazy(() => import('./views/TradingCompetition'))
const Predictions = lazy(() => import('./views/Predictions'))
*/
// This config is required for number formatting
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const App: React.FC = () => {
  usePollBlockNumber()
  useEagerConnect()

  /**
   * useFetchProfile()
   * usePollCoreFarmData()
  */

  return (
    <Router history={history}>
      <ResetCSS />
      <GlobalStyle />
      <Menu>
        <SuspenseWithChunkError fallback={<PageLoader />}>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/ido">
              <Ifos />
              </Route>
              {/*
            <Route path="/profile">
              <Profile />
            </Route>
             Redirect 
                        <Route path="/nft">
              <Redirect to="/home" />
            </Route>
            */}
            {/* 404 */}
            <Route component={NotFound} />
          </Switch>
        </SuspenseWithChunkError>
      </Menu>
      {/*
        <EasterEgg iterations={2} />
      */}
      <ToastListener />
    </Router>
  )
}

export default React.memo(App)
