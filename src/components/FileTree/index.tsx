import React, { useState } from 'react'
import useGetFiles from '../../helpers/getFiles'
import useInnerLevelFiles from '../../helpers/getInnerFiles'

const FileTree = ({
  repositoryname,
  setText,
}: {
  repositoryname: string | null
  setText: React.Dispatch<React.SetStateAction<string>>
}) => {
  const { filesArray, loading } = useGetFiles(repositoryname!)
  const [oidArray, setOidArray] = useState<string[]>([])
  if (!loading) {
    console.log('filesArray', filesArray)
  }
  return (
    <div>
      <h1>FileTree</h1>
      {filesArray?.map((data, idx) => {
        return (
          <React.Fragment>
            <div style={{ display: 'flex' }} key={idx}>
              {data.type === 'tree' && <div>&gt;</div>}
              <div
                style={{ cursor: `${data.type === 'tree' ? 'pointer' : ''}` }}
                onClick={() => {
                  if (data.type === 'tree') {
                    if (oidArray.includes(data.oid)) {
                      setOidArray((prevOids) =>
                        prevOids.filter((item) => item !== data.oid)
                      )
                    } else {
                      setOidArray((prevOids) => [...prevOids, data.oid])
                    }
                  }
                }}
              >
                {data.name}
              </div>
            </div>
            {oidArray.includes(data.oid) && (
              <div
                style={{
                  marginLeft: '10px',
                }}
              >
                <InnerFile
                  oid={data.oid}
                  skip={data.type === 'blob' ? true : false}
                  name={repositoryname!}
                  setText={setText}
                />
              </div>
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}

const InnerFile = ({
  oid,
  skip,
  name,
  setText,
}: {
  oid: string
  skip: boolean
  name: string
  setText: React.Dispatch<React.SetStateAction<string>>
}) => {
  const { fileTree, loading } = useInnerLevelFiles(oid, skip, name)
  const [oidArray, setOidArray] = useState<string[]>([])
  return (
    <div>
      {!loading &&
        fileTree?.map((item, idx) => {
          return (
            <div key={idx}>
              <div style={{ display: 'flex' }}>
                <div>{item.type === 'tree' && <div>&gt;</div>}</div>
                <div
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    if (item?.object.text) {
                      setText(item?.object.text)
                    }
                    if (item.type === 'tree') {
                      if (oidArray.includes(item.oid)) {
                        setOidArray((prevOids) =>
                          prevOids.filter((data) => data !== item.oid)
                        )
                      } else {
                        setOidArray((prevOids) => [...prevOids, item.oid])
                      }
                    }
                  }}
                >
                  {item.name}
                </div>
              </div>
              {false && <div>{item?.object.text}</div>}
              {oidArray.includes(item.oid) && (
                <div style={{ marginLeft: '10px' }}>
                  {item.type === 'tree' && (
                    <InnerFile
                      oid={item.oid}
                      skip={false}
                      name={name}
                      setText={setText}
                    />
                  )}
                </div>
              )}
            </div>
          )
        })}
    </div>
  )
}

export default FileTree
