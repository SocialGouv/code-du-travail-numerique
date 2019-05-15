/**
 * This file is responsible for building the DOM and updating DOM state.
 *
 * @author Tim Scanlin
 */

const options = {
  // Where to render the table of contents.
  tocSelector: ".js-toc",
  // Where to grab the headings to build the table of contents.
  contentSelector: ".js-toc-content",
  // Which headings to grab inside of the contentSelector element.
  headingSelector: "h1, h2, h3",
  // Headings that match the ignoreSelector will be skipped.
  ignoreSelector: ".js-toc-ignore",
  // For headings inside relative or absolute positioned containers within content
  hasInnerContainers: false,
  // Main class to add to links.
  linkClass: "toc-link",
  // Extra classes to add to links.
  extraLinkClasses: "",
  // Class to add to active links,
  // the link corresponding to the top most heading on the page.
  activeLinkClass: "is-active-link",
  // Main class to add to lists.
  listClass: "toc-list",
  // Extra classes to add to lists.
  extraListClasses: "",
  // Class that gets added when a list should be collapsed.
  isCollapsedClass: "is-collapsed",
  // Class that gets added when a list should be able
  // to be collapsed but isn't necessarily collpased.
  collapsibleClass: "is-collapsible",
  // Class to add to list items.
  listItemClass: "toc-list-item",
  // Class to add to active list items.
  activeListItemClass: "is-active-li",
  // How many heading levels should not be collpased.
  // For example, number 6 will show everything since
  // there are only 6 heading levels and number 0 will collpase them all.
  // The sections that are hidden will open
  // and close as you scroll to headings within them.
  collapseDepth: 0,
  // Smooth scrolling enabled.
  scrollSmooth: true,
  // Smooth scroll duration.
  scrollSmoothDuration: 420,
  // Smooth scroll offset.
  scrollSmoothOffset: 0,
  // Callback for scroll end.
  scrollEndCallback: function() {},
  // Headings offset between the headings and the top of the document (this is meant for minor adjustments).
  headingsOffset: 1,
  // Timeout between events firing to make sure it's
  // not too rapid (for performance reasons).
  throttleTimeout: 100,
  // Element to add the positionFixedClass to.
  positionFixedSelector: null,
  // Fixed position class to add to make sidebar fixed after scrolling
  // down past the fixedSidebarOffset.
  positionFixedClass: "is-position-fixed",
  // fixedSidebarOffset can be any number but by default is set
  // to auto which sets the fixedSidebarOffset to the sidebar
  // element's offsetTop from the top of the document on init.
  fixedSidebarOffset: "auto",
  // includeHtml can be set to true to include the HTML markup from the
  // heading node instead of just including the textContent.
  includeHtml: false,
  // onclick function to apply to all links in toc. will be called with
  // the event as the first parameter, and this can be used to stop,
  // propagation, prevent default or perform action
  onClick: false,
  // orderedList can be set to false to generate unordered lists (ul)
  // instead of ordered lists (ol)
  orderedList: true,
  // If there is a fixed article scroll container, set to calculate titles' offset
  scrollContainer: null
};

const forEach = [].forEach;
const some = [].some;
let currentlyHighlighting = true;
const SPACE_CHAR = " ";

/**
 * Update fixed sidebar class.
 * @return {HTMLElement}
 */
function updateFixedSidebarClass() {
  var top;
  if (
    options.scrollContainer &&
    document.querySelector(options.scrollContainer)
  ) {
    top = document.querySelector(options.scrollContainer).scrollTop;
  } else {
    top = document.documentElement.scrollTop || document.body.scrollTop;
  }
  var posFixedEl = document.querySelector(options.positionFixedSelector);

  if (options.fixedSidebarOffset === "auto") {
    options.fixedSidebarOffset = document.querySelector(
      options.tocSelector
    ).offsetTop;
  }

  if (top > options.fixedSidebarOffset) {
    if (posFixedEl.className.indexOf(options.positionFixedClass) === -1) {
      posFixedEl.className += SPACE_CHAR + options.positionFixedClass;
    }
  } else {
    posFixedEl.className = posFixedEl.className
      .split(SPACE_CHAR + options.positionFixedClass)
      .join("");
  }
}

/**
 * Get top position of heading
 * @param {HTMLElement}
 * @return {integer} position
 */
function getHeadingTopPos(obj) {
  var position = 0;
  if (obj != document.querySelector(options.contentSelector && obj != null)) {
    position = obj.offsetTop;
    if (options.hasInnerContainers)
      position += getHeadingTopPos(obj.offsetParent);
  }
  return position;
}

/**
 * Update TOC highlighting and collpased groupings.
 */
function updateToc(headingsArray) {
  var top;
  // If a fixed content container was set
  if (
    options.scrollContainer &&
    document.querySelector(options.scrollContainer)
  ) {
    top = document.querySelector(options.scrollContainer).scrollTop;
  } else {
    top = document.documentElement.scrollTop || document.body.scrollTop;
  }

  // Add fixed class at offset
  if (options.positionFixedSelector) {
    updateFixedSidebarClass();
  }

  // Get the top most heading currently visible on the page so we know what to highlight.
  var headings = headingsArray;
  var topHeader;
  // Using some instead of each so that we can escape early.
  if (
    currentlyHighlighting &&
    document.querySelector(options.tocSelector) !== null &&
    headings.length > 0
  ) {
    some.call(headings, function(heading, i) {
      if (getHeadingTopPos(heading) > top + options.headingsOffset + 10) {
        // Don't allow negative index value.
        var index = i === 0 ? i : i - 1;
        topHeader = headings[index];
        return true;
      } else if (i === headings.length - 1) {
        // This allows scrolling for the last heading on the page.
        topHeader = headings[headings.length - 1];
        return true;
      }
    });

    // Remove the active class from the other tocLinks.
    var tocLinks = document
      .querySelector(options.tocSelector)
      .querySelectorAll("." + options.linkClass);
    forEach.call(tocLinks, function(tocLink) {
      tocLink.className = tocLink.className
        .split(SPACE_CHAR + options.activeLinkClass)
        .join("");
    });
    var tocLis = document
      .querySelector(options.tocSelector)
      .querySelectorAll("." + options.listItemClass);
    forEach.call(tocLis, function(tocLi) {
      tocLi.className = tocLi.className
        .split(SPACE_CHAR + options.activeListItemClass)
        .join("");
    });

    // Add the active class to the active tocLink.
    var activeTocLink = document
      .querySelector(options.tocSelector)
      .querySelector(
        "." + options.linkClass + '[href="#' + topHeader.id + '"]'
      );
    if (activeTocLink.className.indexOf(options.activeLinkClass) === -1) {
      activeTocLink.className += SPACE_CHAR + options.activeLinkClass;
    }
    var li = activeTocLink.parentNode;
    while (
      li &&
      li.className.indexOf(options.listItemClass) >= 0 &&
      li.className.indexOf(options.activeListItemClass) === -1
    ) {
      li.className += SPACE_CHAR + options.activeListItemClass;
      li = li.parentNode;
    }

    var tocLists = document
      .querySelector(options.tocSelector)
      .querySelectorAll(
        "." + options.listClass + "." + options.collapsibleClass
      );

    // Collapse the other collapsible lists.
    forEach.call(tocLists, function(list) {
      if (list.className.indexOf(options.isCollapsedClass) === -1) {
        list.className += SPACE_CHAR + options.isCollapsedClass;
      }
    });

    // Expand the active link's collapsible list and its sibling if applicable.
    if (
      activeTocLink.nextSibling &&
      activeTocLink.nextSibling.className.indexOf(options.isCollapsedClass) !==
        -1
    ) {
      activeTocLink.nextSibling.className = activeTocLink.nextSibling.className
        .split(SPACE_CHAR + options.isCollapsedClass)
        .join("");
    }
    removeCollapsedFromParents(activeTocLink.parentNode);
  }
}

/**
 * Remove collpased class from parent elements.
 * @param {HTMLElement} element
 * @return {HTMLElement}
 */
function removeCollapsedFromParents(element) {
  if (!element) {
    return;
  }
  if (
    element.className.indexOf(options.collapsibleClass) !== -1 &&
    element.className.indexOf(options.isCollapsedClass) !== -1
  ) {
    element.className = element.className
      .split(SPACE_CHAR + options.isCollapsedClass)
      .join("");
  }
  removeCollapsedFromParents(
    element.parentNode.closest(`.${options.collapsibleClass}`)
  );
}

/**
 * Disable TOC Animation when a link is clicked.
 * @param {Event} event
 */
function disableTocAnimation(event) {
  var target = event.target || event.srcElement;
  if (
    typeof target.className !== "string" ||
    target.className.indexOf(options.linkClass) === -1
  ) {
    return;
  }
  // Bind to tocLink clicks to temporarily disable highlighting
  // while smoothScroll is animating.
  currentlyHighlighting = false;
}

/**
 * Enable TOC Animation.
 */
function enableTocAnimation() {
  currentlyHighlighting = true;
}

// From: https://remysharp.com/2010/07/21/throttling-function-calls
function throttle(fn, threshhold, scope) {
  threshhold || (threshhold = 250);
  var last;
  var deferTimer;
  return function() {
    var context = scope || this;
    var now = +new Date();
    var args = arguments;
    if (last && now < last + threshhold) {
      // hold on to it
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function() {
        last = now;
        fn.apply(context, args);
      }, threshhold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
}

// Update Sidebar and bind listeners.
const createOnScrollHandler = headingsArray =>
  throttle(function(e) {
    updateToc(headingsArray);
    var isTop =
      e &&
      e.target &&
      e.target.scrollingElement &&
      e.target.scrollingElement.scrollTop === 0;
    if ((e && (e.eventPhase === 0 || e.currentTarget === null)) || isTop) {
      updateToc(headingsArray);
      // if (options.scrollEndCallback) {
      //   options.scrollEndCallback(e)
      // }
    }
  }, options.throttleTimeout);

/* Polyfill Element.closest for IE9+
   cf https://developer.mozilla.org/fr/docs/Web/API/Element/closest

if (!Element.prototype.matches)
  Element.prototype.matches =
    Element.prototype.msMatchesSelector ||
    Element.prototype.webkitMatchesSelector;
if (!Element.prototype.closest)
  Element.prototype.closest = function(s) {
    var el = this;
    if (!document.documentElement.contains(el)) return null;
    do {
      if (el.matches(s)) return el;
      el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType == 1);
    return null;
  };
*/

export { enableTocAnimation, disableTocAnimation, createOnScrollHandler };
