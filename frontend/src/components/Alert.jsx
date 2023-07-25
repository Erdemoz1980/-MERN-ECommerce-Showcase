
const Alert = ({message, type}) => {
  return (
    <div className={`alert-wrapper ${type}`}>
      <p>{message}</p>
    </div>
  )
}

export default Alert