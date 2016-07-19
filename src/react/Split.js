import React, { Component } from 'react';
import $ from 'jquery';

class Split extends Component {

  constructor(props) {
    super(props);
    this.state = {
      start: '',
      end: '',
    };
    this.updateStart = this.updateStart.bind(this);
    this.updateEnd = this.updateEnd.bind(this);
    this.splitFile = this.splitFile.bind(this);
  }

  updateStart(e) {
    this.setState({ start: e.target.value });
  }

  updateEnd(e) {
    this.setState({ end: e.target.value });
  }

  splitFile(e) {
    e.preventDefault();
    var start = parseFloat(this.state.start);
    var end = parseFloat(this.state.end);
    if(start > end) return alert('start < end');
    var data = {
      id: this.props.fid,
      start,  end,
    };
    // ajax:
    $.post({
      url: 'http://localhost:8080/api/split',
      data,
      dataType: 'json',
      success: function (data) {
        this.props.onSubmit(data);
      }.bind(this),
    });
  }

  render() {
    return (
      <form onSubmit={this.splitFile}>
        <input type='text' name='fid' value={this.props.fid} placeholder='ID' disabled />
        <input type='text' name='start' value={this.state.start} placeholder='Start' onChange={this.updateStart} />
        <input type='text' name='end' value={this.state.end} placeholder='End' onChange={this.updateEnd} />
        <button type='submit' onClick={this.splitFile}>Split file</button>
      </form>
    );
  }

}

export default Split;
