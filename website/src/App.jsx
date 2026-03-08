import { useEffect, useState } from 'react'
import Header from './header'
import './App.css'
import { exists, getManifest } from './musics';
import { HomePage, PlaylistPage, MusicPage, ErrorPage, UnexistantPage } from './pages';
import { isHomepage } from './utils';

function App() {
  var path = window.location.pathname;
  var id = path.replace("/music", "").slice(1, path.endsWith("/") ? -1 : Infinity);
  const [page, setPage] = useState(<h1 align="center">Loading...</h1>);

  window.exposed = {isHomepage, exists, getManifest, id}

  const getPage = async () => {
    try {
      if (isHomepage()){
        setPage(<HomePage/>);
      } else if (await exists(id)) {
        var manifest = await getManifest(id);
        document.title = manifest.name;
        if (manifest.type == "song"){
          setPage(<MusicPage manifest={manifest}/>)
        } else if (manifest.type == "playlist"){
          setPage(<PlaylistPage manifest={manifest}/>)
        }
      } else {
        setPage(<UnexistantPage/>)
      }
      // await exists(id);
    } catch (error) {
      console.error(error);
      setPage(<ErrorPage error={error.toString()}/>);
    }
  };

  useEffect(() => {
    getPage();
  }, []);

  return (
    <>
      <Header/>
      {page}
    </>
  )
}

export default App
