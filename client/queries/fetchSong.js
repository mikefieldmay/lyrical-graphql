import gql from 'graphql-tag'

export const SongQuery = gql`
    query SongQuery($id: ID!) {
        song(id: $id) {
            id
            title
            lyrics {
                id
                content
                likes
            }
        }
    }
`