import Promise from 'es6-promise'


const LOGIN_PENDING = 'LOGIN_PENDING'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGIN_ERROR = 'LOGIN_ERROR'

 export function setLoginPending(isLoginPending) {
    return {
        type: LOGIN_PENDING,
        isLoginPending
    }
}

 export function setLoginSuccess(isLoginSuccess) {
    return {
        type: LOGIN_SUCCESS,
        isLoginSuccess,
    }
}

export function setLoginError(loginError) {
    return {
        type: LOGIN_ERROR,
        loginError,
    }
}










 function reducer (state= {
    isLoginPending: false,
    isLoginSuccess: false,
    loginError: false,
}, action ) {

    switch (action.type) {
        case LOGIN_PENDING:
            return {
                ...state,
                isLoginPending: action.isLoginPending
            };

        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoginSuccess: action.isLoginSuccess
            };

       

        case LOGIN_ERROR:
            return {
                ...state,
                loginError: action.loginError
            };


            default: 
            return state;
    }
}
export default reducer

export function login(username, password) {
    return dispatch => {
        dispatch(setLoginPending(true));
        dispatch(setLoginSuccess(false));
        dispatch(setLoginError(false));

        loginUser(username, password)
        .then(success => {
            dispatch(setLoginPending(false));
            dispatch(setLoginSuccess(true));
        })
        .catch(err => {
            dispatch(setLoginPending(false));
            dispatch(setLoginSuccess(false));
            dispatch(setLoginError(true));
        })
    
        
    }
}

export async function loginUser( username, password) {
    const response = await fetch('http://34.245.213.76:3000/auth/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username,
            password,
        }),
    })
    const data = await response.json()
 return new Promise((resolve, reject) =>{
    if (username === 'candidate' && password === 'P@ssw0rd') {
        localStorage.setItem('token', data.accessToken)
        window.location.href = '/books'
       return resolve(true)
       
    } else {
        return reject (new Error('Invalid Username or Password'))
    }
})
    
}
