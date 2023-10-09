const modal = document.getElementById("modal");
const modalShow = document.getElementById("show-modal");
const modalClose = document.getElementById("close-modal");
const bookmarkForm = document.getElementById("bookmark-form");
const websiteNameEl = document.getElementById("website-name");
const websiteUrlEl = document.getElementById("website-url");
const bookmarksContainer = document.getElementById("bookmarks-container");

//State Variable
let bookmarks = {};

//Show modal, Focus on Input
const showModal = function () {
  modal.classList.add("show-modal");
  websiteNameEl.focus();
};

//Modal Event Listeners
modalShow.addEventListener("click", showModal);
modalClose.addEventListener("click", () =>
  modal.classList.remove("show-modal")
);

//Close Window Event Listener
window.addEventListener("click", (e) =>
  e.target === modal ? modal.classList.remove("show-modal") : false
);

//Validate Form
const validate = function (nameValue, urlValue) {
  const expression =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
  const regex = new RegExp(expression);
  if (!urlValue || !nameValue) {
    alert("Please submit values for both fields");
    return false;
  }

  if (urlValue.match(regex))
    if (!urlValue.match(regex)) {
      alert(`Please provide a valid URL`);
      return false;
    }
  //Valid
  return true;
};

//Build Bookmarks DOM
const loadBookmarksHtml = function () {
  // Remove all bookmark elements
  bookmarksContainer.textContent = "";
  // Build items
  Object.keys(bookmarks).forEach((id) => {
    const { name, url } = bookmarks[id];

    // Item
    const item = document.createElement("div");
    item.classList.add("item");
    // Close Icon
    const closeIcon = document.createElement("i");
    closeIcon.classList.add("fas", "fa-times", "deletebookmark");
    closeIcon.setAttribute("title", "Delete Bookmark");
    closeIcon.setAttribute("onclick", `deleteBookmark('${id}')`);
    // Favicon / Link Container
    const linkInfo = document.createElement("div");
    linkInfo.classList.add("name");
    // Favicon
    const favicon = document.createElement("img");
    favicon.setAttribute(
      "src",
      `https://s2.googleusercontent.com/s2/favicons?domain=${url}`
    );
    favicon.setAttribute("alt", "Favicon");
    // Link
    const link = document.createElement("a");
    link.setAttribute("href", `${url}`);
    link.setAttribute("target", "_blank");
    link.textContent = name;
    // Append to bookmarks container
    linkInfo.append(favicon, link);
    item.append(closeIcon, linkInfo);
    bookmarksContainer.appendChild(item);
  });
};

//Delete Bookmark
const deleteBookmark = function (id) {
  // Loop through the bookmarks array
  if (bookmarks[id]) {
    delete bookmarks[id];
  }
  // Update bookmarks array in localStorage, re-populate DOM
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  fetchBookmarks();
};

//Fetch Bookmarks
const fetchBookmarks = function () {
  if (localStorage.getItem("bookmarks")) {
    bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  } else {
    bookmarks = {
      label1: {
        name: "Chris Website",
        url: "www.someWeb.com",
      },
    };
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }
  loadBookmarksHtml();
};

//Handle data from Form
const storeBookmark = function (e) {
  e.preventDefault();
  const nameValue = websiteNameEl.value;
  let urlValue = websiteUrlEl.value;
  if (!urlValue.includes("https://") && !urlValue.includes("http://")) {
    urlValue = `https://${urlValue}`;
  }
  if (!validate(nameValue, urlValue)) {
    return false;
  }
  const bookmark = {
    name: nameValue,
    url: urlValue,
  };

  bookmarks[urlValue] = bookmark;
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  fetchBookmarks();
  bookmarkForm.reset();
  websiteNameEl.focus();
};

//Submit Event Listeners
bookmarkForm.addEventListener("submit", storeBookmark);

//Delete Bookmark Event Listener, using event bubbling
bookmarksContainer.addEventListener("click", function (e) {
  const btn = e.target.closest(".fa-x");
  if (!btn) return;
  const clickedUrl = btn.dataset.url;
  deleteBookmark(clickedUrl);
});

// 1) On load, fetch bookmarks from storage and put them inside the state variable
fetchBookmarks();

// 2) On load, get bookmarks from state variable, place them inside HTML elements, push HTML elements into DOM
