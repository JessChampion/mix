import * as React from 'react';
// import {Link} from 'react-router';
import CreateButton from '../components/CreateButton';
import Playlist from '../components/Playlist';
import SearchForm from '../components/SearchForm';
import SearchResults from '../components/SearchResults';
import Seeds from '../components/Seeds';

const MainView = React.createClass({
  render: () => {
    return (
      <div className="mainView">
        <div className="headerBar">
          <div className="header section">
            <h1>MIX</h1>
          </div>
        </div>
        <div className="leftCol">
          <div className="searchView section">
            <SearchForm/>
            <SearchResults/>
            {/*<div><Link to="/about">About</Link></div>*/}
          </div>
          <div className="settingsBar">
            <div className="settingsContent section">
              <Seeds/>
              <CreateButton/>
            </div>
          </div>
        </div>
        <div className="rightCol">
          <div className="playlistPanel section">
            <Playlist/>
          </div>
        </div>
      </div>
    );
  }
});

export default MainView;
