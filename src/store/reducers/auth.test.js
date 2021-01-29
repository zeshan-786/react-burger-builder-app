import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('Auth Reducer', () => {
    it('Should return the initial state', () => {
        expect( reducer( undefined, {}) ).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        })
    })

    // it('Should store on login', () => {
    //     expect( reducer({
    //         token: null,
    //         userId: null,
    //         error: null,
    //         loading: false,
    //         authRedirectPath: '/'
    //     }, {
    //         type: actionTypes.AUTH_SUCCESS,
    //         idToken: 'some-token',
    //         userId: 'some-user-id '
    //     }) ).toEqual({
    //         idToken: 'some-token',
    //         userId: 'some-user-id ',
    //         error: null,
    //         loading: false,
    //         authRedirectPath: '/'
    //     })
    // })
})