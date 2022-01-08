import { useQuery } from '@apollo/client'
import Fuse from 'fuse.js'
import { useState } from 'react'
import { getAllRepositories, Repository } from '../../queries/repository'

const GetAllRepositories = ({
  setSelectedRepoName,
}: {
  setSelectedRepoName: React.Dispatch<React.SetStateAction<string | null>>
}) => {
  const [repoName, setRepoName] = useState<string | undefined>(undefined)
  const { data, loading } = useQuery<Repository>(getAllRepositories)
  const repositoryArray = data?.viewer.repositories.nodes
  let searchResults
  if (repoName && repositoryArray) {
    const fuse = new Fuse(repositoryArray, {
      keys: ['name'],
    })
    searchResults = fuse.search(repoName).map((item) => item.item.name)
  }

  return (
    <div>
      <h1>Repo Names</h1>
      {!loading && (
        <div>
          <input
            value={repoName}
            type="text"
            onChange={({ target }) => setRepoName(target.value)}
          />
          {searchResults?.map((name, idx) => {
            return (
              <div
                key={idx}
                onClick={() => {
                  setSelectedRepoName(name)
                }}
              >
                {name}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default GetAllRepositories
