// Arrow Function & Search API Connection
const searchBook = () => {
  document.getElementById("showing").innerHTML = "";
  const searchText = document.getElementById("searchTextID");
  const searchTextValue = searchText.value;
  const url = `https://openlibrary.org/search.json?q=${searchTextValue}`;
  searchText.value = "";
  // Loading Spinner Setup
  const bookLoading = document.getElementById("row");
  bookLoading.innerHTML = `
    <div class="spinner-border text-info m-auto" role="status">
        <span class="visually-hidden">Loading...</span>
    </div>
  `;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      showBook(data.docs.slice(0, 24), data.docs.length, data.numFound);
    });
};

// Arrow Function & forEach Loop With Validation 
const showBook = (docs, length, totalBook) => {
  const showTitle = document.getElementById("row");
  showTitle.innerHTML = "";
  // Error Handle 
  if (docs.length > 0) {
    document.getElementById("showing").innerHTML = `
    <div class="text-center text-success">
      <span class="fw-bold">Total Books:</span> ${totalBook}
      <span class="fw-bold">Showing Result:</span> ${length}
    </div>`;
    docs.forEach((book) => {
      document.getElementById("row").innerHTML += `
            <div class="col-md-3">
                <span>
                    <div class="card my-4 shadow">
                        <img width="260" height="320" class="card-img-top" 
                        src="${book.cover_i
                            ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                            : `images/no.png`}" alt="Book Cover Photo">
                        <div class="card-body bg-light">
                            <h5 class="card-text fw-bold">${book.title}</h5>
                            <p class="card-text"><span class="fw-bold">First Publish Year:</span> ${book.first_publish_year}</p>
                            <p class="card-text"><span class="fw-bold">Puslisher Name:</span> ${book.publisher}</p>
                            <p class="card-text"><span class="fw-bold">Author Name:</span>  ${book.author_name}</p>
                        </div>
                    </div>
                </span>
            </div>
            `;
    });
  } else {
    document.getElementById("row").innerHTML = `
    <h1 class="text-warning text-center">Nothing Found</h1>
    `;
  }
};
