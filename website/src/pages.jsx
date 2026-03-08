import { useEffect, useState } from 'react'
import { isHomepage, getWebsiteRoot, forEach, download } from './utils';
import { getList, getManifest } from './musics';
import "./music.css";
import "./download.css";

function Music({ manifest }){

  return (
    <div className="music" onClick={() => {open(`${getWebsiteRoot()}/${manifest.id}`, "_self")}}>
      <div className="miniature">
        <img src={`${getWebsiteRoot()}/musics/${manifest.id}/miniature.png`}/>
      </div>
      <div className="text">
        <h1>{manifest.name}</h1>
        <h2>{manifest.description}</h2>
        {manifest.isRemake && (
          <>
            <p>Original by : {forEach(manifest.original, (og, i) => 
              (i == manifest.original.length - 1 ?
              <a href={og.url}>{og.name}</a>
              : (
                i == manifest.original.length - 2 ? 
                <><a href={og.url}>{og.name}</a><span> & </span></>
                : <><a href={og.url}>{og.name}</a><span>, </span></>
                )
              ))}</p>
            <p>Remake by : <a href="https://www.youtube.com/@SamuelLouf">SamuelLouf</a></p>
          </>
        )}
      </div>
    </div>
  )
}

export function PlaylistPage({ manifest }){
  const [musics, setMusics] = useState([]);
  const [loading, setLoading] = useState(true);

  const getMusics = async () => {
    if (musics.length > 0) return;
    var musics_list = await getList();
    
    if (isHomepage()){
      musics_list = musics_list.filter((val) => !val.includes("/"));
    } else {
      musics_list = musics_list.filter((val) => val.startsWith(manifest.id + "/"));
    }

    var new_musics = [];
    for (var id of musics_list){
      var music_manifest = await getManifest(id);
      new_musics.push(<Music key={id} manifest={music_manifest}/>);
    }
    setMusics(new_musics);
    setLoading(false);
  }

  useEffect(() => {
    getMusics();
  }, []);

  return (
    <div id="playlist">
      <h1 className="title">{manifest.name}</h1>
      <p className="description">{manifest.description}</p>
      <div id="musics">
        {loading && <h1>Loading ...</h1>}
        {!loading && musics}
      </div>
      <br></br>
    </div>
  )
}

export function HomePage(){
  var manifest = {name: "My Music", description: "Hi !\nI'm samuellouf and I make music.\nHere are my compositions and musics."};

  return (
    <>
      <PlaylistPage manifest={manifest}/>
    </>
  )
}

function DownloadButton({ manifest, type }){
  var name = manifest.name;
  var id = manifest.id;

  const extensions = {
    audio: "wav",
    MIDI: "mid",
    MuseScore: "mscz",
    PDF: "pdf"
  };

  var file = (type == "MuseScore" ? type : type.toLowerCase()) + "_file." + extensions[type]; 

  return (
    <>
      <button className={type} onClick={() => {download(`${getWebsiteRoot()}/musics/${id}/${file}`, `${name}.${extensions[type]}`)}}>
        <img src={`${getWebsiteRoot()}/assets/${type}_icon.svg`}/>
        <span>Download {type} file</span>
      </button>
    </>
  )
}

export function MusicPage({ manifest }){
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(Math.round(window.innerWidth/560*315));

  const resize = () => {
    setWidth(window.innerWidth);
    setHeight(Math.round(window.innerWidth/560*315));
  }

  window.addEventListener("resize", resize);

  return (
    <>
      <h1 align="center" class="title">{manifest.name}</h1>
      <div class="music">
        <div class="miniature">
          <img src={getWebsiteRoot() + "/musics/" + manifest.id + "/miniature.png"}/>
        </div>
      </div>
      <div class="text">
        <h2>{manifest.description}</h2>
        {manifest.isRemake ? (
          <>
            <p>Original by : {forEach(manifest.original, (og, i) => 
              (i == manifest.original.length - 1 || manifest.original.length == 1 ?
              <a href={og.url}>{og.name}</a>
              : (
                i == manifest.original.length - 2 ? 
                <><a href={og.url}>{og.name}</a><span> & </span></>
                : <><a href={og.url}>{og.name}</a><span>, </span></>
                )
              ))}</p>
            <p>Remake by : <a href="https://www.youtube.com/@SamuelLouf">SamuelLouf</a></p>
          </>
        ) : <p>Made by : <a href="https://www.youtube.com/@SamuelLouf">SamuelLouf</a></p>}
        
      </div>
      <iframe width={String(width)} height={String(height)} src={"https://www.youtube-nocookie.com/embed/" + manifest.ytid} title={`${manifest.name} on YouTube`} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      <div id="downloads">
        {manifest.files.midi && <DownloadButton manifest={manifest} type="MIDI"/>}
        {manifest.files.pdf && <DownloadButton manifest={manifest} type="PDF"/>}
        {manifest.files.musescore && <DownloadButton manifest={manifest} type="MuseScore"/>}
        {manifest.files.audio && <DownloadButton manifest={manifest} type="audio"/>}
      </div>
    </>
  )
}

export function ErrorPage({ error }){
  return (
    <>
      <h1 align="center">Error</h1>
      <h3>An error has occured : </h3>
      <p>{error}</p>
    </>
  )
}

export function UnexistantPage(){
  return (
    <>
      <h1 align="center">Error 404</h1>
      <h3>I haven't made this song yet...</h3>
      <p>
        <button onClick={() => {open(getWebsiteRoot(), "_self")}}>Go back to the homepage</button>
      </p>
    </>
  )
}

export default {
  HomePage,
  PlaylistPage,
  MusicPage,
  ErrorPage
}