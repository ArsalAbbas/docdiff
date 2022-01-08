import { gql } from 'apollo-boost'

export type Node = {
  name: string
  owner: {
    login: string
  }
}

export type Repository = {
  viewer: {
    repositories: {
      nodes: Node[]
    }
  }
}

export const getAllRepositories = gql`
  query {
    viewer {
      repositories(first: 100) {
        nodes {
          name
          owner {
            login
          }
        }
      }
    }
  }
`

export const getFileTree = gql`
  query ($name: String!) {
    viewer {
      repository(name: $name) {
        object(expression: "HEAD:") {
          ... on Tree {
            entries {
              type
              oid
              name
              object {
                ... on Blob {
                  text
                }
              }
            }
          }
        }
      }
    }
  }
`

export const getInnerFiles = gql`
  query ($name: String!, $oid: GitObjectID) {
    viewer {
      repository(name: $name) {
        object(oid: $oid) {
          ... on Tree {
            entries {
              type
              oid
              name
              object {
                ... on Blob {
                  text
                }
              }
            }
          }
        }
      }
    }
  }
`
