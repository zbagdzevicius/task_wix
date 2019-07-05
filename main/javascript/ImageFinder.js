(() => {
  /**
   * @constructor
   * @param {static} staticImagesModule
   * @param {flickr} flickrImagesModule
   */

  var ImageFinder = (window.CLASSES.ImageFinder = function(
    staticImagesModule,
    flicrImagesModule
  ) {
    this._staticImagesModule = staticImagesModule;
    this._flicrImagesModule = flicrImagesModule;
    this._abortController = new AbortController();
    this._galleryId = null;
    this._requests = null;
  });

  ImageFinder.prototype.search = function(query, moduleId, galleryId = null) {
    if (galleryId === this._galleryId) {
      console.log("Aborting ongoing request");
      this._abortController.abort();
      console.log('aborted');
      this._abortController = new AbortController();
    }
    this._galleryId = galleryId;
    console.log(galleryId);
    try {
      return new Promise(resolve => {
        resolve(this._getModuleResults(query, moduleId));
      });
    } catch (e) {
      console.log("aborted");
    }
  };

  ImageFinder.prototype._getModuleResults = function(query, moduleId) {
    if (moduleId === "static") {
      return this._staticImagesModule.search(query);
    }
    if (moduleId === "flickr") {
      return new Promise((resolve, reject) => {
        resolve(this._flicrImagesModule.search(query, this._abortController));
      });
    }
  };
})();
