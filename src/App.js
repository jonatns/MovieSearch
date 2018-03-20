import React, { Component } from 'react';
import {
  View,
  NativeAppEventEmitter,
} from 'react-native';
import Voice from 'react-native-voice';

import Listen from './components/listen';
import Result from './components/result';

class App extends Component {
  constructor() {
    super();
    this.state = {
      searching: false,
      results: [],
      partialResults: [],
      searched: false,
      result: {
        imageUri: '',
        title: ''
      }
    };
    Voice.onSpeechRecognized = this.onSpeechRecognized.bind(this);
    Voice.onSpeechResults = this.onSpeechResults.bind(this);
    Voice.onSpeechPartialResults = this.onSpeechPartialResults.bind(this);
    Voice.onSpeechError = this.onSpeechError.bind(this);
  }

  componentWillUnmount() {
    const error = Voice.destroy();
    if (Voice.onSpeechStart != null) {
      Voice.onSpeechStart.remove();
      Voice.onSpeechStart = null;
    }
    if (Voice.onSpeechRecognized != null) {
      Voice.onSpeechRecognized.remove();
      Voice.onSpeechRecognized = null;
    }
    if (Voice.onSpeechEnd != null) {
      Voice.onSpeechEnd.remove();
      Voice.onSpeechEnd = null;
    }
    if (Voice.onSpeechError != null) {
      Voice.onSpeechError.remove();
      Voice.onSpeechError = null;
    }
    if (Voice.onSpeechResults != null) {
      Voice.onSpeechResults.remove();
      Voice.onSpeechResults = null;
    }
    if (Voice.onSpeechPartialResults != null) {
      Voice.onSpeechPartialResults.remove();
      Voice.onSpeechPartialResults = null;
    }
  }

  listen = () => {
    this.setState({
      searching: true,
      searched: false,
      result: {
        imageUri: '',
        title: ''
      }
    });
    Voice.start('en');
    setTimeout(() => {
      Voice.destroy()
      fetch(`http://api.quodb.com/search/${encodeURI(this.state.partialResults)}?titles_per_page=1`)
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({
          searched: true,
          result: {
            title: data.docs[0].title,
            imageUri: `http://static.quodb.com/Covers/${data.docs[0].image}`
          }
        });
      }).catch((err) => {
        console.log(err);
        this.setState({ searched: true });
      });
      this.setState({ searching: false });
    }, 6000);
  };

  onSpeechRecognized(e) {
    console.log(e);
  }

  onSpeechResults(e) {
    this.setState({
      results: e.value,
    });
  }

  onSpeechPartialResults(e) {
    this.setState({
      partialResults: e.value,
    });
  }

  onSpeechError(e) {
    console.log(e);
  }

  render() {
    return (
      <View style={styles.container}>
        <Listen
          listen={this.listen}
          searching={this.state.searching}
        />
        <Result
          showResult={!this.state.searching && this.state.searched}
          hideResult={() =>
            this.setState({
              searched: false,
              result: {
                title: '',
                imageUri: ''
              }
            })
          }
          result={this.state.result}
        />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#26A69A'
  }
}

export default App;
