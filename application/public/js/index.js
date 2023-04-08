var url = 'https://jsonplaceholder.typicode.com/albums/2/photos'



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
        function fadeOut(ev){
            var ele = ev.currentTarget;
        
            ele.style.transition = 'opacity .5s';
            ele.style.opacity = 0;
            let timer = setInterval(function () {
                ele.remove();
                clearInterval(timer);
            }, 500);
            //console.log(ev.currentTarget);
        
        }

function makeElement(type, attr, src, children){
    var e = document.createElement(type);
    if(attr){
        e.setAttribute('class', attr);
    }
    if (src){
        e.setAttribute('src', src);
    }
    if (children){
        children.forEach(function (child) {
            e.appendChild(child);
        })
    }
    return e;
}


function buildCard(data){
    var imgTag = makeElement('img', 'product-img', data.thumbnailUrl, null);
    var titleTag = makeElement('p', 'product-title', null, [document.createTextNode(data.title)]);
    var productDiv = makeElement('div', 'product-info', null, [titleTag])
    var cardDiv = makeElement('div', 'product-card', null, [imgTag, productDiv]);
    cardDiv.addEventListener('click', fadeOut);
    return cardDiv;
}




/**
 * fetching products from PIT and render it onto the index page
 */

async function fetchWithDOMAPI(){
    try{
        var response = await fetch(url);
        var data = await response.json();
        var elements = data.map(buildCard);
        document.getElementById('product-list').append(...elements);
    }
    catch(err){
        console.log(err);
    }
}


fetchWithDOMAPI();