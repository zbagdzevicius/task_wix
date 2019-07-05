(function() {
  var flickr = (window.MODULES.flickr = function() {
    this.abortController = null;
  });

  /**
   * Call flickr API and search the images in flickr server
   * @param query - get individual results
   */
  flickr.prototype.search = function(query, abortController) {
    this.abortController = abortController;
    const images = new Promise((resolve,reject) => {
      this._getData(query)
      .then(data=> resolve(data))
      .catch( e => reject('aborting'))
    }) 
    return images;
  };
  
  flickr.prototype._getData =  function(query) {
    let api_key = "b394136d5dde8d9d0d4f8fc6685386e2";
    let flickrRequestURL = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${api_key}&tags=${query}&format=json&nojsoncallback=1`;
    return fetch(flickrRequestURL, {
      method: "get",
      signal: this.abortController.signal
    })
      .then(response => response.json())
      .then(response => {
        images = this._getImages(response["photos"]["photo"]);
        return {query, images};
      });
  };

  flickr.prototype._getImages = function(images) {
    return images.map(image => {
      var url = `https://farm${image["farm"]}.staticflickr.com/${
        image["server"]
      }/${image["id"]}_${image["secret"]}.jpg`;

      return {
        id: image["id"],
        url: url,
        title: image["title"]
      };
    });
  };
})();
