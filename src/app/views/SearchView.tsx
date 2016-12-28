import * as React from 'react';
import {Link} from 'react-router';
import SearchForm from '../components/SearchForm';
import SearchResults from '../components/SearchResults';

const SearchView = React.createClass({
  render: () => {
    return (
      <div className="searchView">
        <h1>MIX</h1>
        <SearchForm/>
        <SearchResults/>
        <div><Link to="/about">About</Link></div>
      </div>
    );
  }
});

export default SearchView;
