import { encodeSqrtRatioX96, Pool } from 'udonswap-v3'
import { FeeAmount } from '../utils/ticks'
import {
  DAI_MODE as DAI,
  USDC_MODE as USDC,
  USDT_MODE as USDT,
  WRAPPED_NATIVE_CURRENCY,
} from 'udonswap-smart-order-router-v3/build/main/index'
import { V3PoolAccessor } from 'udonswap-smart-order-router-v3/build/main/providers/v3/pool-provider'
import _ from 'lodash'
import { ChainId, Currency, Ether, WETH9 } from 'udonswap-core'
import { DAI_ON, USDC_ON, USDT_ON } from '../utils/tokens'
import { WBTC_MODE } from 'udonswap-smart-order-router-v3'

export const USDC_DAI_LOW = new Pool(USDC, DAI, FeeAmount.LOW, encodeSqrtRatioX96(1, 1), 10, 0)
export const USDC_DAI_MEDIUM = new Pool(USDC, DAI, FeeAmount.MEDIUM, encodeSqrtRatioX96(1, 1), 8, 0)
export const USDC_WETH_LOW = new Pool(
  USDC,
  WRAPPED_NATIVE_CURRENCY[919]!,
  FeeAmount.LOW,
  encodeSqrtRatioX96(1, 1),
  500,
  0
)
export const WETH9_USDT_LOW = new Pool(
  WRAPPED_NATIVE_CURRENCY[919]!,
  USDT,
  FeeAmount.LOW,
  encodeSqrtRatioX96(1, 1),
  200,
  0
)
export const DAI_USDT_LOW = new Pool(DAI, USDT, FeeAmount.LOW, encodeSqrtRatioX96(1, 1), 10, 0)
export const SUPPORTED_POOLS: Pool[] = [USDC_DAI_LOW, USDC_DAI_MEDIUM, USDC_WETH_LOW, WETH9_USDT_LOW, DAI_USDT_LOW]

export const buildMockV3PoolAccessor: (pools: Pool[]) => V3PoolAccessor = (pools: Pool[]) => {
  return {
    getAllPools: () => pools,
    getPoolByAddress: (address: string) =>
      _.find(pools, (p) => Pool.getAddress(p.token0, p.token1, p.fee).toLowerCase() == address.toLowerCase()),
    getPool: (tokenA, tokenB, fee) =>
      _.find(pools, (p) => Pool.getAddress(p.token0, p.token1, p.fee) == Pool.getAddress(tokenA, tokenB, fee)),
  }
}

export type Portion = {
  bips: number
  recipient: string
  type: string
}

export const PORTION_BIPS = 12
export const PORTION_RECIPIENT = '0xd8da6bf26964af9d7eed9e03e53415d37aa96045'
export const PORTION_TYPE = 'flat'

export const FLAT_PORTION: Portion = {
  bips: PORTION_BIPS,
  recipient: PORTION_RECIPIENT,
  type: PORTION_TYPE,
}

export const GREENLIST_TOKEN_PAIRS: Array<[Currency, Currency]> = [
  [Ether.onChain(ChainId.MODE), USDC_ON(ChainId.MODE)],
  [WETH9[ChainId.MODE], USDT_ON(ChainId.MODE)],
  [DAI_ON(ChainId.MODE), WBTC_MODE],
]
