function downloadFromBlob(blob, filename) {
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');

  a.href = url;
  a.download = filename;

  document.body.appendChild(a);

  a.click();

  document.body.removeChild(a);

  URL.revokeObjectURL(url);
}

async function downloadFromURL(url, filename){
  try {
    var blob = await fetch(url).then((r) => r.blob());
    downloadFromBlob(blob, filename);
  } catch (e) {
    throw e;
  }
}

async function getMusicData(id){
  let musics = await fetch('../' + id + '/manifest.json').then((r) => r.json());
  return musics;
}

function loadMusic(music) {
  let mainlink = document.createElement('a');
  mainlink.classList.add('nodecoration');
  let main = document.createElement('div');
  main.classList.add('music');
  mainlink.appendChild(main);

  mainlink.href = 'https://samuellouf.github.io/music/' + music.id;
  
  let miniature_div = document.createElement('div');
  miniature_div.classList.add('miniature');
  main.appendChild(miniature_div);

  let miniature = document.createElement('img');
  miniature.src = 'https://samuellouf.github.io/music/' + music.id + '/miniature.png';
  miniature_div.appendChild(miniature);

  let text = document.createElement('div');
  text.classList.add('text');
  main.appendChild(text);

  let title = document.createElement('h1');
  title.innerText = music.name;
  text.appendChild(title);

  let description = document.createElement('h2');
  description.innerText = music.description;
  text.appendChild(description);

  let madeby = document.createElement('p');
  var link = ' <a href="https://www.youtube.com/@SamuelLouf">SamuelLouf</a>';
  if (music.isRemake){
    let original = document.createElement('p');
    original.innerText = 'Original by :\ ';
    for (var artist of music.original){
      if (typeof artist == 'string'){
        original.innerText += artist;
      } else {
        let a = document.createElement('a');
        a.innerText = artist.name;
        a.href = artist.url;
        original.appendChild(a);
      }
      
      if (music.original.indexOf(artist) != (music.original.length - 1)){
        original.innerHTML += ',\ ';
      }
    }
    text.appendChild(original);
    madeby.innerHTML = 'Remake by :' + link;
  } else {
    madeby.innerHTML = 'Made by :' + link;
  }
  text.appendChild(madeby);
   
  document.querySelector('#musics').appendChild(mainlink);
}

function refreshResolution(){
  if (window.innerWidth < 1080){
    document.body.removeAttribute('over');
  }

  if (window.innerWidth < 350) {
    document.body.classList.add('mobile');
    document.body.setAttribute('under', '350');
  } else if (window.innerWidth < 450) {
    document.body.classList.add('mobile');
    document.body.setAttribute('under', '450');
  } else if (window.innerWidth < 570) {
    document.body.classList.add('mobile');
    document.body.setAttribute('under', '570');
  } else if (window.innerWidth < 650) {
    document.body.classList.add('mobile');
    document.body.setAttribute('under', '650');
  } else if (window.innerWidth < 750) {
    document.body.classList.add('mobile');
    document.body.setAttribute('under', '750');
  } else if (window.innerWidth < 750) {
    document.body.classList.add('mobile');
    document.body.setAttribute('under', '750');
  } else if (window.innerWidth < 840) {
    document.body.classList.remove('mobile');
    document.body.setAttribute('under', '840');
  } else if (window.innerWidth < 1020) {
    document.body.classList.remove('mobile');
    document.body.setAttribute('under', '1020');
  } else if (window.innerWidth < 1080) {
    document.body.classList.remove('mobile');
    document.body.setAttribute('under', '1080');
  } else if (window.innerWidth >= 1080) {
    document.body.classList.remove('mobile');
    document.body.setAttribute('over', '1080');
    document.body.removeAttribute('under');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  refreshResolution();
}); 

window.addEventListener('resize', () => {
  refreshResolution();
}); 

async function loadMusicInfo(){
  let main = document.querySelector('#main');
  let downloads = document.querySelector('#downloads');

  let title = document.createElement('h1');
  title.setAttribute('align', 'center');
  title.classList.add('title');
  title.innerText = manifest.name;
  main.appendChild(title);

  let music = document.createElement('div');
  music.classList.add('music');
  main.appendChild(music);

  let miniature_div = document.createElement('div');
  miniature_div.classList.add('miniature');
  music.appendChild(miniature_div);

  let miniature = document.createElement('img');
  miniature.src = './miniature.png';
  miniature_div.appendChild(miniature);
  
  let text = document.createElement('div');
  main.appendChild(text);

  let desc = document.createElement('h2');
  desc.innerText = manifest.description;
  text.appendChild(desc);

  let madeby = document.createElement('p');
  var link = ' <a href="https://www.youtube.com/@SamuelLouf">SamuelLouf</a>';
  if (manifest.isRemake){
    let original = document.createElement('p');
    original.innerText = 'Original by :\ ';
    for (var artist of manifest.original){
      if (typeof artist == 'string'){
        original.innerText += artist;
      } else {
        let a = document.createElement('a');
        a.innerText = artist.name;
        a.href = artist.url;
        original.appendChild(a);
      }
      
      if (manifest.original.indexOf(artist) != (manifest.original.length - 1)){
        original.innerHTML += ',\ ';
      }
    }
    text.appendChild(original);
    madeby.innerHTML = 'Remake by :' + link;
  } else {
    madeby.innerHTML = 'Made by :' + link;
  }
  text.appendChild(madeby);

  if (window.manifest.ytid){
    let iframe = document.createElement('iframe');
    iframe.style.width = 560;
    iframe.style.height = 315;
    iframe.src = 'https://www.youtube-nocookie.com/embed/' + window.manifest.ytid;
    iframe.title = "YouTube video player";
    iframe.frameBorder = '0';
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.referrerPolicy = "strict-origin-when-cross-origin";
    iframe.allowFullscreen = true;
    main.appendChild(iframe);
  }

  const generateDownloadButton = (type) => {
    var src = 'https://samuellouf.github.io/music/';
    var func = null;
    var text = '';
    switch (type){
      case 'midi':
        src += 'midi_icon.svg';
        func = window.downloadMIDI;
        text = 'Donwload the MIDI file';
        break;
      case 'pdf':
        src += 'pdf_icon.svg';
        func = window.downloadPDF;
        text = 'Donwload the PDF file';
        break;
      case 'MuseScore':
        src += 'MuseScore_icon.svg';
        func = window.downloadMuseScore;
        text = 'Donwload the MuseScore file';
        break;
      case 'audio':
        src += 'audio_icon.svg';
        func = window.downloadAudio;
        text = 'Donwload the audio file';
        break;
      default:
        break;
    }

    let btn = document.createElement('div');
    btn.classList.add('button');
    btn.classList.add(type);
    btn.addEventListener('click', () => { func(); })

    let img_div = document.createElement('div');
    img_div.classList.add('img');
    btn.appendChild(img_div);
    let img = new Image();
    img.src = src;
    img_div.appendChild(img);

    let text_div = document.createElement('div');
    text_div.classList.add('text');
    text_div.innerText = text;
    btn.appendChild(text_div);

    return btn
  }

  if (manifest.files.midi){
    downloads.appendChild(generateDownloadButton('midi'));
  }

  if (manifest.files.pdf){
    downloads.appendChild(generateDownloadButton('pdf'));
  }

  if (manifest.files.musescore){
    downloads.appendChild(generateDownloadButton('MuseScore'));
  }

  if (manifest.files.audio){
    downloads.appendChild(generateDownloadButton('audio'));
  }
}

async function getMusicsFromPlaylist(id){
  let musics = await fetch('../musics.json').then((r) => r.json());
  return musics.filter((e) => e.startsWith(id + '/'));
}

async function loadPlaylistInfo() {
  document.querySelector('#playlist .title').innerText = manifest['name'];
  document.querySelector('#playlist .description').innerText = manifest['description'];
  for (var music of (await getMusicsFromPlaylist(manifest['id']))){
    loadMusic(await getMusicData(music));
  }
}

async function loadInfo(){
  window.manifest = await fetch('./manifest.json').then((r) => r.json());
  if (manifest['type'] == 'playlist'){
    loadPlaylistInfo();
  } else {
    loadMusicInfo();
  }
}

window.onload = function() {
  window.downloadMIDI = () => {
    downloadFromURL('./midi_file.mid', manifest.name + '.mid');
  }

  window.downloadPDF = () => {
    downloadFromURL('./pdf_file.pdf', manifest.name + '.pdf');
  }

  window.downloadMuseScore = () => {
    downloadFromURL('./MuseScore_file.mscz', manifest.name + '.mscz');
  }

  window.downloadAudio = () => {
    downloadFromURL('./audio_file.wav', manifest.name + '.wav');
  }

  loadInfo();
}