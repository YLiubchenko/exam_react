let initialState = {
    isAuth: false,
    userId: null,
    fullName: null
}

export const isSingIn = (isAuth, userId, fullName) => {
    return {
        type: 'LOGIN',
        payload: {
            isAuth, userId, fullName
        },
    }
}

export const setLogin = (state = initialState, action) => {

    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                isAuth: action.payload.isAuth,
                userId: action.payload.userId,
                fullName: action.payload.fullName
            };
        default:
            return state;
    }
}

