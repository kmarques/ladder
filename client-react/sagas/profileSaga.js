/**
 * Created by karl on 05/02/2017.
 */
'use strict';

import {put, call} from 'redux-saga/effects';
import {connect, refreshToken} from '../Api/profile';
import * as types from '../constants/actionTypes';
import jwtDecode from 'jwt-decode';

// Responsible for searching media library, making calls to the API
// and instructing the redux-saga middle ware on the next line of action,
// for success or failure operation.
export function* connectSaga({payload}) {
  try {
    const res = yield call(connect, payload);
    localStorage.setItem('token', res.token);

    const profile = jwtDecode(localStorage.getItem('token'));

    yield put({type: types.PROFILE_CONNECT_SUCCESS, profile});
    yield put({type: types.UI_MODAL_LOGIN_TOGGLE});
  } catch (error) {
    yield put({type: types.PROFILE_CONNECT_ERROR, error});
  }
}

export function* refreshTokenSaga({payload}) {
  try {
    const res = yield call(refreshToken, payload);
    localStorage.setItem('token', res.token);

    const profile = jwtDecode(localStorage.getItem('token'));

    yield put({type: types.PROFILE_CONNECT_SUCCESS, profile});
  } catch (error) {
    yield put({type: types.PROFILE_LOGOUT_REQUEST, error});
  }
}

export function* logoutSaga({}) {
  localStorage.removeItem('token');
  yield put({type: types.PROFILE_LOGOUT_SUCCESS, profile: {admin: false, logged: false}});
  yield put({type: types.UI_ADMIN_ACTION_TOGGLE, open: false});
}