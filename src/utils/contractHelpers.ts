import Web3 from 'web3'
import { AbiItem } from 'web3-utils'
import web3NoAccount from 'utils/web3'

// Addresses
import {
  getCakeAddress,
  getPointCenterIfoAddress,
  getClaimRefundAddress,
  getChainlinkOracleAddress,
} from 'utils/addressHelpers'

// ABI
import bep20Abi from 'config/abi/erc20.json'
import erc721Abi from 'config/abi/erc721.json'
import ifoV1Abi from 'config/abi/ifoV1.json'
import ifoV2Abi from 'config/abi/ifoV2.json'
import pointCenterIfo from 'config/abi/pointCenterIfo.json'
import claimRefundAbi from 'config/abi/claimRefund.json'
import chainlinkOracleAbi from 'config/abi/chainlinkOracle.json'
import { DEFAULT_GAS_PRICE } from 'config'
import { getSettings, getGasPriceInWei } from './settings'

const getContract = (abi: any, address: string, web3?: Web3, account?: string) => {
  const _web3 = web3 ?? web3NoAccount
  const gasPrice = account ? getSettings(account).gasPrice : DEFAULT_GAS_PRICE

  return new _web3.eth.Contract(abi as unknown as AbiItem, address, {
    gasPrice: getGasPriceInWei(gasPrice).toString(),
  })
}

export const getBep20Contract = (address: string, web3?: Web3) => {
  return getContract(bep20Abi, address, web3)
}
export const getErc721Contract = (address: string, web3?: Web3) => {
  return getContract(erc721Abi, address, web3)
}

export const getIfoV1Contract = (address: string, web3?: Web3) => {
  return getContract(ifoV1Abi, address, web3)
}
export const getIfoV2Contract = (address: string, web3?: Web3) => {
  return getContract(ifoV2Abi, address, web3)
}

export const getPointCenterIfoContract = (web3?: Web3) => {
  return getContract(pointCenterIfo, getPointCenterIfoAddress(), web3)
}

export const getClaimRefundContract = (web3?: Web3) => {
  return getContract(claimRefundAbi, getClaimRefundAddress(), web3)
}

export const getChainlinkOracleContract = (web3?: Web3) => {
  return getContract(chainlinkOracleAbi, getChainlinkOracleAddress(), web3)
}
