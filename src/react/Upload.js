import React, { Component } from 'react';
import $ from 'jquery';

class Upload extends Component {

  constructor(props) {
    super(props);
    this.submitFile = this.submitFile.bind(this);
  }

  submitFile(e) {
    e.stopPropagation();
    e.preventDefault();
    var data = new FormData(this.refs.audioform);
    $.post({
      url: 'http://localhost:8080/api/upload',
      data: data,
      cache: false,
      dataType: 'json',
      processData: false,
      contentType: false,
      success: function (data) {
        this.props.onSubmit(data);
      }.bind(this),
    });
  }

  render() {
    return (
      <form ref='audioform' onSubmit={this.submitFile}>
        <input type='file' name='audiofile' />
        <button type='submit'>Upload wav</button>
      </form>
    );
  }

}

export default Upload;
