(function () {

  var static = window.MODULES.static = function () { };

  /**
   * Search the images  static-images-db 
    @param query -> get individual results
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
      return {query, images};
  }

})(); 