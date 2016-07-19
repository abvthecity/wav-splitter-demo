import React, { Component } from 'react';

const Audio = props => {

  var { src } = props;

  return (
    <audio controls>
      <source src={src} type='audio/wav' />
    </audio>
  );

}

export default Audio;
