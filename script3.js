
const bookmarks = {
  propertyName: {
    name: "altoid",
    url: "www.coolkid.com",
  },
  propertyName2: {
    name: "YellowCup",
    url: "www.greencup.com",
  },
};

console.log(bookmarks);
//////////////////////////////////////////////

function buildBookmarks() {
  // Build items
  Object.keys(bookmarks).forEach((key) => {
   const {name, url} = bookmarks[key]

    let markup += `
    <di class="item">
    <i
       class="fa-solid fa-x"
       style="color: white"
       id="delete-bookmark"
       title="Delete Bookmark"
       data-url="${iteration.url}"
    ></i>
    <div class="name">
       <img
          src='https://www.google.com/s2/u/0/favicons?domain=${iteration.url}'
          alt="Favicon"
       />
       <a href="${iteration.url}" target="_blank">${iteration.name}</a>
    </div>
    </di>
    `;
    
  });
}

buildBookmarks();
