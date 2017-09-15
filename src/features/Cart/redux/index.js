import _ from 'lodash';
import {
  combineActions,
  createTypes,
  createAsyncTypes,
  handleActions,
} from 'berkeleys-redux-utils';
import { createAction } from 'redux-actions';

const ns = 'cart';

export const types = createTypes(
  [
    createAsyncTypes('cartUpdate'),
    'commerceInitiated',
  ],
  ns,
);

export const cartUpdateStarted = createAction(types.cartUpdate.start);
export const cartUpdateCompleted = createAction(types.cartUpdate.complete);
export const cartUpdateFailed = createAction(types.cartUpdate.error);
export const commerceInitiated = createAction(types.commerceInitiated);

const defaultState = {
  items: {},
  subtotal: {},
  discount: {},
  couponDiscount: {},
  memberDiscount: {},
  taxes: {},
  total: {},
};

const getNS = state => state[ns];
export const itemsSelector = state => _.map(getNS(state).items, item => item);
export const totalSelector = state => getNS(state).total;
export const numInCartSelector = state =>
  _.reduce(getNS(state).items, (numOf, item) => numOf + item.quantity, null);

export default handleActions(
  () => ({
    [combineActions(types.cartUpdate.complete, types.commerceInitiated)]: (
      state,
      { payload: cart },
    ) => ({
      ...cart,
    }),
  }),
  defaultState,
  ns,
);
