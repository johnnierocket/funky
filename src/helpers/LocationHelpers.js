import nth from 'lodash/fp/nth';

export const getModuleId = () => nth(1, /module\/(.*?)\//.exec(window.location.pathname)) || 'funkyjs';