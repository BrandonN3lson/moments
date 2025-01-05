import axios from "axios";
import { useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom"

export const useRedirect = (userAuthStatus) => {
    const history = useHistory();

    useEffect(() => {
        const handleMount = async () => {
            try {
                await axios.post('/dj-rest-auth/token/refresh/')
                // if user is logged in this code will run
                
                if (userAuthStatus === 'loggedIn') {
                    history.push('/')
                }

            } catch (error) {
                console.log(error)
                if (userAuthStatus === 'loggedOut') {
                    history.push('/')
                }
            }
        }
        handleMount()
    }, [history, userAuthStatus])
}