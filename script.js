let url=" https://www.googleapis.com/books/v1/volumes?q=";
let search=document.querySelector("#searchinput");
let bookgallery=document.querySelector(".bookgallery");
let searchFor=document.querySelector("#searchFor");
let history=JSON.parse(localStorage.getItem("bookHistory"))||[];


function searchFunction(){
    fetch(`${url}+${search.value}`)
    .then((res)=>res.json())
    .then((data)=>displayBooks(data.items))
    .catch((err)=>console.log(err.message))
}

function displayBooks(items){
    bookgallery.innerHTML="";
    let currentSearch={
        search: search.value,
        date:new Date().toLocaleDateString(),
        time:new Date().toLocaleTimeString({
            hour: '2-digit',
            minute: '2-digit',
            })
    }
    history.push(currentSearch);
    searchFor.textContent=`Book Results For '${search.value}'`;
    searchFor.style.display="block";
    
    items.map((item)=>{
        let book=item.volumeInformation;
        let bookDisplay=document.createElement("div");
        bookDisplay.setAttribute("class","bookDisplay");
        let bookPic=document.createElement("div");
        bookPic.setAttribute("class","bookPic");
        let bookWrap=document.createElement("img");
        bookWrap.src=book.imageLinks.thumbnail;
        bookPic.append(bookWrap);
        let description=document.createElement("div");
        description.setAttribute("class","description");
        let title=document.createElement("p");
        title.setAttribute("class","title");
        title.textContent=book.title;
        let author=document.createElement("p");
        author.innerHTML=`${book.authors}`;
        let publisher=document.createElement("p");
        publisher.innerHTML=`${book.publisher}`;
        desc.append(title,author,publisher);
        let buyOption=document.createElement("div");
        buyOption.setAttribute("class","buyOption");
        let buyButton=document.createElement("button");
        buyButton.setAttribute("class","buyButton");
        buyButton.innerText="Buy Now";
        buyDiv.append(buyButton);
        bookBox.append(bookPic,description,buyOption);
        bookgallery.append(bookDisplay);
    })
    localStorage.setItem("bookHistory",JSON.stringify(history));
    search.value="";
}

