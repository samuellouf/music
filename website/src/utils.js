export const isServer = () => window.location.hostname == "localhost" || window.location.hostname == "127.0.0.1";
export const isHomepage = () => window.location.pathname == "/music" || window.location.pathname == "/music/";

export function getWebsiteRoot(){
  return window.location.protocol + "//" + window.location.host + "/music";
}

export const forEach = (list, callback) => {
  var new_list = [];
  list.forEach((value, i) => {
    new_list.push(callback(value, i))
  });
  return new_list;
}

export function download(url, as=""){
  var hyperlink = document.createElement("a");
  hyperlink.href = url;
  hyperlink.download = as;
  hyperlink.click();
}

export const pushed = (list, ...items) => {
  return [...list, ...items];
}

export default {
  isServer,
  isHomepage,
  getWebsiteRoot,
  forEach,
  download,
  pushed
}