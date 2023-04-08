var url = 'https://dummyjson.com/products'

async function fetchWithString() {
    try{
        // fetch(url, {
        //     method: "POST",
        //     headers: {
        //         "content-Type": "application/json"
        //     },
        //     body: JSON.stringify({
        //         name:"tony",
        //         id:1231231

        //     }),
        // }) 

        var response = await fetch(url);
        

        var data = await response.json();
        var htmlString = data.products.reduce(function(prev, product){
            return (prev + `<div id="product-list" class="product-list">
            <div class="product-card">
                <img class="product-img" src="${product.thumbnail}">
                <div class="product-info">
                    <p class="product-title">${product.title}</p>
                    <p class="product-cost">${product.cost}</p>
                </div>
            </div>
        </div>`);
        }, "");
        
        document.getElementById('product-list').innerHTML = htmlString;
        let cards= document.getElementsByClassName('product-card');
        [...cards].forEach(function(e) {
            e.addEventListener('click', function(ev){
                let x= e.getElementsByClassName('product-title');
                console.log(e.innerHTML);
            });
        });
    }
     catch(error) {
        console.log(error)
     }
}

/**
 * `<div id="product-list" class="product-list">
            <div class="product-card">
                <img class="product-img" src="${product.thumbnail}">
                <div class="product-info">
                    <p class="product-title">${product.title}</p>
                    <p class="product-cost">${product.cost}</p>
                </div>
            </div>
        </div>`
 */

function makeElement(type, attr, text, children){

}


function fadeOut(ev){
    var ele = ev.currentTarget;

    ele.style.transition = 'opacity .5s';
    ele.style.opacity = 0;
    let timer = setInterval(function () {
        ele.remove();
        clearInterval(timer);
    }, 400);
    console.log(ev.currentTarget);

}
function buildCard(data){
    var cardDiv = document.createElement("div"); //, <div></div>
    cardDiv.setAttribute('class', 'product-card');

    var imgTag = document.createElement("img");
    imgTag.setAttribute("class", "product-img");
    imgTag.setAttribute("src", data.thumbnail);

    var titleTag = document.createElement("p");
    titleTag.setAttribute("class", "product-title");
    titleTag.appendChild(document.createTextNode(data.title));


    var costTag = document.createElement("p");
    costTag.setAttribute("class", "product-cost");
    costTag.appendChild(document.createTextNode(data.price));

    var productDiv = document.createElement("div"); //, <div></div>
    productDiv.setAttribute('class', 'product-info');

    productDiv.appendChild(titleTag);
    productDiv.appendChild(costTag);

    cardDiv.appendChild(imgTag);
    cardDiv.appendChild(productDiv);

    cardDiv.addEventListener('click', fadeOut);
    return cardDiv;
    
    
    
}

async function fetchWithDOMAPI(){
    try{
        var response = await fetch(url);
        var data = await response.json();
        var elements = data.products.map(buildCard);
        //console.log(elements);
        document.getElementById('product-list').append(...elements);
    }
    catch(err){
        console.log(err);
    }
}
//fetchWithString();
fetchWithDOMAPI();