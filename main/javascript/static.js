(function () {

  var static = window.MODULES.static = function () { };

  /**
   * Search the images in static-images-db
    @param query -> a phrase added in a search imput field
   *  
   */
  static.prototype.search = function (query) {
      const images = window.DATA.staticImagesDb
      .filter(item => item.title.includes(query))
      .map(item => {
        return {
          id: item.id,
          url: item.url,
          title: item.title
        }
      });
      return images;
  }

})(); 