console.log("product list is loaded");

document.addEventListener("DOMContentLoaded",async()=>{
   
    async function fetchproducts(){
    const response = await axios.get("https://fakestoreapi.com/products");
    removeloader();
    return response.data;
    }

    const downloaded=await fetchproducts();


    async function fetchproductsbycategory(category){
        
    const response = await axios.get(`https://fakestoreapi.com/products/category/${category}`);
    console.log(response.data);
    return response.data;
    }

    async function fetchcategories(){ 
    // every async function returns a promise
    const response = await fetch('https://fakestoreapi.com/products/categories');
    const data =await response.json();
    console.log(data);
    return data;

    }

    const categorylist=document.getElementById("categorylist");
    const productlistbox=document.getElementById("productlistbox");

    async function populatecategories(){
        const categories=await fetchcategories();
        categories.forEach(x=>{
            const categorylink=document.createElement('a');
            categorylist.appendChild(categorylink);

            categorylist.className="Categorylist"; 

            categorylink.className='category-item';
            categorylink.textContent=x;
            categorylink.href=`productlist2.html?category=${x}`
        })
        
    }

    async function populateproducts(flag,customproducts){
        let products=customproducts;
        
        const queryparamsobject=getqueryparams();

        if(flag==false){
            if(queryparamsobject['category']){
                products=await fetchproductsbycategory(queryparamsobject['category']);
            }
            else{
                products=downloaded;
            } 
        }

        products.forEach(product => {
            
            const productitem=document.createElement("a");
            productlistbox.appendChild(productitem);
 
            productitem.className="product-item";
            productitem.target="_blank"; // open in a new page
            productitem.href=`detailes.html?id=${product.id}`;


            const imagediv=document.createElement("div");
            productitem.appendChild(imagediv);
            imagediv.className="product-img";
            

            const picture = document.createElement("img");
            imagediv.appendChild(picture);
            picture.className = 'pic';
            picture.src =product.image;
            
            
           

            const name=document.createElement("div");
            productitem.appendChild(name);
            name.className='naming';

            const productname=document.createElement("div");
            name.appendChild(productname);
            productname.className='product-name';
            if(product.title.length>20){
            productname.textContent=product.title.substring(0,21)+"...";
            }
            else{
            productname.textContent=product.title    
            }
 


            const productprice=document.createElement("div");
            name.appendChild(productprice);
            productprice.className='product-price';
            productprice.innerHTML=`&#x24 ${product.price}`;

            console.log("Image URL:", product.image);
           




        });
    }

    populateproducts(false);
    populatecategories();

    const filtersearch=document.getElementById("search");
    filtersearch.addEventListener('click',async()=>{
         const minprice=Number(document.getElementById("minprice").value);
         const maxprice=Number(document.getElementById("maxprice").value);

         const productlistbox=document.getElementById("productlistbox");   
         productlistbox.innerHTML="";     
         const products=downloaded;
         filteredproducts=products.filter(product=>product.price>=minprice && product.price<=maxprice);
         populateproducts(true,filteredproducts);           
    });

    const resetfilter=document.getElementById("clear");
    resetfilter.addEventListener("click",()=>{
        window.location.reload();
    })
});

