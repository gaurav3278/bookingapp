import './mailList.css'

const MailList = () => {
  return (
    <div className="mail">
        <h1 className="mailTitle">Save time, Save money!</h1>
        <span className="mailDesc1">Sign up and we will send the best deals to you</span>
        <div className="mailInputContainer">
            <input type="text" placeholder='Your Email' />
            <button>Suscribe</button>
        </div>
    </div>
  )
}

export default MailList