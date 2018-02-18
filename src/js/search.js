import rsModalClose from './modals.js';

var rsMusicSearchInput;
var rsMusicSearchMessage;
var rsMusicSearchResults;
var rsMusicSearchResultsArtists;
var rsMusicSearchMessageDefault = "Search to find<br>Artists and Albums";
var rsMusicSearchMessageNoResults = "No Artists found";

function rsInitMusicSearchInput() {
  rsMusicSearchInput = document.querySelector('.js-music-search-input');
  rsMusicSearchMessage = document.querySelector('.js-music-search-message');
  rsMusicSearchResults = document.querySelector('.js-music-search-results');
  rsMusicSearchResultsArtists = document.querySelector('.js-music-search-results-artists');
  rsMusicSearchInput.addEventListener('keyup', rsMusicSearchArtists);
}

function rsMusicSearchArtists() {
  if (rsMusicSearchInput.value !== "") {
    var request = new XMLHttpRequest();
    request.open('GET', 'https://itunes.apple.com/search?term='+ encodeURI(rsMusicSearchInput.value) + '&entity=musicArtist', true);
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        var rsMusicSearchArtistsResults = JSON.parse(request.responseText);
        var rsMusicSearchArtistsResultsDeDuped = _.uniq(rsMusicSearchArtistsResults.results);
        rsMusicSearchArtistsResultsDeDuped = _.orderBy(rsMusicSearchArtistsResultsDeDuped, ['artistName'], ['asc']);
        rsMusicSearchResultsArtists.innerHTML = "";
        if (rsMusicSearchArtistsResultsDeDuped.length > 0) {
          var rsListTemplate = "";
          var i;
          for (i = 0; i < rsMusicSearchArtistsResultsDeDuped.length; i++) {
            rsListTemplate += "<li class='modal__music-overlay-search-results-list-item' data-artist-id='"+ rsMusicSearchArtistsResultsDeDuped[i].artistId + "'>"+ rsMusicSearchArtistsResultsDeDuped[i].artistName + "</li>";
          }
          rsMusicSearchResultsArtists.innerHTML = rsListTemplate;
          rsMusicSearchMessage.classList.add('modal__music-overlay-search-message--off');
          rsMusicSearchResults.classList.add('modal__music-overlay-search-results--on');
        } else {
          rsMusicSearchMessage.classList.remove('modal__music-overlay-search-message--off');
          rsMusicSearchResults.classList.remove('modal__music-overlay-search-results--on');
          rsMusicSearchMessage.innerHTML = rsMusicSearchMessageNoResults;
        }
      }
    };
    request.send();
  } else {
    rsResetMusicSearchResults();
  }
}

function rsResetMusicSearchResults() {
  rsMusicSearchMessage.classList.remove('modal__music-overlay-search-message--off');
  rsMusicSearchResults.classList.remove('modal__music-overlay-search-results--on');
  rsMusicSearchMessage.innerHTML = rsMusicSearchMessageDefault;
}

function rsResetMusicSearch() {
  rsResetMusicSearchResults();
  rsMusicSearchInput.value = "";
}

function rsBindMusicOverlayCloseLinks() {
  var rsMusicOverlayClose = document.querySelector('.js-music-overlay-close');
  rsMusicOverlayClose.addEventListener('click', function(el) {
    el.preventDefault();
    el.stopPropagation();
    // rsModalClose(el.currentTarget, rsResetMusicSearch);
    rsResetMusicSearch();
  });
}

function rsInitSearch() {
  rsInitMusicSearchInput();
  rsBindMusicOverlayCloseLinks();
}

export {rsInitSearch};
export default rsInitSearch;