import { useContext, useRef, useState } from 'react'
import { Alert } from '@mui/material'
import { useNavigate } from 'react-router'

import logo from '../Nav/Netflix_Logo_RGB.png'
import { UserContext } from '../../store/UserContext'
import LoadingPage from '../LoadingPage/LoadingPage'
import '../Login/Login.scss'

export default function Register() {
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const {signup, loadingPage} = useContext(UserContext)
    const navigate = useNavigate()

    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()

    async function handleSubmit(e) {
        e.preventDefault()
        
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Password do not match')
        }

        try {
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            navigate('/')
        } catch (err) {
            setError(err.message.slice(10))
        }

        setLoading(false)
    }

    return (
        loadingPage ? <LoadingPage /> :
        <div className='login' >
            <img 
                src='https://assets.nflxext.com/ffe/siteui/vlv3/5dd45df7-33f1-4274-97ea-e9c6aca69dad/4aaa6dea-d066-49de-86b3-02982cd68812/FI-en-20211108-popsignuptwoweeks-perspective_alpha_website_large.jpg' 
                alt='Background Banner'
                className='banner'
            />
            <img src={logo} alt='Netflix Logo' className='logo' />
            <div className='login-wrapper'>
                <div className='login-table'>
                    <form className='login-form'>
                        <h1>Sign Up</h1>
                        {error && (
                            <Alert 
                                severity='error'
                                sx={{mb: 2, fontSize: 16, width:'320px'}}
                                className='alert'
                            >
                                {error}
                            </Alert>
                        )}
                        <input 
                            type='text' className='btn'
                            placeholder='Email' autoComplete='off'
                            ref={emailRef}
                        />
                        <input 
                            type='password' className='btn'
                            placeholder='Password' autoComplete='off'
                            ref={passwordRef}
                        />
                        <input 
                            type='password' className='btn'
                            placeholder='Password Confirmation' autoComplete='off'
                            ref={passwordConfirmRef}
                        />
                        <button className='sign-in btn' disabled={loading} onClick={handleSubmit}>
                            {loading ? 'Loading...' : 'Sign Up'}
                        </button>
                        <div className='text-box'>
                            <h2 className='text' >Already a member?</h2>
                            <h2 
                                className='text light' 
                                onClick={() => {
                                    setError('')
                                    navigate('/')
                                }} 
                            >
                                Sign in
                            </h2>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
