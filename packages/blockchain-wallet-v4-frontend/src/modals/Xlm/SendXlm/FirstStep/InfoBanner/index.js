import React from 'react'
import { FormattedMessage } from 'react-intl'
import { BigNumber } from 'bignumber.js'
import { mapObjIndexed, prop } from 'ramda'
import styled from 'styled-components'

import { Exchange } from '@core'
import Currencies from '@core/exchange/currencies'
import { Banner } from 'blockchain-info-components'
import { model } from 'data'

import ModalIcon from '../ModalIcon'

const currencySymbolMap = mapObjIndexed((value, code) => value.units[code].symbol, Currencies)

const { RESERVE_LEARN_MODAL } = model.components.sendXlm

const BannerTemplate = styled(Banner)`
  > div {
    width: 100%;
    align-items: center;
  }
  margin-bottom: 16px;
`

export const InfoBanner = (props) => {
  const effectiveBalance = prop('effectiveBalance', props)
  const reserve = prop('reserve', props)
  const fee = prop('fee', props)
  const reserveXlm = Exchange.convertCoinToCoin({
    coin: 'XLM',
    value: reserve
  })
  const currency = prop('currency', props)
  const rates = prop('rates', props)
  const effectiveBalanceFiat = Exchange.convertCoinToFiat({
    coin: 'XLM',
    currency,
    rates,
    value: new BigNumber.sum(effectiveBalance, fee)
  })
  const effectiveBalanceXlm = Exchange.convertCoinToCoin({
    coin: 'XLM',
    value: new BigNumber.sum(effectiveBalance, fee)
  })
  const modalProps = { currency, effectiveBalanceXlm, fee, rates, reserveXlm }

  return (
    <BannerTemplate data-e2e='sendXlmBalanceBanner'>
      <FormattedMessage
        id='modals.sendxlm.reserveinfo'
        defaultMessage='Your available balance is {currencySymbol}{effectiveBalanceFiat} (minus fee). Learn about Stellar’s minimum balance.'
        values={{
          currencySymbol: currencySymbolMap[currency],
          effectiveBalanceFiat
        }}
      />
      <ModalIcon modal={RESERVE_LEARN_MODAL} {...modalProps} />
    </BannerTemplate>
  )
}
