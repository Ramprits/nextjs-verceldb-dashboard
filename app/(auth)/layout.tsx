import React, { ReactNode } from 'react'

type Props = {
    children:ReactNode
}

const AuthLayout = (props: Props) => {
  return (
      <div className='flex items-center justify-center h-screen w-screen'>{props.children}</div>
  )
}
export default AuthLayout