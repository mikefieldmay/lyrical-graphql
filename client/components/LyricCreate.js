import React, { Component } from 'react'
import gql from 'graphql-tag';
import { graphql } from 'react-apollo'

import { fetchSong } from '../queries/fetchSong'

class LyricCreateBase extends Component {
    constructor(props) {
        super(props)
        this.state = { content: ''} 
    }

    onSubmit (event) {
        event.preventDefault()
        this.props.mutate({
            variables: {
                songId: this.props.songId,
                content: this.state.content
            }
        }).then(() => {
            this.setState({content: ''})
        })
    }
    render() {
        return (
            <form onSubmit={(event) => this.onSubmit(event)}>
                <label>Add a lyric: </label>
                <input
                    value={this.state.content}
                    onChange={(event) => this.setState({content: event.target.value})} />
            </form>
        )
    }
}

const mutation = gql`
    mutation AddLyricToSong($songId: ID!, $content: String) {
        addLyricToSong(songId: $songId content:$content) {
            id
            lyrics {
                content
                id
                likes
            }
        }
    }
`

export const LyricCreate = graphql(mutation)(LyricCreateBase)