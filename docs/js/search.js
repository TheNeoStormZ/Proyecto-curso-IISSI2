"use  strict";

function main() {
    let searchForm = document.getElementById("form-search");
    searchForm.onsubmit = handleSearch;
  }

function handleSearch(event){
    let textSearch = document.getElementById("search-input");
    event.preventDefault();
    let searchValue = textSearch.value;

    window.location.href = "index.html?category="+searchValue;
}

document.addEventListener("DOMContentLoaded", main);