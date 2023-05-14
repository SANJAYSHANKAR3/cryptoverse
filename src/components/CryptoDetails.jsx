import React from 'react'
import { useParams } from 'react-router-dom'
const CryptoDetails = () => {
    const{coinId}=useParams();
  return (
    <div>
      hello{coinId}
    </div>
  )
}

export default CryptoDetails
