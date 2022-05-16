import './error.css'


const Error = (props) => {
  return (
    <div className="error">
      <h4>{props.message}</h4>
    </div>
  )
}

export default Error;
