import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { login, reset } from '../slices/userSlice';
import Alert from '../components/Alert';
import EyeClosedIcon from '../components/EyeClosedIcon';
import EyeOpenIcon from '../components/EyeOpenIcon';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email:'',
    password:'',
    passwordConfirm:''
  });
  const [loginAlert, setLoginAlert] = useState(false)
  const [showPassword, setShowPassword] = useState({
    password: false,
    passwordConfirm:false
  })

  const { email, password, passwordConfirm } = formData;

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { userInfo, success, errMessage } = useSelector(state => state.user);
  
  const formSubmittedRef = useRef(false);

  useEffect(() => {
    if (userInfo) {
      navigate('/')
    }
    
    return () => {
      if (!formSubmittedRef.current) {
        dispatch(reset());
      }
    }
  },[navigate, userInfo, dispatch])

  const onChangeHandler = (e) => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      setLoginAlert('Passwords do not match!')
    } else {
      setLoginAlert(false)
      dispatch(login({ email, password }));
    } 
  };

  return (
    <div className='container form-wrapper login-form'>
      {(loginAlert || errMessage)  && <Alert message={loginAlert ? loginAlert : errMessage} type='error' />}
      <h1>Sign In</h1>
      <form onSubmit={submitHandler} className='login-register-form'>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" value={email} onChange={onChangeHandler} required />
          
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type={showPassword.password ? 'text' : 'password'} name="password" id="password" value={password} onChange={onChangeHandler} required />
          {showPassword.password ? <div onClick={()=>setShowPassword(prevState=>({...prevState, password:false}))} ><EyeOpenIcon /></div> : <div onClick={()=>setShowPassword(prevState=>({...prevState,password:true}))}><EyeClosedIcon /></div>}
        </div>
        <div className="form-group">
          <label htmlFor="passwordConfirm">Confirm Password</label>
          <input type={showPassword.passwordConfirm ? 'text' : 'password'} name="passwordConfirm" id="passwordConfirm" value={passwordConfirm} onChange={onChangeHandler} required />
          {showPassword.passwordConfirm ? <div onClick={()=>setShowPassword(prevState=>({...prevState, passwordConfirm:false}))} ><EyeOpenIcon /></div> : <div onClick={()=>setShowPassword(prevState=>({...prevState, passwordConfirm:true}))}><EyeClosedIcon /></div>}
        </div>
        <button className="btn btn-submit">Submit</button>
      </form>
      <div className="form-redirect-wrapper">
        <p>Not registered? Register <Link to='/register'>here</Link></p>
      </div>
    </div>
  )
}

export default LoginPage;