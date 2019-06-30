import React from 'react';
import './App.css';

const url = 'https://jsonplaceholder.typicode.com/posts';
const KEY = 0;
const VALUE = 1;

class App extends React.Component {
  constructor(props) {
    super(props);

    //The state will store the fetched API data, a wordMap containing unique words and their number of occurrences
    //and a totalWordCount, which will be computed from the wordMap
    this.state = {data: [], totalWordCount: 0, wordMap: []};
  }

  componentDidMount() {
    fetch(url)
        .then(res => res.json())
        .then(json => {
          this.setState({data: json})
          console.log(json);

          //countWords sets up the wordMap, which we then sort into descending order by #of occurrences
          let wordCounts = Object.entries(countWords(json));
          wordCounts.sort((a, b) => b[VALUE] - a[VALUE]);
          this.setState({wordMap: wordCounts});


          //for some reason this results in a NaN error so I ended up choosing an iterative solution instead
          //this.setState({totalWordCount: wordCounts.reduce((a, b) => a[VALUE] + b[VALUE], 0)});

          let count = 0;
          for (let elem of wordCounts) {
            count += elem[1];
          }

          this.setState({totalWordCount: count});

        })
        .catch(() => alert("An error has occurred: the API endpoint could not be reached and as such this site is useless :("));

  }

  render() {
    return (
        <div>

          <hr/>
          <hr/>

          <div>
            <h2>Total word count: {this.state.totalWordCount}</h2>
          </div>

          <div>
            <h2>Top 5 most common words:</h2>
            <ul className="unstyled">
              {this.state.wordMap.slice(0, 5).map(elem => {
                return <ListItem key={elem[KEY]} id={elem[KEY]} value={elem[VALUE]}/>
              })}
            </ul>
          </div>

          <hr/>
          <hr/>

          <div>
            <ul className="unstyled">
              {this.state.data.map(elem => {
                return <PostListItem key={elem.id}
                          userId={elem.userId}
                          title={elem.title}
                          body={elem.body.split("\n").map((elem, i) => <div key={i}>{elem}</div>)}/>
              })}
            </ul>
          </div>

        </div>
    )
  }
}

//This implementation of list items could be improved
function PostListItem(props) {
  //I assumed that the post id's should not be displayed
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

function ListItem(props) {
  return <li>{props.id} - {props.value} occurrences</li>;
}

//takes in an array of JSON objects and returns the wordMap
function countWords(jsonArray) {
  let wordCounts = {};

  for (let elem of jsonArray) {
    if (elem.hasOwnProperty("body")) {
      let split = elem.body.split(/\s+/);
      wordCounts = calculateWordCounts(wordCounts, split);
    }

    if (elem.hasOwnProperty("title")) {
      let split = elem.title.split(/\s+/);
      wordCounts = calculateWordCounts(wordCounts, split);
    }
  }

  return wordCounts;
}

//takes in an existing wordMap object which may be empty, and an array of strings that will be put into the map
function calculateWordCounts(wordCounts, words) {
  if (!(words.constructor === Array)) {
    return wordCounts;
  }

  for (let w of words) {
    if (wordCounts.hasOwnProperty(w)) {
      wordCounts[w]++;
    } else {
      wordCounts[w] = 1;
    }
  }

  return wordCounts;
}


export default App;
