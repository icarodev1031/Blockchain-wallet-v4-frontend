import React from 'react'
import { connect, ConnectedProps } from 'react-redux'

import { ExtractSuccess, FiatType } from '@core/types'
import { PriceChartPreferenceType } from 'data/preferences/types'
import { RootState } from 'data/rootReducer'

import { getData } from './selectors'
import Loading from './template.loading'
import Success from './template.success'

const CoinPriceChange = ({ currency, data, dispatch, priceChart }: Props) => {
  return data.cata({
    Failure: () => null,
    Loading: () => <Loading />,
    NotAsked: () => <Loading />,
    Success: ({ priceChange }) => (
      <Success
        data={data}
        priceChange={priceChange}
        dispatch={dispatch}
        currency={currency}
        priceChart={priceChart}
      />
    )
  })
}

const mapStateToProps = (state: RootState, ownProps: OwnProps) => ({
  data: getData(state, ownProps)
})

const connector = connect(mapStateToProps)

export type OwnProps = {
  currency: FiatType
  priceChart: PriceChartPreferenceType
}
export type SuccessStateType = ExtractSuccess<ReturnType<typeof getData>>
export type Props = OwnProps & ConnectedProps<typeof connector>

export default connector(CoinPriceChange)
