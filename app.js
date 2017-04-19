console.log(8);

function trigger(e) {
  if (e.keyCode == 72) {
    const selectedText = getSelectionText();
    const body = $("body")[0];
    const handy = $(`<div><p>${selectedText}</p></div>`)
      .addClass("handy");

    const tileFactory = new TileFactory(selectedText);

    const wikipedia = tileFactory.createTile("Wikipedia", "https://en.wikipedia.org/w/index.php?search=");
    const twitter = tileFactory.createTile("Twitter", "https://twitter.com/search?q=");
    const google = tileFactory.createTile("Google", "https://google.com/search?q=");
    const googleMaps = tileFactory.createTile("Google Maps", "https://google.com/maps/search/");
    const youtube = tileFactory.createTile("Youtube", "https://www.youtube.com/results?search_query=");
    const spotify = tileFactory.createTile("Spotify", "https://open.spotify.com/search/results/");
    const amazon = tileFactory.createTile("Amazon", "https://www.amazon.com/s/field-keywords=");
    const ebay = tileFactory.createTile("eBay", "http://www.ebay.com/sch/&_nkw=");
    const linkedin = tileFactory.createTile("Linkedin", "https://www.linkedin.com/search/results/index/?keywords=");
    const netflix = tileFactory.createTile("Netflix", "https://www.netflix.com/search?q=");
    const stackoverflow = tileFactory.createTile("Stack Overflow", "http://stackoverflow.com/search?q=");
    const pinterest = tileFactory.createTile("Pinterest", "https://www.pinterest.com/search/pins/?q=");
    const rt = tileFactory.createTile("Rotten Tomatoes", "https://www.rottentomatoes.com/search/?search=");
    const imdb = tileFactory.createTile("IMDb", "http://www.imdb.com/find?q=");

    const tiles = [
      wikipedia,
      twitter,
      google,
      googleMaps,
      youtube,
      spotify,
      amazon,
      ebay,
      linkedin,
      netflix,
      stackoverflow,
      pinterest,
      rt,
      imdb,
    ];

    // const youtubeSampleHref = `<iframe width="560" height="315" src="https://www.youtube.com/embed/Qp_QA8ijWOE" frameborder="0" allowfullscreen></iframe>`
    // const youtubeSample = $(`<div>${youtubeSampleHref}'</div>`);

    for (let tile of tiles) {
      handy.append(tile);
    }

    $(body).append(handy);
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

document.addEventListener("keyup", trigger);


class TileFactory {
  constructor(text) {
    this.text = text;
  }

  createTile(displayName, baseHref) {
    const href = `${baseHref}${this.text}`;
    return $(`<div><a target='_blank' href='${href}'>${displayName}</a></div>`);
  }
}