import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link, hashHistory } from 'react-router';

import { fetchSongs } from '../queries/fetchSongs'

class SongCreateBase extends Component {

    constructor(props) {
        super(props)

        this.state = {
            title: ''
        }
    }

    onSubmit(event) {
        event.preventDefault();
        this.props.mutate({
            variables: {
                title: this.state.title
            },
            refetchQueries: [{query: fetchSongs}] // can be passed variables aswell
            // Want to update  aquery that's not associated with this component.
        })
        .then(() => hashHistory.push("/")); // Why hash history
    }

    render() {
        return (
            <div>
                <Link to="/">Back</Link>
                <h3>Create a new form</h3>
                <form onSubmit={(event) => this.onSubmit(event)}>
                    <label>Song Title:</label>
                    <input 
                        onChange={event => this.setState({title: event.target.value})}
                        value={this.state.title}/>
                </form>
            </div>
        )
    }
}

const mutation = gql`
    mutation AddSong($title: String){
        addSong(title: $title){
            title
        }
    }
`

export const SongCreate = graphql(mutation)(SongCreateBase)