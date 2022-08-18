import React from 'react'

type Props = {
    children: JSX.Element | JSX.Element[]
}

const RelativeContainer = (props: Props) => {
  return (
    <div style={{position: 'relative', width: '100%', height: '100%'}}>
        {props.children}
    </div>
  )
}

export default RelativeContainer