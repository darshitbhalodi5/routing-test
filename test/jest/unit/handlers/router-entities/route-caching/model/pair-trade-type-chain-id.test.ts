import { PairTradeTypeChainId } from '../../../../../../../lib/handlers/router-entities/route-caching'
import { ChainId, TradeType } from 'udonswap-core'
import { describe, it, expect } from '@jest/globals'

describe('PairTradeTypeChainId', () => {
  const WETH = '0x4200000000000000000000000000000000000006'
  const USDC = '0x4Cc496ca61683944f20a1C4796761273EE74FB62'

  describe('toString', () => {
    it('returns a stringified version of the object', () => {
      const pairTradeTypeChainId = new PairTradeTypeChainId({
        tokenIn: WETH,
        tokenOut: USDC,
        tradeType: TradeType.EXACT_INPUT,
        chainId: ChainId.MODE,
      })

      expect(pairTradeTypeChainId.toString()).toBe(
        `${WETH.toLowerCase()}/${USDC.toLowerCase()}/${TradeType.EXACT_INPUT}/${ChainId.MODE}`
      )
    })

    it('token addresses are converted to lowercase', () => {
      const pairTradeTypeChainId = new PairTradeTypeChainId({
        tokenIn: WETH.toUpperCase(),
        tokenOut: USDC.toUpperCase(),
        tradeType: TradeType.EXACT_INPUT,
        chainId: ChainId.MODE,
      })

      expect(pairTradeTypeChainId.toString()).toBe(
        `${WETH.toLowerCase()}/${USDC.toLowerCase()}/${TradeType.EXACT_INPUT}/${ChainId.MODE}`
      )
    })

    it('works with ExactOutput too', () => {
      const pairTradeTypeChainId = new PairTradeTypeChainId({
        tokenIn: WETH.toUpperCase(),
        tokenOut: USDC.toUpperCase(),
        tradeType: TradeType.EXACT_OUTPUT,
        chainId: ChainId.MODE,
      })

      expect(pairTradeTypeChainId.toString()).toBe(
        `${WETH.toLowerCase()}/${USDC.toLowerCase()}/${TradeType.EXACT_OUTPUT}/${ChainId.MODE}`
      )
    })

    // it('works with other chains', () => {
    //   const pairTradeTypeChainId = new PairTradeTypeChainId({
    //     tokenIn: WETH.toUpperCase(),
    //     tokenOut: USDC.toUpperCase(),
    //     tradeType: TradeType.EXACT_OUTPUT,
    //     chainId: ChainId.ARBITRUM_ONE,
    //   })

    //   expect(pairTradeTypeChainId.toString()).toBe(
    //     `${WETH.toLowerCase()}/${USDC.toLowerCase()}/${TradeType.EXACT_OUTPUT}/${ChainId.ARBITRUM_ONE}`
    //   )
    // })
  })
})
