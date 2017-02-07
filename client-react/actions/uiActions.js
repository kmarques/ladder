/**
 * Created by karl on 05/02/2017.
 */
'use strict';

import * as types from '../constants/actionTypes';

export const drawerToggleAction = () => ({
  type: types.UI_DRAWER_TOGGLE
});

export const modalNewGameToggleAction = () => ({
  type: types.UI_MODAL_NEW_GAME_TOGGLE
});

export const modalLoginToggleAction = () => ({
  type: types.UI_MODAL_LOGIN_TOGGLE
});