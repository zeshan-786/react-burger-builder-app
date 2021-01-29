import * as actionTypes from './actionTypes';
import axios from 'axios'


const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = ( idToken, userId ) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: idToken, 
        userId: userId
    }
}

export const authFail = ( error ) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('expiryDate')
    localStorage.removeItem('userId')

    return {
        type: actionTypes.AUTH_LOGOUT
    }
}


export const checkAuthTimeout = ( expiryTime ) => {
    return dispatch => {
        setTimeout( () => {
            dispatch( logout() )
        }, expiryTime * 1000 )
    }
}


export const auth = ( email, password, isSignup ) => {
    return dispatch => {
        dispatch(authStart())
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let method =  isSignup ? 'signUp' : 'signInWithPassword'
        let url = `https://identitytoolkit.googleapis.com/v1/accounts:${method}?key=AIzaSyDuzvA1BJrSiJ_TclWQgc3jwS_Q8Brhc6c`
        axios.post(url, authData)
                .then( res => {
                    // console.log(res.data);
                    const expiryDate = new Date(new Date().getTime() + res.data.expiresIn * 1000)
                    localStorage.setItem('token', res.data.idToken)
                    localStorage.setItem('expiryDate', expiryDate)
                    localStorage.setItem('userId', res.data.localId)
                    dispatch(authSuccess( res.data.idToken, res.data.localId))
                    dispatch(checkAuthTimeout(res.data.expiresIn))
                })
                .catch( err => {
                    // console.log(err.response.data);
                    dispatch(authFail(err.response.data.error)) 
                })
        
    }
}

export const setAuthRedirectPath = ( path ) => {
    return {
        type: actionTypes.SET_REDIRECT_PATH,
        path: path
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token')
        if (!token) {
            dispatch(logout())
        } else {
            const expiryDate = new Date(localStorage.getItem('expiryDate'))
            if (expiryDate <= new Date()) {
                dispatch(logout())
            } else {
                const userId  = localStorage.getItem('userId')
                dispatch(authSuccess(token, userId))
                dispatch(checkAuthTimeout( (expiryDate.getTime() - new Date().getTime())/1000 ) )
            }
        }
    }
}