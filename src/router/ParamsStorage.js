/***
 * router.params 数据持久化
 * setPropsStorage 设置在 route.props
 * clearPropsStorage 在 beforeEach 调用
 * @type {string}
 */

const STORAGE = 'routerParams';

class ParamsStorage {

  setPropsStorage(route) {
    return Object.keys(route.params).length ? route.params : JSON.parse(sessionStorage.getItem(STORAGE))
  }

  clearPropsStorage(to, from) {
    if ((to.path !== from.path && from.path !== '/') && sessionStorage.getItem(STORAGE)) {
      sessionStorage.removeItem(STORAGE);
    }

    if ((to.path !== from.path || from.path !== '/') && Object.keys(to.params).length) {
      sessionStorage.setItem(STORAGE, JSON.stringify(to.params));
    }
  }
}

export default new ParamsStorage();
