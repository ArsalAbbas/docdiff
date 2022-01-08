import { useQuery } from '@apollo/client'
import React from 'react'
import { getUserInfo, UserInfo } from '../../queries/UserInfo'
import Button from '../Button'

const Header = () => {
  const { data, loading } = useQuery<UserInfo>(getUserInfo)
  const name = data?.viewer.name
  const login = data?.viewer.login
  return (
    <React.Fragment>
      {!loading && (
        <div>
          <Button />
          <br />
          {name}
          <br />
          {login}
        </div>
      )}
    </React.Fragment>
  )
}

export default Header
