(function() {
  /**
   * @constructor
   * @param {static} staticImagesModule
   * @param {flickr} flickrImagesFinder
   */
  var ImageFinder = (window.CLASSES.ImageFinder = function(staticImagesModule) {
    this._staticImagesModule = staticImagesModule;
  });

  ImageFinder.prototype.search = function(query, moduleId) {
    let result = { query: query, images: [] };
    if (moduleId === "static") {
      result.images = this._staticImagesModule.search(query);
    } else {
      throw Error("Wrong module");
    }
    return result;
  };
})();
