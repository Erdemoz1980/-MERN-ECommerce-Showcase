import { useState, useEffect, useRef} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updatePassword, reset } from '../slices/userSlice';
import Alert from '../components/Alert';
import EyeClosedIcon from '../components/EyeClosedIcon';
import EyeOpenIcon from '../components/EyeOpenIcon';
import { Link } from 'react-router-dom';

const ChangePasswordPage = () => {
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword:'',
    newPasswordConfirm:''
  });
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showNewPasswordConfirm, setShowNewPasswordConfirm] = useState(false)
  const [passwordAlert, setPasswordAlert] = useState(false)
  const [formValidated, setFormValidated] = useState(true);

  const { oldPassword, newPassword, newPasswordConfirm } = passwordData;

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { userInfo, errMessage, success } = useSelector(state => state.user);

  const formSubmittedRef = useRef(false);

  useEffect(() => {
    if (!userInfo) {
      navigate('/')
    }
    setPasswordAlert(success ?
      'You have successfully updated your password!' :
      errMessage)
    
      return () => {
        if (!formSubmittedRef.current) {
          dispatch(reset());
        }
      };

  }, [userInfo, navigate, success, errMessage, dispatch]);
  
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setPasswordData(prevState => ({
      ...prevState,
      [name]: value
    }
    ))
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (newPassword !== newPasswordConfirm) {
      setPasswordAlert('Passwords do not match!')
      setTimeout(() => {
        setPasswordAlert(false)
      }, 5000)
      return setFormValidated(false)
    }
  
    dispatch(updatePassword({ _id: userInfo._id, oldPassword, newPassword }))
    formSubmittedRef.current = true
    setFormValidated(true)
    setPasswordData({ oldPassword: '', newPassword: '', newPasswordConfirm: '' })
   
    setTimeout(() => {
      dispatch(reset())
    }, 3000)
  };

  return (
    <div className='container form-wrapper'>
      <Link to={`/user/account/${userInfo._id}`}><button className='btn btn-navigate btn-navigate-profile'>Go Back</button></Link>
      {passwordAlert  && <Alert message={passwordAlert} type={success ? 'success' :'error'} />}
      <h1>Enter New Password</h1>
      <form onSubmit={submitHandler} className='login-register-form'>
        <div className="form-group">
          <label htmlFor="oldPassword">Enter Old Password</label>
          <input className={errMessage ? 'alert' : ''} type={showOldPassword ? "text" : "password"} name="oldPassword" id="oldPassword" value={oldPassword} onChange={onChangeHandler} required />
          {showOldPassword ? <div onClick={() => setShowOldPassword(false)}><EyeOpenIcon/></div> : <div onClick={()=>setShowOldPassword(true)}><EyeClosedIcon/></div> }
        </div>
        <div className="form-group">
          <label htmlFor="newPassword">New Password</label>
          <input className={!formValidated ? 'alert' : ''} type={showNewPassword ? "text" : "password"}  name="newPassword" id="newPassword" value={newPassword} onChange={onChangeHandler} required />
          {showNewPassword ? <div onClick={() => setShowNewPassword(false)}><EyeOpenIcon/></div> : <div onClick={()=>setShowNewPassword(true)}><EyeClosedIcon/></div> }
        </div>
        <div className="form-group">
          <label htmlFor="newPasswordConfirm">Confirm New Password</label>
          <input className={!formValidated ? 'alert' : ''} type={showNewPasswordConfirm ? "text" : "password"}  name="newPasswordConfirm" id="newPasswordConfirm" value={newPasswordConfirm} onChange={onChangeHandler} required />
          {showNewPasswordConfirm ? <div onClick={() => setShowNewPasswordConfirm(false)}><EyeOpenIcon/></div> : <div onClick={()=>setShowNewPasswordConfirm(true)}><EyeClosedIcon/></div> }
        </div>
        <button className="btn btn-submit">Submit</button>
      </form>
    </div>
  )
}

export default ChangePasswordPage