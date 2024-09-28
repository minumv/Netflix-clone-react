import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext';

const Login = () => {
  const [ rememberLogin, setRememberLogin] = useState(true);
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ error, setError ] = useState('')

  const { user, logIn} = UserAuth();
  const navigate = useNavigate();

  const getErrorMessage = (error) => {
    switch (error){
      case 'auth/invalid-credential':
        return 'Invalid credentials!';
      case 'auth/email-already-in-use':
        return 'Email is already in use';
      case 'auth/weak-password':
        return 'Password is too weak';
      default:
        return 'An unexpected error occurred. Please try again.';
    }
  };
    
  

  const handleFormSubmit = async (e) => {
      e.preventDefault();
      setError('')
      
    try {
      await logIn(email, password);
      navigate('/')
      console.log("Successfully logged in.")
    } catch (error) {
      console.log("Error in ligin:", error)
      const errorMessage = getErrorMessage(error.code);  
      setError(errorMessage);
    }
  }

  return (
    <>
      <div className='w-full h-screen'>
        <img 
          className='hidden sm:block absolute w-full h-full object-cover'
          src="https://assets.nflxext.com/ffe/siteui/vlv3/85ff76db-39e5-423a-afbc-97d3e74db71b/null/IN-en-20240909-TRIFECTA-perspective_b22117e0-4610-4d57-a695-20f77d241a4a_large.jpg" 
          alt=""/>

          <div className='bg-black/70 fixed top-0 left-0 w-full h-screen' />

          <div className='fixed w-full px-4 py-24 z-20'>
              <div className='max-w-[450px] h-[600px] mx-auto bg-black/80 rounded-lg'>
                  <div className='max-w-[320px] mx-auto py-16'>
                    <h1 className='text-3xl font-nsans-bold'>Sign In</h1>

                    <form 
                      className='w-full flex flex-col py-4'
                      onSubmit={handleFormSubmit}
                    >
                      {error && <p className='bg-red-400 text-gray-200'>{error}</p>}
                        <input
                          className='p-3 my-2 bg-gray-700 rounded'
                          type='email'
                          placeholder='email'
                          autoComplete='email'
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />

                        <input      
                          className='p-3 my-2 bg-gray-700 rounded'
                          type='password'
                          placeholder='password'
                          autoComplete='current-password' 
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />

                        <button className='bg-red-600 py-3 my-6 rounded font-nsans-bold'>
                          Sign In
                        </button>

                        <div className='flex justify-between items-center text-gray-600'>
                          <p>
                            <input 
                              type='checkbox' 
                              className='mr-2'
                              checked={rememberLogin}
                              onChange={(e) => setRememberLogin(!rememberLogin)}
                            />
                            Remember me
                          </p>
                          <p>Need Help?</p>
                        </div>

                        <p className='my-4'>
                          <span className='text-gray-600 mr-2'>New to Netflix?</span>
                          <Link to='/signup'>Sign up now.</Link>
                        </p>
                        
                    </form>
                  </div>
              </div>
          </div>
      </div>
    </>
  )
}

export default Login