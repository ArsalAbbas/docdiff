import { CLIENT_ID, REDIRECT_URI } from '../../constants'

const Button = () => {
  return (
    <div>
      <a
        href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user&redirect_uri=${REDIRECT_URI}`}
      >
        <button>Login</button>
      </a>
    </div>
  )
}

export default Button
