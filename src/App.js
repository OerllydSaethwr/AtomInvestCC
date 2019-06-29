import React from 'react';
import logo from './logo.svg';
import './App.css';

const url = 'https://jsonplaceholder.typicode.com/posts';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data: []};
  }

  componentDidMount() {
    fetch(url)
        .then(res => res.json())
        .then(json => this.setState({data: json}));
  }

  render() {
    return (
        <div>
          <ul className="unstyled">
            {this.state.data.map(elem => <ListItem key={elem.id} userId={elem.userId} title={elem.title} body={elem.body}/>)}
          </ul>
        </div>
    )
  }
}

function ListItem(props) {
  return <li>
            <div>
              <h1>User {props.userId}</h1>
            </div>
            <div>
              <h2>{props.title}</h2>
            </div>
            <div>
              {props.body}
            </div>
            <hr/>
          </li>;
}

export default App;
