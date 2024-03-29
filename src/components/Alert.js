import React from 'react'

const Alert = (props) => {
  return (
    <div className='mb-3' style={{height:"50px"}}>
        {props.alert && <div className={`alert alert-${props.alert.type} text-start`} role='alert'>
                {props.alert.message}
        </div>}
    </div>
  )
}

export default Alert
