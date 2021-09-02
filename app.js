const searchBook = () => {
  document.getElementById("showing").innerHTML = "";
  const searchText = document.getElementById("searchTextID");
  const searchTextValue = searchText.value;
  const url = `https://openlibrary.org/search.json?q=${searchTextValue}`;
  searchText.value = "";
  const bookLoading = document.getElementById("row");
  bookLoading.innerHTML = `
    <div class="spinner-border m-auto" role="status">
        <span class="visually-hidden">Loading...</span>
    </div>
  `;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      showBook(data.docs.slice(0, 24), data.docs.length, data.numFound);
    });
};
const showBook = (docs, length, totalBook) => {
  const showTitle = document.getElementById("row");
  showTitle.innerHTML = "";
  if (docs.length > 0) {
    document.getElementById(
      "showing"
    ).innerHTML = `
    <div class="text-center">
      <span class="fw-bold">Total Books:</span> ${totalBook}
      <span class="fw-bold">Showing Result:</span> ${length}
    </div>`;

    docs.forEach((book) => {
      document.getElementById("row").innerHTML += `
            <div class="col-md-3">
                <span>
                    <div class="card my-4 shadow">
                        <img class="card-img-top" 
                        src="${book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : `images/no.png`}" alt="Book Cover Photo">
                        <div class="card-body bg-light">
                            <p class="card-text fw-bold">${book.title}</p>
                            <p class="card-text">First Publish Year: ${book.first_publish_year}</p>
                            <p class="card-text">Puslisher Name: ${book.publisher}</p>
                            <p class="card-text">Author Name: ${book.author_name}</p>
                        </div>
                    </div>
                </span>
            </div>
            `;
    });
  } else {
    document.getElementById("row").innerHTML = `
        <p class="text-warning"> Nothing Found </p>
        `;
  }
};