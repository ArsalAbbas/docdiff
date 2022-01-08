import { useQuery } from '@apollo/client'
import { getInnerFiles } from '../queries/repository'

export type Blob = {
  text: any
}

export type TreeEntry = {
  name: string
  oid: string
  type: string
  object: Blob
}

export type InnerLevelFiles = {
  viewer: {
    repository: {
      object: {
        entries: TreeEntry[]
      }
    }
  }
}

const useInnerLevelFiles = (oid: string, skip: boolean, name: string) => {
  const { data, loading } = useQuery<InnerLevelFiles>(getInnerFiles, {
    skip,
    variables: {
      oid,
      name,
    },
  })
  const fileTree = data?.viewer?.repository?.object?.entries

  return { fileTree, loading }
}
export default useInnerLevelFiles
