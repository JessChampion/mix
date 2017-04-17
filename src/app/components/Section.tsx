import * as R from 'ramda';
import * as React from 'react';

import {registerSection, toggleSection} from '../actions/main';
import {IStore, IStoreContext} from '../reducers';
import {ISectionState} from '../reducers/reducers/main';


export interface ISectionProps {
  id: string;
  title: string;
}

// The mapping function tailors the store's state to the view's state.
function mapStateFromStore(sectionId: string, store: IStore): ISectionState {
  const section = R.find(R.propEq('id', sectionId))(store.main.sections);
  console.log(section);
  return section;
}

export default class Section extends React.Component<ISectionProps, any> {
  static contextTypes: React.ValidationMap<any> = {
    store: React.PropTypes.object
  };

  context: IStoreContext;
  unsubscribe: Function;

  constructor(props: ISectionProps) {
    super(props);
    if (!this.state) {
      this.state = {sections: []};
    }
  }

  setStateFromStore() {
    this.setState(mapStateFromStore(this.props.id, this.context.store.getState()));
  }

  componentDidMount() {
    // This helper wraps common code so we can initialze state and then subscribe.
    this.setStateFromStore();
    this.initialiseSection();
    this.unsubscribe = this.context.store.subscribe(this.setStateFromStore.bind(this));
  }

  initialiseSection() {
    const {id} = this.props;
    this.context.store.dispatch(registerSection(id));
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  toggleSection() {
    const {id} = this.props;
    //noinspection TypeScriptValidateTypes
    this.context.store.dispatch(toggleSection(id));
  }

  renderContent(children) {
    return (
      <div className="section-body">
        {children}
      </div>
    );
  }

  renderToggle(expanded) {
    const expandedClasses = R.concat('toggle-icon ')(expanded ? 'expanded' : 'collapsed');
    return (
      <div className="toggle"
           onClick={this.toggleSection.bind(this)}
      >
        <i className={expandedClasses}/>
      </div>
    );
  }

  render() {
    const {
      children,
      title
    }: any = this.props;
    const {
      expanded
    } = this.state;
    const id: string = this.props.id;

    const classes = id + ' section collapsible';
    const toggle = this.renderToggle(expanded);
    const content = expanded ? this.renderContent(children) : '';
    return (
      <section className={classes} id={id}>
        <div className="section-header">
          <h2>
            {title}
          </h2>
          {toggle}
        </div>
        {content}
      </section>
    );
  }
}
