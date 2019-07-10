import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';

import { SongQuery } from '../queries/fetchSong';
import { LyricList } from './LyricList';
import { LyricCreate } from './LyricCreate';

class SongDetailBase extends Component {
    render() {
        const { song } = this.props.data

        if (!song ) {return <div></div>}

        return (
            <div>
                <Link to="/">Back</Link>
                <h3>{song.title}</h3>
                <LyricList lyrics={song.lyrics}/>
                <LyricCreate songId={song.id}/>
            </div>
        )
    }
}

export const SongDetail = graphql(SongQuery, {
    options: (props) => (
        { variables: {
            id: props.params.id
        }}
    )
})(SongDetailBase)