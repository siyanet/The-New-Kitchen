
import Logo from '../Components/Logo'
import Logout from '../Components/Logout'

const OwnerNavBar = () => {
  return (
    <div className='z-50 flex justify-between w-full p-4'>
        <div><Logo/></div>
        <Logout/>
        
      
    </div>
  )
}

export default OwnerNavBar
