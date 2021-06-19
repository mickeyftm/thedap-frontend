import { useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'state'
import { getWeb3NoAccount } from 'utils/web3'
import {setBlock} from './actions'
import { State } from './types'


export const usePollBlockNumber = () => {
  const dispatch = useAppDispatch()
  const web3 = getWeb3NoAccount()

  useEffect(() => {
    const interval = setInterval(async () => {
      const blockNumber = await web3.eth.getBlockNumber()
      dispatch(setBlock(blockNumber))
    }, 6000)

    return () => clearInterval(interval)
  }, [dispatch, web3])
}
// Block
export const useBlock = () => {
  return useSelector((state: State) => state.block)
}

export const useInitialBlock = () => {
  return useSelector((state: State) => state.block.initialBlock)
}

