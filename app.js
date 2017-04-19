console.log(8);

function trigger(e) {
  if (e.keyCode == 72) {
    const selectedText = getSelectionText();
    const body = $("body")[0];
    const handy = $(`<div><p>${selectedText}</p></div>`)
      .addClass("handy");

    const wikipediaHref = `https://en.wikipedia.org/w/index.php?search=${selectedText}`
    const wikipedia = $(`<div><a target='_blank' href='${wikipediaHref}'>wikipedia</a></div>`);

    const twitterHref = `https://twitter.com/search?q=${selectedText}`
    const twitter = $(`<div><a target='_blank' href='${twitterHref}'>twitter</a></div>`);

    const googleHref = `https://google.com/search?q=${selectedText}`
    const google = $(`<div><a target='_blank' href='${googleHref}'>google</a></div>`);

    const googleMapsHref = `https://google.com/maps/search/${selectedText}`
    const googleMaps = $(`<div><a target='_blank' href='${googleMapsHref}'>google maps</a></div>`);

    const youtubeSampleHref = `<iframe width="560" height="315" src="https://www.youtube.com/embed/Qp_QA8ijWOE" frameborder="0" allowfullscreen></iframe>`
    const youtubeSample = $(`<div>${youtubeSampleHref}'</div>`);

    handy.append(wikipedia);
    handy.append(twitter);
    handy.append(google);
    handy.append(googleMaps);
    handy.append(youtubeSample);

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