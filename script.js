const addBookmark = document.getElementById("show-modal");
const closeModal = document.getElementById("close-modal");

addBookmark.addEventListener("click", function () {
  document.querySelector(".modal-container").classList.add("show-modal");
});

closeModal.addEventListener("click", function () {
  document.querySelector(".modal-container").classList.remove("show-modal");
});
