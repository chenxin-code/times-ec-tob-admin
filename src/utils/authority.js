export function hasRangeAuthorityWithoutProject(authorityKeys) {
  let flag = true;
  const jsonAuthorities = window.localStorage.getItem("SD_AUTHORITIES");
  if (jsonAuthorities && authorityKeys != "") {
    const auth = JSON.parse(window.localStorage.getItem("SD_AUTHORITIES") || "");
    if (authorityKeys != "") {
      authorityKeys.forEach(authorityKey => {
        if (auth.filter(x => x === authorityKey).length <= 0) {
          flag = false;
        }
      });
    }
  }
  return flag;
}
