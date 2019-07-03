(function () {

  var ImageFinder = window.CLASSES.ImageFinder = function () {};

  ImageFinder.prototype.search = function (query) {
    const result = window.DATA.staticImagesDb
    .filter(item => item.title.includes(query))
    .map(item => {
      return {
        id: item.id,
        url: item.url,
        title: item.title
      }
    });

    return {
      query: query,
      images: result
    };
  }

})();