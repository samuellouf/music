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

async function loadMusicInfo(){
  window.manifest = await fetch('./manifest.json').then((r) => r.json());

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

  if (window.manifest.iframe){
    let iframe = document.createElement('iframe');
    iframe.style.width = 560;
    iframe.style.height = 315;
    iframe.src = window.manifest.iframe;
    iframe.title = "YouTube video player";
    iframe.frameBorder = '0';
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.referrerPolicy = "strict-origin-when-cross-origin";
    iframe.allowFullscreen = true;
    main.appendChild(iframe);
  }

  const generateDownloadButton = (type) => {
    var src = '../';
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

  loadMusicInfo();
}