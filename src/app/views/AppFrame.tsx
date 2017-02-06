import * as React from 'react';

export default class AppFrame extends React.Component<any, any> {
  render() {
    return (
      <div className="appWrapper">
        {this.props.children}
      </div>
    );
  }
}
