import { useQuery } from '@apollo/client'
import { getFileTree } from '../queries/repository'

type Tree = {
  name: string
  object: {
    text: string
  }
  oid: string
  type: string
}

const useGetFiles = (name: string) => {
  const { data, loading } = useQuery(getFileTree, {
    variables: {
      name: name,
    },
  })
  let filesArray: Tree[] | undefined
  if (!loading) {
    filesArray = data?.viewer?.repository?.object?.entries
  }
  return { data, filesArray, loading }
}

export default useGetFiles
