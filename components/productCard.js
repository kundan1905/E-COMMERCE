class ProductCard extends HTMLElement{
    constructor(){
        super();

        
        this.innerHTML = 
        `
        <div class="colm">
                          <div id="heart">
                          <i class="fa-sharp fa-regular fa-heart" aria-hidden="true"></i>
                          </div>
                          <a href="../pages/description.html?${this.getAttribute("productType")}|${this.getAttribute("productId")}|${this.getAttribute("inStock")}">
                            <img src="${this.getAttribute("productImage")}">
                            </a>
                            <h4>${this.getAttribute("productName")}</h4>
                            <div class="rating">
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                            </div>
                            ${this.getAttribute("inStock")=="false"?"<p class='out_of_stock'>OUT OF STOCK</p>":"In Stock"}
                            <p>${this.getAttribute("productPrice")}</p>
                      
        </div>
        `
    }

}

window.customElements.define('product-card',ProductCard);