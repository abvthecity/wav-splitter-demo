import React, { Component } from 'react';

import Audio from './Audio';
import Upload from './Upload';
import Split from './Split';

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: null,
      file: null,
      emotions: {},
      dominant: null,
      pieces: [],
    };
    this.setFile = this.setFile.bind(this);
    this.splitFile = this.splitFile.bind(this);
  }

  setFile(data) {
    this.setState({
      id: data.id,
      file: data.file,
      emotions: data.emotions,
      dominant: data.dominant,
    });
  }

  splitFile(data) {
    var pieces = this.state.pieces;
    pieces.push({
      id: data.sid,
      file: data.file,
      start: data.start,
      end: data.end,
      emotions: data.emotions,
      dominant: data.dominant,
    });
    this.setState(pieces);
  }

  render() {
    if(this.state.id == null) {
      return (<Upload onSubmit={this.setFile} />);
    } else {
      return (<div>
        <Audio src={this.state.file} />
        <Split onSubmit={this.splitFile} fid={this.state.id} />
        <ul>{this.state.pieces.map(function (item, i) {
          return (<li key={i}>{item.start} - {item.end}: <Audio src={item.file}/> — dominant: {item.dominant}</li>);
        })}</ul>
      </div>);
    }
  }

}

export default Main;
