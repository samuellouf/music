import { getWebsiteRoot } from "./utils";

export async function getList(){
  try {
    
    var response = await fetch(getWebsiteRoot() + "/musics/musics.json");
    return await response.json();
  } catch {
    return [];
  }
}

export async function getManifest(id){
  try {
    var response = await fetch(getWebsiteRoot() + "/musics/" + id + "/manifest.json");
    return await response.json();
  } catch {
    return undefined;
  }
}

export async function isPlaylist(id){
  try {
    var manifest = await getManifest(id);
    return manifest.type == "playlist";
  } catch {
    return undefined;
  }
}

export async function exists(id) {
  return (await getList()).includes(id);
}

export default {
  getList,
  getManifest,
  isPlaylist,
  exists
}