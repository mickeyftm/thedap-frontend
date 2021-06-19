import { ThunkAction } from 'redux-thunk'
import { AnyAction } from '@reduxjs/toolkit'


export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, State, unknown, AnyAction>

export type TranslatableText =
  | string
  | {
      key: string
      data?: {
        [key: string]: string | number
      }
    }

export type SerializedBigNumber = string


// Slices states



// Block

export interface BlockState {
  currentBlock: number
  initialBlock: number
}



export enum HistoryFilter {
  ALL = 'all',
  COLLECTED = 'collected',
  UNCOLLECTED = 'uncollected',
}


// Global state

export interface State {
  block: BlockState
}
