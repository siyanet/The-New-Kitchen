import React from 'react'
import OwnerNavBar from '../OwnerComponets/OwnerNavBar'
import OwnerSideBar from '../OwnerComponets/OwnerSideBar'

const OwnerDashboard = () => {
  return (
    <div className='flex flex-col w-full h-full'>
        <OwnerNavBar/>
        <OwnerSideBar/>
      
    </div>
  )
}

export default OwnerDashboard
