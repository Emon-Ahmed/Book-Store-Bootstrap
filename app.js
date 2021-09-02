const searchBook = () => {
  document.getElementById("showing").innerHTML = "";
  const searchText = document.getElementById("searchTextID");
  const searchTextValue = searchText.value;
  const url = `https://openlibrary.org/search.json?q=${searchTextValue}`;
  searchText.value = "";
  const bookLoading = document.getElementById("row");
  bookLoading.innerHTML = `
    <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
    </div>
  `;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      showBook(data.docs.slice(0, 20), data.docs.length, data.numFound);
    });
};

const showBook = (docs, length, totalBook) => {
  const showTitle = document.getElementById("row");
  showTitle.innerHTML = "";
  if (docs.length > 0) {
    document.getElementById(
      "showing"
    ).innerHTML = `<span class="text-center fw-blod">Total Books: ${totalBook}</span>
        <span class="text-center fw-blod">Showing Result: ${length}</span>`;

    docs.forEach((book) => {
      document.getElementById("row").innerHTML += `
            <div class="col-md-3">
                <span>
                    <div class="card my-5">
                        <img class="card-img-top" src="
                        
                            ${
                              book.cover_i
                                ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                                : `https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1200px-No-Image-Placeholder.svg.png`
                            }
                        
                        "  alt="Card image cap">
                        <div class="card-body bg-light">
                            <p class="card-text">${book.title}</p>
                            <p class="card-text">${book.first_publish_year}</p>
                            <p class="card-text">${book.publisher}</p>
                            <p class="card-text">${book.author_name}</p>
                            
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
