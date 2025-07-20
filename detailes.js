
document.addEventListener("DOMContentLoaded",()=>{

    async function populateproduct(){
        const queryparamsobject=getqueryparams();
        console.log("Query Params:", queryparamsobject);

        if(queryparamsobject.id){
            const productid=queryparamsobject.id;
            const product = await fetchproductbyid(productid);
            const loaderbackdrop=document.getElementById("loaderbackdrop");
            removeloader();

            const prodname=document.getElementById("product-name");
            const prodprice=document.getElementById("product-price");
            const proddata=document.getElementById("prod-data");
            const prodimg=document.getElementById("image");
            
            prodname.textContent=product.title;
            proddata.textContent=product.description;
            prodimg.src=product.image;
            prodprice.innerHTML=`&#x24 ${product.price}`;
             
            
        }
    

    }
    populateproduct();
})