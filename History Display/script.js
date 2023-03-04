let historyContainer = document.querySelector(".historyContainer");

function historyDisplay(){
    let history = JSON.parse(localStorage.getItem("bookHistory"))||[];
    historyContainer.innerHTML="";
    history.map((data,index)=>{
        let list=document.createElement("div");
        list.setAttribute("class","list");
        let search = document.createElement("p");
        search.textContent=`${index+1}. ${data.search}`;
        let searchTime=document.createElement("div");
        searchTime.textContent=`Searched On: ${data.date} at ${data.time}`;
        list.append(search,searchTime);
        historyContainer.append(list);
        list.addEventListener("click",()=>{
            let currentBook={
                id:index+1,
                search:data.search,
                searchDate:data.date,
                searchTime:data.time
            }
            sessionStorage.setItem("currentBook",JSON.stringify(currentBook));
        })
    })

}

historyDisplay();

function resetFunction(){
    window.localStorage.removeItem('bookHistory');
    historyDisplay();

}