import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';

import { fetchSongs } from '../queries/fetchSongs'

class SongsListBase extends Component {

onSongDelete(id) {
    this.props.mutate({
        variables: {id}
    })
    .then(() => this.props.data.refetch()) // because we have access to this components queries we can run refetch
}

    renderSongs() {
        if (this.props.data.loading) { return null}
        return this.props.data.songs.map(({title, id}) => {
            return (
                <li key={id} className="collection-item">
                    <Link to={`/songs/${id}`}>
                        {title}
                    </Link>
                    <i className="material-icons material-icon" onClick={() => this.onSongDelete(id)}>delete</i>
                </li>
            )
        })
    }
    render() {
        return (
            <div>
                <ul className="collection">
                    {this.renderSongs()}
                </ul>
                <Link
                    to="songs/new"
                    className="btn-floating btn-large red right">
                        <i className="material-icons">add</i>
                </Link>
            </div>
        );
    }
}

const mutation = gql`
    mutation DeleteSong($id: ID){
        deleteSong (id: $id) {
            id
        }
    }
`

export const SongsList = graphql(mutation)(
    graphql(fetchSongs)(SongsListBase)
)