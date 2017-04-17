import * as R from 'ramda';
import {REGISTER_SECTION, TOGGLE_SECTION} from '../../actions/main';

export interface IMainState {
  sections: string[];
}

export interface ISectionState {
  id: string;
  expanded: boolean;
}

const createSection = (sectionId: string, expanded: boolean = true): ISectionState => {
  return {
    id: sectionId,
    expanded
  };
};
const findSection = R.useWith(R.find, [R.propEq('id'), R.identity]);
const flipExpanded = R.compose(R.not, R.prop('expanded'));
const setExpanded: any = R.assoc('expanded');

export default function mainReducer(state: IMainState = {sections: []}, action): IMainState {
  switch (action.type) {
    case REGISTER_SECTION:
      state.sections = registerSection(state.sections, action.sectionId, action.expanded);
      break;
    case TOGGLE_SECTION:
      state.sections = toggleSection(state.sections, action.sectionId, action.expanded);
      break;
  }
  return state;
}

function registerSection(sections: string[], sectionId: string, expanded?: boolean) {
  if (findSection(sectionId, sections)) {
    return sections;
  }
  return R.append(createSection(sectionId, expanded), sections);
}

function toggleSection(sections, sectionId, expanded) {
  const isTargetSection = R.propEq('id', sectionId);
  return R.map((section) => {
    const changeTo = expanded ? expanded : flipExpanded(section);
    return R.ifElse(isTargetSection, setExpanded(changeTo), R.identity)(section);
  }, sections);
}

