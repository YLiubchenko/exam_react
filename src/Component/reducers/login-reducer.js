let initialState = {
    isAuth: false,
    userId: null,
    fullName: null,
    isTeacher: null
}

export const isSingIn = (isAuth, userId, fullName, isTeacher) => {
    return {
        type: 'LOGIN',
        payload: {
            isAuth, userId, fullName, isTeacher
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
                fullName: action.payload.fullName,
                isTeacher: action.payload.isTeacher,
            };
        default:
            return state;
    }
}

