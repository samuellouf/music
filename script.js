let musics = [
  // My Music Database
];

let musics_ids = [];

function loadMusic(music) {
  let mainlink = document.createElement('a');
  mainlink.classList.add('nodecoration');
  let main = document.createElement('div');
  main.classList.add('music');
  mainlink.appendChild(main);

  mainlink.href = './' + music.id;
  
  let miniature_div = document.createElement('div');
  miniature_div.classList.add('miniature');
  main.appendChild(miniature_div);

  let miniature = document.createElement('img');
  miniature.src = './' + music.id + '/miniature.png';
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

musics.forEach(loadMusic);

document.addEventListener('DOMContentLoaded', async function () {
  musics_ids = await fetch('./musics.json').then((r) => r.json());
  for (var id of musics_ids.filter((id) => !id.includes('/'))){
    var manifest = await fetch('./' + id + '/manifest.json').then((r) => r.json());
    musics.push(manifest);
    loadMusic(manifest);
  }
});