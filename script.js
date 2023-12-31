const modal = document.getElementById("modal");
const modalShow = document.getElementById("show-modal");
const modalClose = document.getElementById("close-modal");
const bookmarkForm = document.getElementById("bookmark-form");
const websiteNameEl = document.getElementById("website-name");
const websiteUrlEl = document.getElementById("website-url");
const bookmarksContainer = document.getElementById("bookmarks-container");

//State Variable
let bookmarks = [];

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
  const allBookmarksMarkup = bookmarks
    .map((bmark) => {
      return `
      <di class="item">
      <i
         class="fa-solid fa-x"
         style="color: white"
         id="delete-bookmark"
         title="Delete Bookmark"
         data-url="${bmark.url}"
      ></i>
      <div class="name">
         <img
            src='https://www.google.com/s2/u/0/favicons?domain=${bmark.url}'
            alt="Favicon"
         />
         <a href="${bmark.url}" target="_blank">${bmark.name}</a>
      </div>
      </di>
`;
    })
    .join("");
  bookmarksContainer.innerHTML = "";
  bookmarksContainer.insertAdjacentHTML("beforeend", allBookmarksMarkup);
  console.log(`bookmarks rendered`, bookmarks);
};

//Delete Bookmark
const deleteBookmark = function (clickedUrl) {
  //When button gets clicked, findIndex of of bookmark in our state variable.
  const index = bookmarks.findIndex((bookmark) => bookmark.url === clickedUrl);
  if (index === -1) return;
  //Delete the element in the bookmarks array that has that index
  bookmarks.splice(index, 1);
  //Update the bookmarks Storage
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  //Update the DOM elements without rendering the whole dom.
  loadBookmarksHtml();
};

//Fetch Bookmarks
const fetchBookmarks = function () {
  if (localStorage.getItem("bookmarks")) {
    bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  } else {
    bookmarks = [
      {
        name: "Chris Website",
        url: "www.somewebsite2.com",
      },
    ];
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
  bookmarks.push(bookmark);
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
