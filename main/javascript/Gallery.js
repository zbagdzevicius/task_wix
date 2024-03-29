(function() {
  /**
   * @constructor
   * @param {ImageFinder} imageFinder
   */
  var Gallery = (window.CLASSES.Gallery = function(imageFinder) {
    this._imageFinder = imageFinder;
    this._createInterface();
    this._setFunctionality();
    if (!window.CLASSES.Gallery.count) {
      window.CLASSES.Gallery.count = 0;
    }
    this._galerryId = window.CLASSES.Gallery.count;
    ++window.CLASSES.Gallery.count;
  });

  /**
   * New search
   * @param {String} query - get individual results
   * @param {String} moduleId - identify module
   */
  Gallery.prototype.doSearch = function(query, moduleId = "flickr") {
    const modulesKeysArray = Object.keys(window.MODULES);
    if (modulesKeysArray.includes(moduleId)) {
      this._imageFinder.search(query, moduleId, this._galerryId).then(searchResults => {
        console.log(searchResults);
        this._onSearchResultReady(searchResults);
      });
    } else {
      throw new Error("Unknown module");
    }
  };

  /**
   * Handle search button clicks
   */
  Gallery.prototype._onSearchButtonClick = function(e) {
    let moduleId = this._selectInputNode.value;
    var query = this._queryInputNode.value;
    this.doSearch(query, moduleId);
  };

  /**
   * update gallery content with search results
   * @param {query:String{images:[{id:String, url:string, title:string}]}} searchResult - results object for gallery update
   */
  Gallery.prototype._onSearchResultReady = function(searchResult) {
    this._resultsNode.innerHTML = "";
    var imagesData = searchResult.images;
    for (var i = 0; i < imagesData.length; ++i) {
      var imgNode = document.createElement("img");
      imgNode.setAttribute("src", imagesData[i].url);
      this._resultsNode.appendChild(imgNode);
    }
  };

  /**
   * adds gallery main view node as child node
   * @param {htmlElement} node - html element to append to
   */
  Gallery.prototype.addToNode = function(node) {
    node.appendChild(this._viewNode);
  };

  /**
   * add search functionality to gallery
   */
  Gallery.prototype._setFunctionality = function() {
    // Bind function to instance
    var that = this;
    var originalOnSearchButtonClick = that._onSearchButtonClick;
    this._onSearchButtonClick = function() {
      originalOnSearchButtonClick.apply(that, arguments);
    };
    this._searchBtnNode.addEventListener("click", this._onSearchButtonClick);
  };

  /**
   * creates gallery view, inner structure and ui
   */
  Gallery.prototype._createInterface = function() {
    this._viewNode = document.createElement("div");
    this._viewNode.classList.add("gallery");

    this._resultsNode = document.createElement("div");
    this._resultsNode.classList.add("galleryItems");
    this._viewNode.appendChild(this._resultsNode);

    this._controlsNode = document.createElement("div");
    this._controlsNode.classList.add("galleryControls");
    this._viewNode.appendChild(this._controlsNode);

    this._queryInputNode = document.createElement("input");
    this._controlsNode.appendChild(this._queryInputNode);

    this._searchBtnNode = document.createElement("button");
    this._searchBtnNode.innerHTML = "search";
    this._controlsNode.appendChild(this._searchBtnNode);

    this._selectInputNode = document.createElement("select");
    this._selectOptionNodeOne = document.createElement("option");
    this._selectOptionNodeOne.innerHTML = "static";
    this._selectOptionNodeTwo = document.createElement("option");
    this._selectOptionNodeTwo.innerHTML = "flickr";
    this._selectInputNode.appendChild(this._selectOptionNodeOne);
    this._selectInputNode.appendChild(this._selectOptionNodeTwo);
    this._controlsNode.appendChild(this._selectInputNode);
    this._controlsNode.appendChild(this._selectInputNode);
  };
})();
