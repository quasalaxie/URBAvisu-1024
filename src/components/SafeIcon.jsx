import React from 'react'
import { FiAlertTriangle } from 'react-icons/fi'

const SafeIcon = ({ icon: IconComponent, ...props }) => {
  if (!IconComponent) {
    return <FiAlertTriangle {...props} />
  }
  
  return <IconComponent {...props} />
}

export default SafeIcon