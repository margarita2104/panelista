import PageRoutes from './routes'
import {useDispatch} from 'react-redux'
import {useEffect} from 'react'
import useAutoFetch from "./hook/useAutoFetch.jsx";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner.jsx";
import {login_user, logout_user} from "./store/slices/UserSlice.js";


const App = () => {
    const dispatch = useDispatch()
    const accessToken = localStorage.getItem('accessToken')


    const {error, loading} = useAutoFetch(accessToken)

    useEffect(() => {
        if (error === null) {
            dispatch(login_user(accessToken))
        } else {
            dispatch(logout_user())
            localStorage.clear()
        }
    }, [error, accessToken, dispatch])

    if (loading) return <LoadingSpinner/>

    return <PageRoutes/>
}

export default App
