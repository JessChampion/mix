import * as React from 'react';
// import {Link} from 'react-router';
import CreateButton from '../components/CreateButton';
import Playlist from '../components/Playlist';
import SearchForm from '../components/SearchForm';
import SearchResults from '../components/SearchResults';
import Section from '../components/Section';
import Seeds from '../components/Seeds';

const MainView = React.createClass({
  render: () => {
    return (
      <div className="mainView">
        <div className="headerBar">
          <div className="header section">
            <h1>MIX</h1>
          </div>
          {/*<div><Link to="/about">About</Link></div>*/}
        </div>
        <Section id="searchView" title="Add seed tracks">
          <SearchForm/>
          <SearchResults/>
        </Section>
        <Section id="seedTracks" title="Seed tracks">
          <Seeds/>
          <CreateButton/>
        </Section>
        <Section id="playlistView" title="playlist">
          <Playlist/>
        </Section>
      </div>
    );
  }
});

export default MainView;
