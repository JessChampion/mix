import * as React from 'react';
import Playlist from '../components/Playlist';

const PlayView = React.createClass({
  render: () => {
    return (
      <div className="playView">
        <div className="headerBar">
          <div className="header section">
            <h1>MIX</h1>
          </div>
        </div>
        <div className="playlistView section">
          <Playlist/>
        </div>
      </div>
    );
  }
});

export default PlayView;
