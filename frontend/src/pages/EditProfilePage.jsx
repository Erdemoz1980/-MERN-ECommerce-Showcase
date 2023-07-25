import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Alert from '../components/Alert';
import { updateUser, reset } from '../slices/userSlice';
import { Link } from 'react-router-dom';

const EditPropfilePage = () => {
  const { userInfo, errMessage, success } = useSelector(state => state.user);
  const [userData, setUserData] = useState({
    _id:'',
    name:'',
    lastName:'',
    address: {
      streetNo: '',
      streetName:  '',
      postalCode: '',
      province: '',
      country: ''
    }
  });
  const [profileAlert, setProfileAlert] = useState(false)
  const [formValidated, setFormValidated] = useState({
    name: true,
    lastName: true,
    address: {
      streetNo: true,
      streetName: true,
      postalCode: true
    }
  });

  const { name, lastName, address: { streetNo, streetName, postalCode, province, country } } = userData;

  const provinces = ['AB', 'BC', 'MB', 'NB', 'NL', 'NS', 'ON', 'PE', 'QC', 'SK'];

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const formSubmittedRef = useRef(false);

  useEffect(() => {
    if (!userInfo) {
      navigate('/')
    }
    setProfileAlert(success ? 'You have successfully updated your profile!' : errMessage)
    
    if (userInfo) {
      setUserData({
        _id: userInfo._id,
        name: userInfo.name,
        lastName: userInfo.lastName,
        email: userInfo.email,
        password: userInfo.password,
        address: {
          streetNo: userInfo?.address?.streetNo,
          streetName: userInfo?.address?.streetName,
          postalCode: userInfo?.address?.postalCode,
          province: userInfo?.address?.province,
          country: userInfo.address?.country
        }
      })
    };

    return () => {
      if (!formSubmittedRef.current) {
        dispatch(reset());
      }
    }

    }, [navigate, userInfo, dispatch, errMessage, success])


  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('address')) {
      const addressField = name.split('.')[1]
      setUserData(prevState => ({
        ...prevState,
        address: {
          ...userData.address,
          [addressField]: value
        }
      }))
    } else {
      setUserData(prevState => ({
        ...prevState,
        [name]:value
      }))
    }
 }

 const submitHandler = (e) => {
  e.preventDefault();

  const newFormValidated = {
    name: userData.name !== '',
    lastName: userData.lastName !== '',
    address: {
      streetNo: userData.address.streetNo !== '',
      streetName: userData.address.streetName !== '',
      postalCode: userData.address.postalCode !== '',
    }
  };
  setFormValidated(newFormValidated);


  // Check if form validation is passed after state update
  const isFormValid = Object.values(newFormValidated).every((value) => {
    if (typeof value === 'boolean') {
      return value === true;
    } else if (typeof value === 'object') {
      return Object.values(value).every((nestedValue) => nestedValue === true);
    }
    return false;
  });
   
  if (isFormValid) {
    dispatch(updateUser(userData))
    formSubmittedRef.current = true;
    setFormValidated({
      name: true,
      lastName: true,
      address: { streetNo: true, streetName: true, postalCode: true }
    });
    setTimeout(() => {
      setProfileAlert(false)
    },5000)
  } else {
    setProfileAlert('Please fill in all fields')
     setTimeout(() => {
      setProfileAlert(false)
    },5000)
  }
};

  return (
    <div className='container form-wrapper'>
      <Link to={`/user/account/${userInfo._id}`}><button className='btn btn-navigate btn-navigate-profile'>Go Back</button></Link>
      {profileAlert && <Alert message={profileAlert} type={success ? 'success' :'error'} />}
      <h1>Edit Profile</h1>
      <form onSubmit={submitHandler} className='login-register-form'>
      <div className="form-group">
          <label htmlFor="name">Name</label>
          <input className={!formValidated.name ? 'alert' : ''} type="text" name="name" id="name" value={name} onChange={onChangeHandler}/>
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input className={!formValidated.lastName ? 'alert' : ''} type="text" name="lastName" id="lastName" value={lastName} onChange={onChangeHandler}/>
        </div>
        <div className="form-group">
          <label htmlFor="streetNo">Street No</label>
          <input className={!formValidated.address.streetNo ? 'alert' : ''} type="text" name="address.streetNo" id="streetNo" value={streetNo} onChange={onChangeHandler}/>
        </div>
        <div className="form-group">
          <label htmlFor="streetName">Unit no & Street Name</label>
          <input className={!formValidated.address.streetName ? 'alert' : ''} type="text" name="address.streetName" id="streetName" value={streetName} onChange={onChangeHandler}/>
        </div>
        <div className="form-group">
          <label htmlFor="postalCode">Postal Code</label>
          <input className={!formValidated.address.postalCode ? 'alert' : ''} type="text" name="address.postalCode" id="postalCode" value={postalCode} onChange={onChangeHandler}/>
        </div>
        <div className="form-group">
          <label htmlFor="province">Province</label>
          <select name="address.province" id="province" value={province} onChange={onChangeHandler} >
            {provinces.map((item, index) => (
              <option key={index} value={item}>{item}</option>
            ))}
          </select>

        </div>
        <div className="form-group">
          <label htmlFor="country">Country</label>
          <input type="text" name="country" id="country" value={country} readOnly />
        </div>
        <button className="btn btn-primary">Update</button>
      </form>
    </div>
  )
};

export default EditPropfilePage