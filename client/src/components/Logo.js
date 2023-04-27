import logo from '../assets/images/logo.png'

const Logo = ({ styleLogo }) => {
  return <img src={logo} alt="jobzonme" className='logo' style={styleLogo} />
}

export default Logo