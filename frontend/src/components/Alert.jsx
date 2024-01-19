
const Alert = ({message, type}) => {
  return (
    <div className={`alert-wrapper container ${type}`}>
      <p>{message}</p>
    </div>
  )
}

export default Alert