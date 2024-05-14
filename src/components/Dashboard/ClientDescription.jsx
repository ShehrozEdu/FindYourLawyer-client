import { Button, ButtonGroup } from '@material-tailwind/react'
import React from 'react'

const ClientDescription = ({ description }) => {
  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-600 dark:text-white rounded-lg">
      <p>{description}</p>
      

    </div>
  )
}

export default ClientDescription