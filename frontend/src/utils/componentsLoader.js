// componentsLoader.js
const DrawerSideBar = import('../components/DrawerSideBar.jsx').then((module) => module.default);
const LinkDelete = import('../components/LinkDelete.jsx').then((module) => module.default);

console.log('DrawerSideBar:', DrawerSideBar);
console.log('LinkDelete:', LinkDelete);

export default {
  DrawerSideBar,
  LinkDelete,
};
