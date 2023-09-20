import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { register, reset } from '../slices/userSlice';
import Alert from '../components/Alert';

const RegisterPage = () => {
  const [userData, setUserData] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirm: '',
    address: {
      streetNo: '',
      streetName: '',
      postalCode: '',
      province: '',
      country: 'Canada'
    }
  });
  const [alertRegister, setAlertRegister] = useState(false);

  const { name, lastName, email, password, passwordConfirm, address:{streetNo, streetName, postalCode, province, country} } = userData
  

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { userInfo, provinces, errMessage } = useSelector(state => state.user)

  const formSubmittedRef = useRef(false)
  useEffect(() => {
    if (userInfo) {
      navigate('/')
    }

    return () => {
      if (!formSubmittedRef.current) {
        dispatch(reset())
      }
    }
  },[userInfo, navigate, dispatch])

  const onChangeHandler = (e) => {
    const { name, value } = e.target
    let updatedUserData = { ...userData };
    
    if (name.startsWith('address')) {
      const addressField = name.split('.')[1]
      updatedUserData = {
        ...userData,
        address: {
          ...userData.address,
          [addressField]: value
        }
      }
    } else {
      updatedUserData = {
        ...userData,
        [name]: value
      }
    }
    setUserData(updatedUserData)
  };

  const submitHandler = (e) => {
    e.preventDefault();
     if (password !== passwordConfirm) {
       setAlertRegister('Passwords do not match!')
       setTimeout(() => {
         setAlertRegister(false)
       },5000)
       return;
    }
    dispatch(register(userData))
    setAlertRegister(false)
  };

  return (
    <div className='container form-wrapper'>
      {(alertRegister || errMessage) && <Alert message={alertRegister ? alertRegister : errMessage} type='error' />}
      <h1>Sign Up</h1>
      <form onSubmit={submitHandler} className='login-register-form'>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" value={name} onChange={onChangeHandler} required/>
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input type="text" name="lastName" id="lastName" value={lastName}  onChange={onChangeHandler} required/>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" value={email} onChange={onChangeHandler} required/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" value={password} onChange={onChangeHandler} required />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input type="password" name="passwordConfirm" id="confirmPassword" value={passwordConfirm} onChange={onChangeHandler} required />
        </div>

        <div className="form-group-address">   
          <h4>Address</h4>

          <div className="form-group">
          <label htmlFor="streetNo">Street No</label>
          <input type="text" name="address.streetNo" id="streetNo" value={streetNo} onChange={onChangeHandler} required/>
        </div>
        <div className="form-group">
          <label htmlFor="streetName">Unit no & Street Name</label>
          <input type="text" name="address.streetName" id="streetName" value={streetName} onChange={onChangeHandler} required />
        </div>
        <div className="form-group">
          <label htmlFor="postalCode">Postal Code</label>
          <input type="text" name="address.postalCode" id="postalCode" value={postalCode} onChange={onChangeHandler} required/>
        </div>
        <div className="form-group">
          <label htmlFor="province">Province</label>
          <select name="address.province" id="province" value={province} onChange={onChangeHandler} required>
            {provinces.map((item, index) => (
              <option key={index} value={item}>{item}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="country">Country</label>
          <input type="text" name="country" id="country" value={country} readOnly />
        </div>
          
        </div>

        <button className="btn btn-submit">Submit</button>
      </form>
      <div className="form-redirect-wrapper">
      <p>Already registered? Sign in <Link to='/login' className='redirect-link'>here</Link></p>
      </div>
      </div>
  )
}

export default RegisterPage