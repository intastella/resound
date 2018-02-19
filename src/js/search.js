import rsModalClose from './modals.js';

var rsMusicSearchArtistsPage;
var rsMusicSearchAlbumsPage;
var rsMusicSearchInput;
var rsMusicSearchMessage;
var rsMusicSearchResults;
var rsMusicSearchResultsArtists;
var rsMusicSearchResultsAlbums;
var rsMusicSearchMessageDefault = "Search to find<br>Artists and Albums";
var rsMusicSearchMessageNoResults = "No Artists found";

function rsInitMusicSearchInput() {
  rsMusicSearchArtistsPage = document.querySelector('.js-music-search-artists-page');
  rsMusicSearchAlbumsPage = document.querySelector('.js-music-search-albums-page');
  rsMusicSearchInput = document.querySelector('.js-music-search-input');
  rsMusicSearchMessage = document.querySelector('.js-music-search-message');
  rsMusicSearchResults = document.querySelector('.js-music-search-results');
  rsMusicSearchResultsArtists = document.querySelector('.js-music-search-results-artists');
  rsMusicSearchResultsAlbums = document.querySelector('.js-music-search-results-albums');
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
          var rsArtistListTemplate = "";
          var i;
          for (i = 0; i < rsMusicSearchArtistsResultsDeDuped.length; i++) {
            rsArtistListTemplate += "<li class='modal__music-overlay-search-results-list-item js-music-search-artist-link' data-artist-id='"+ rsMusicSearchArtistsResultsDeDuped[i].artistId + "'><div class='modal__music-overlay-search-results-list-item-label'>"+ rsMusicSearchArtistsResultsDeDuped[i].artistName + "</div><svg class='modal__music-overlay-search-results-list-item-arrow' width='7' height='12' viewBox='0 0 7 12' xmlns='http://www.w3.org/2000/svg'><path d='M6.83 5.593a.572.572 0 0 1 0 .814l-5.394 5.349a.847.847 0 0 1-1.19 0 .83.83 0 0 1 0-1.18L4.86 6 .246 1.425a.831.831 0 0 1 0-1.18.847.847 0 0 1 1.19 0L6.83 5.592z' fill-rule='evenodd'/></svg></li>";
          }
          rsMusicSearchResultsArtists.innerHTML = rsArtistListTemplate;
          rsMusicSearchMessage.classList.add('modal__music-overlay-search-message--off');
          rsMusicSearchResults.classList.add('modal__music-overlay-search-results--on');
          rsBindMusicSearchArtistLinks();
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
    
    setTimeout(function(){
      rsResetMusicSearch();
    }, 500);
  });
}

function rsBindMusicSearchArtistLinks() {
  var rsMusicSearchArtistLinks = document.querySelectorAll('.js-music-search-artist-link');
  Array.prototype.forEach.call(rsMusicSearchArtistLinks, function(el, i){
    rsMusicSearchArtistLinks[i].addEventListener('click', function(el) {
      rsMusicSearchArtistAlbum(el.currentTarget.dataset.artistId);
    });
  });
}

function rsMusicSearchArtistAlbum(artistId) {
  var request = new XMLHttpRequest();
  request.open('GET', 'https://itunes.apple.com/lookup?id='+ artistId + '&entity=album', true);
  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      var rsMusicSearchArtistAlbumResults = JSON.parse(request.responseText);
      rsMusicSearchArtistAlbumResults = rsMusicSearchArtistAlbumResults.results;
      rsMusicSearchArtistAlbumResults.splice(0, 1); // Remove first album entry which is not an album
      rsMusicSearchArtistAlbumResults = _.orderBy(rsMusicSearchArtistAlbumResults, ['collectionName'], ['asc']);
      
      rsMusicSearchResultsAlbums.innerHTML = "";
      if (rsMusicSearchArtistAlbumResults.length > 0) {
        var rsAlbumListTemplate = "";
        var i;
        for (i = 0; i < rsMusicSearchArtistAlbumResults.length; i++) {
          rsAlbumListTemplate += "<li class='modal__music-overlay-search-results-list-item js-music-search-album-link' data-album-id='"+ rsMusicSearchArtistAlbumResults[i].collectionId + "'><img class='modal__music-overlay-search-results-list-item-image' src='"+ rsMusicSearchArtistAlbumResults[i].artworkUrl100 +"'/><div class='modal__music-overlay-search-results-list-item-label'>"+ rsMusicSearchArtistAlbumResults[i].collectionName + "</div></li>";
        }
        rsMusicSearchResultsAlbums.innerHTML = rsAlbumListTemplate;
        rsMusicSearchArtistsPage.classList.add('modal__music-overlay-content-page--artists-off');
        rsMusicSearchAlbumsPage.classList.add('modal__music-overlay-content-page--albums-on');
      }
    }
  };
  request.send();
}

function rsInitSearch() {
  rsInitMusicSearchInput();
  rsBindMusicOverlayCloseLinks();
}

export {rsInitSearch};
export default rsInitSearch;