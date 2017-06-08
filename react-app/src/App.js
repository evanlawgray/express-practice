import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

    state = {
      posts: []
    }

  fetchPosts(event, lessonId) {

    event.preventDefault();

    fetch( `http://localhost:3000/posts/${ lessonId }` )
      .then( res => res.json() )
      .then( data => {
        this.setState({
          posts: data
        })
      });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>

        <ul style={{listStyle: 'none', fontSize: 22, fontFamily: 'cursive'}}>
          {
            this.state.posts.map( post => {
              return <li key={ post.title + Date.now() }>{ post.content }</li>
            })
          }
        </ul>

        <button onClick={ (event) => this.fetchPosts(event, 1) }>Fetch Meteor Posts</button>
        <button  onClick={ (event) => this.fetchPosts(event, 2) }>Fetch React Native Posts</button>
      </div>
    );
  }
}

export default App;
