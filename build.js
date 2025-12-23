const fs = require("fs");
const path = require("path");

function generateMusicPage(manifest){
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My music - ${manifest.name}</title>
    <link rel="stylesheet" href="https://samuellouf.github.io/music/assets/style.css">
  </head>
  <body class="mobile" under="650">
    <div id="page">
      <div id="main">
        <h1 align="center" class="title">${manifest.name}</h1>
        <div class="music">
          <div class="miniature">
            <img src="./miniature.png">
          </div>
        </div>
        <div class="text">
          <h2>${manifest.description}</h2>
          ${manifest.isRemake ? '<p>Remake by : <a href="https://www.youtube.com/@SamuelLouf">SamuelLouf</a></p>' : ''}
        </div>
        <iframe src="https://www.youtube-nocookie.com/embed/${manifest.ytid}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen=""></iframe>
      </div>
      <div id="downloads">
      </div>
    </div>
    
    <script src="https://samuellouf.github.io/music/assets/music.js"></script>

  </body>
</html>`;
}

function generatePlaylistPage(manifest){
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${manifest.name} [PLAYLIST]</title>
    <link rel="stylesheet" href="https://samuellouf.github.io/music/assets/style.css">
  </head>
  <body>
    <div id="page">
      <div id="playlist">
        <h1 class="title">${manifest.name}</h1>
        <p class="description">${manifest.description}</p>
        <div id="musics">
        </div>
      </div>
    </div>
    <script src="https://samuellouf.github.io/music/assets/music.js"></script>
  </body>
</html>`
}

async function buildMusicPage(id){
  var manifest = JSON.parse(fs.readFileSync(path.join("musics", id, "manifest.json"), { encoding: "utf-8" }));
  if (manifest.type == "song"){
    fs.mkdirSync(path.join("build", id));
    fs.copyFileSync(path.join("musics", id, "audio_file.wav"), path.join("build", id, "audio_file.wav"));
    fs.copyFileSync(path.join("musics", id, "midi_file.mid"), path.join("build", id, "midi_file.mid"));
    fs.copyFileSync(path.join("musics", id, "MuseScore_file.mscz"), path.join("build", id, "MuseScore_file.mscz"));
    fs.copyFileSync(path.join("musics", id, "pdf_file.pdf"), path.join("build", id, "pdf_file.pdf"));
    fs.copyFileSync(path.join("musics", id, "miniature.png"), path.join("build", id, "miniature.png"));
    fs.writeFileSync(path.join("build", id, "index.html"), generateMusicPage(manifest), "utf-8");
  } else if (manifest.type == "playlist"){
    fs.mkdirSync(path.join("build", id));
    fs.writeFileSync(path.join("build", id, "index.html"), generatePlaylistPage(manifest), "utf-8");
  }
}

async function buildWebsite(){
  await fs.rmSync("build", { recursive: true, force: true });
  await fs.mkdirSync("build");
  await fs.mkdirSync("build/assets");
  fs.copyFileSync("assets/audio_icon.svg", "build/assets/audio_icon.svg");
  fs.copyFileSync("assets/midi_icon.svg", "build/assets/midi_icon.svg");
  fs.copyFileSync("assets/MuseScore_icon.svg", "build/assets/MuseScore_icon.svg");
  fs.copyFileSync("assets/pdf_icon.svg", "build/assets/pdf_icon.svg");
  fs.copyFileSync("assets/calibri.ttf", "build/assets/calibri.ttf");
  fs.copyFileSync("assets/music.js", "build/assets/music.js");
  fs.copyFileSync("assets/style.css", "build/assets/style.css");
  for (var file of fs.readdirSync("musics", { recursive: true })){
    if (!file.includes(".")){
      buildMusicPage(file);
    }
  }
}

buildWebsite()