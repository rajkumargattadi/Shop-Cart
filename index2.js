console.log("Index is loaded");




async function fetchcategories(){ 
    
    // every async function returns a promise
    const response = await fetch('https://fakestoreapi.com/products/categories');
    const data =await response.json();
    console.log(data);
    return data;

} 

fetchcategories();

async function populatecategories() {
    const categories=await fetchcategories();
    const categorylist=document.getElementById("categorylist");

    const loaderbackdrop=document.getElementById("loaderbackdrop");
    loaderbackdrop.style.display="none";

    categories.forEach(x => { // x is the name of the category
        const categoryholder= document.createElement('div');
        const cateorylink=document.createElement("a");
        cateorylink.innerText=x; // adding category as the text of anchor tag
        cateorylink.href=`productlist2.html?category=${x}`


        
        categoryholder.className="category-item";
        categoryholder.appendChild(cateorylink);
        categorylist.appendChild(categoryholder);
        categorylist.className="category-list";
        


    });
}

populatecategories();