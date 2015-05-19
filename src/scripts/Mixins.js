'use strict';

import React from 'react';
import ReactIntl from 'react-intl';
import Cnames from 'classnames'
import Loader from './Loader';
import Progress from './Progress';

const FormattedRelative = ReactIntl.FormattedRelative;
const FormattedMessage = ReactIntl.FormattedMessage;

const Render = {
  renderLoader() {
    return (<Loader />);
  },

  renderProgress(props) {
    return (<Progress height={props.height} completed={props.completed} />);
  },

  renderFragment(page, fragment) {
    return (
      <div className={page}>
        {fragment}
      </div>
    );
  },

  renderError(msg) {
    return (
      <div className="error">
        <p>Error in connection</p>
      </div>
    );
  }
};

const Meta = {
  handleClassNames(classes) {
    return Cnames(classes);
  },

  handleShortenText(text, maxLength) {
    var ret = text;
    if (ret.length > maxLength) {
      ret = ret.substr(0, maxLength-3) + '...';
    }
    return ret;
  },

  handleDuration(duration) {
    var arr = ['0', '0', '0'];
    var matches = duration.match(/[0-9]+[HMS]/g);
    const pad = function(num){
      return (parseInt(num) < 9 ? '0' + num : num);
    };

    var parsed = matches.map((val, idx) => {
        var part = val.match(/[HMS]/);
        switch(part[0]){
          case 'H':
            arr[0] = part.input.slice(0,-1);
            break;
          case 'M':
            arr[1] = part.input.slice(0,-1);
            break;
          case 'S':
            arr[2] = part.input.slice(0,-1);
            break;
        }

        return val.match(/\d+/);
    });

    if(!parseInt(arr[0])){
      arr.shift();
      arr[1] = pad(arr[1]);
    } else {
      arr[1] = pad(arr[1]);
      arr[2] = pad(arr[2]);
    }

    return arr.join(':');
  },

  handlePublishedAt(date) {
    return (<FormattedRelative value={date} style="numeric" />);
  },

  handleViewCount(num) {
    var msg = `{count, plural, =0 {no views} =1 {one view} other {# views}}`;
    return (<FormattedMessage message={msg} count={num} />);
  },

  handleTitle(title) {
    return (title.match(/Deleted\s?video/g) === null ? true : false);
  },

  handleSize(bytes){
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return 'n/a';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    if (i == 0) return bytes + ' ' + sizes[i];
    return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
  },
};

export default {
  MetaMixin: Meta,
  RenderMixin: Render
}