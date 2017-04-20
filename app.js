// Todo remove and reset any auth keys.
const YOUTUBE_API_KEY = "AIzaSyBCp3C5w5wOT8DV3xrDGCzvmMU4yIHY1AY";
const OXFORD_APP_ID = "3fbd090e";
const OXFORD_APP_KEY = "00b7e37cb0d03a9c3515d8df0844c9c0";

function initHandy() {
  const selectedText = getSelectionText();

  if (selectedText.length > 1) {
    const youtubeSearchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${selectedText}&key=${YOUTUBE_API_KEY}`;
    let youtubeVideoId = null;

    $.get(youtubeSearchUrl, function(data) {
      youtubeVideoId = data.items[0].id.videoId;
      const youtubeSampleHref = `<iframe width="230" height="158" src="https://www.youtube.com/embed/${youtubeVideoId}" frameborder="0" allowfullscreen></iframe>`
      const youtubeIframe = $(`
        <div>${youtubeSampleHref}</div>
      `);
      handy.find(".handy-youtube").append(youtubeIframe);
    });

    $.ajax({
      url: `https://od-api.oxforddictionaries.com:443/api/v1/entries/en/${selectedText}`,
      headers: {
        app_id: OXFORD_APP_ID,
        app_key: OXFORD_APP_KEY
      }
    }).done(function(data) {
      // ?.
      const definition = data.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0];
      const example = data.results[0].lexicalEntries[0].entries[0].senses[0].examples[0].text;
      const category = data.results[0].lexicalEntries[0].lexicalCategory;
      const dictionaryEntry = $(`
        <div>
          <p class="handy-category">${category}</p>
          <p>${definition}.</p>
          <p class="handy-example">"${example}."</p>
        </div>
      `);
      handy.find(".handy-dictionary").append(dictionaryEntry);
    });


    const body = $("body")[0];
    // const background = $(``);

    const handy = $(`
      <div class="handy-container">
        <div class="handy-background"></div>
        <div class="handy">
          <div class="handy-title"><p><span class="handy-highlight">${selectedText}</span></p></div>
          <div class="handy-tiles"></div>
          <div class="handy-details">
            <div class="handy-youtube"></div>
            <div class="handy-dictionary"></div>
          </div>
        </div>
      </div>
    `);

    const tileFactory = new TileFactory(selectedText);

    const wikipedia = tileFactory.createTile("Wikipedia", "https://en.wikipedia.org/w/index.php?search=", "wikipedia.png");
    const twitter = tileFactory.createTile("Twitter", "https://twitter.com/search?q=", "twitter.png");
    const google = tileFactory.createTile("Google", "https://google.com/search?q=", "google.png");
    const googleMaps = tileFactory.createTile("Google Maps", "https://google.com/maps/search/", "googleMaps.png");
    const youtube = tileFactory.createTile("Youtube", "https://www.youtube.com/results?search_query=", "youtube.png");
    const spotify = tileFactory.createTile("Spotify", "https://open.spotify.com/search/results/", "spotify.png");
    const amazon = tileFactory.createTile("Amazon", "https://www.amazon.com/s/field-keywords=", "amazon.png");
    const ebay = tileFactory.createTile("eBay", "http://www.ebay.com/sch/&_nkw=", "ebay.png");
    const linkedin = tileFactory.createTile("Linkedin", "https://www.linkedin.com/search/results/index/?keywords=", "linkedin.png");
    const netflix = tileFactory.createTile("Netflix", "https://www.netflix.com/search?q=", "netflix.png");
    const stackoverflow = tileFactory.createTile("Stack Overflow", "http://stackoverflow.com/search?q=", "stackoverflow.png");
    const pinterest = tileFactory.createTile("Pinterest", "https://www.pinterest.com/search/pins/?q=", "pinterest.png");
    const rt = tileFactory.createTile("Rotten Tomatoes", "https://www.rottentomatoes.com/search/?search=", "rt.png");
    const imdb = tileFactory.createTile("IMDb", "http://www.imdb.com/find?q=", "imdb.png");

    const tiles = [
      google,
      youtube,
      wikipedia,
      twitter,
      stackoverflow,
      googleMaps,
      spotify,
      amazon,
      ebay,
      linkedin,
      pinterest,
      netflix,
      rt,
      imdb,
    ];

    

    for (let tile of tiles) {
      handy.find(".handy-tiles").append(tile);
    }

    
    
    // $(body).append(background);
    $(body).append(handy); 
  }
}

function trigger(e) {
  // esc key
  if (e.keyCode == 27) {
    closeHandy();
  }

  // shift + ctrl + z
  if (e.shiftKey && e.ctrlKey && e.keyCode == 90) {
    initHandy();
  }
}

function getSelectionText() {
  var text = "";
  if (window.getSelection) {
      text = window.getSelection().toString();
  } else if (document.selection && document.selection.type != "Control") {
      text = document.selection.createRange().text;
  }
  return text;
}

function closeHandy() {
  $(".handy-container").remove();
}

function closeHandyIfNotClicked(e) {
  const target = $(e.target);
  if (target.closest(".handy").length == 0) {
    closeHandy();
  }
}

document.addEventListener("keyup", trigger);
document.addEventListener("dblclick", initHandy);
document.addEventListener("click", closeHandyIfNotClicked);


class TileFactory {
  constructor(text) {
    this.text = text;
  }

  createTile(displayName, baseHref, imageUrl) {
    const href = `${baseHref}${this.text}`;
    const fullImageUrl = chrome.extension.getURL(`/images/${imageUrl}`);
    const tile = $(`
      <a target="_blank" href="${href}"">
        <div class="handy-tile">  
          <div class="handy-tile-image"></div>
        </div>
      </a>
    `);
    tile.find(".handy-tile-image").css("background-image", `url(${fullImageUrl})`);
    return tile
  }
}