export const REGISTER_SECTION = 'REGISTER_SECTION';
export function registerSection(sectionId: string, expanded?: boolean) {
  return {
    type: REGISTER_SECTION,
    sectionId,
    expanded
  };
}

export const TOGGLE_SECTION = 'TOGGLE_SECTION';
export function toggleSection(sectionId: string, expanded?: boolean) {
  return {
    type: TOGGLE_SECTION,
    sectionId,
    expanded
  };
}