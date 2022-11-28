import {configureStore} from '@reduxjs/toolkit'
import AuthReduser from './features/authSlice'
import tourReduser from './features/authSlice'

export default configureStore({
    reducer:{
        auth: AuthReduser,
        tour:tourReduser,
    }
})