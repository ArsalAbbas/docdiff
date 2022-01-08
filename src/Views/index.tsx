import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  DefaultOptions,
  InMemoryCache,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { useState } from 'react'
import FileTree from '../components/FileTree'
import GetAllRepositories from '../components/GetAllRepositories/GetAllRepositories'
import Header from '../components/Header'
import MonacoEditor from '../components/MonacoEditor'

const Views = () => {
  const httpLink = createHttpLink({
    uri: 'https://api.github.com/graphql',
  })

  const token = localStorage.getItem('token')
  const authLink = setContext(async (_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${token}`,
      },
    }
  })

  const defaultOptions: DefaultOptions = {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  }

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    defaultOptions: defaultOptions,
  })
  const [selectedRepoName, setSelectedRepoName] = useState<string | null>(null)
  const [text, setText] = useState<string>('')

  console.log(selectedRepoName)
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <div style={{ display: 'flex' }}>
          <div>
            <Header />
            <GetAllRepositories setSelectedRepoName={setSelectedRepoName} />
            <FileTree repositoryname={selectedRepoName} setText={setText} />
          </div>
          <div>
            <MonacoEditor text={text} />
          </div>
        </div>
      </ApolloProvider>
    </div>
  )
}

export default Views
