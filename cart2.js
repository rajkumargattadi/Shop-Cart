
document.addEventListener("DOMContentLoaded",()=>{

    

    function preparewrapper(product,productquantitymapping){
    
     const parent = document.getElementById('orderdeatilesproduct');

    const productWrapper = document.createElement('div');
    productWrapper.className = 'order-deatiles-product';  // Assign class here
    parent.appendChild(productWrapper);


    
        

        const orderdeatilesproductimg=document.createElement('div');
        orderdeatilesproductimg.className='order-deatiles-product-img';
        const image=document.createElement('img');
        orderdeatilesproductimg.appendChild(image);
        image.src=product.image;
        productWrapper.appendChild(orderdeatilesproductimg);


        const orderdeatilesproductdata=document.createElement('div');
        productWrapper.appendChild(orderdeatilesproductdata);
        orderdeatilesproductdata.className='order-deatiles-product-data';
        
       const some=document.createElement('div');
        orderdeatilesproductdata.appendChild(some);
        some.innerText=product.title;

        const abcd=document.createElement('div');
        orderdeatilesproductdata.appendChild(abcd);
        abcd.innerHTML=`&#x24 ${product.price}`;

        const orderdeatilesproductactions=document.createElement('div');
        productWrapper.appendChild(orderdeatilesproductactions);
        orderdeatilesproductactions.className='order-deatiles-product-actions';

        const orderdeatilesproductquantity=document.createElement('div');
        orderdeatilesproductactions.appendChild(orderdeatilesproductquantity);
        orderdeatilesproductquantity.className='order-deatiles-product-quantity';

        const Quantity=document.createElement('div');
        orderdeatilesproductquantity.appendChild(Quantity);
        Quantity.className='fw-bold';
        Quantity.innerHTML='Quantity';

        const formgroup=document.createElement('div');
        orderdeatilesproductquantity.appendChild(formgroup);

        formgroup.className='form-group';

        const form=document.createElement('select');
        formgroup.appendChild(form);
        form.className='form-select';

        for(let i=1;i<=10;i++){
            const option= document.createElement('option');

            option.textContent=i;
            option.value=i;
            if(i==productquantitymapping[product.id]){
                option.selected='true';
            }
            form.appendChild(option); 

        }
     const removeBtn = document.createElement('button');
  removeBtn.classList.add('product-remove-btn', 'btn', 'btn-danger');
  removeBtn.textContent = 'Remove';
 
  orderdeatilesproductactions.appendChild(removeBtn);

  productWrapper.appendChild(orderdeatilesproductactions);

  const hr = document.createElement('hr');
  parent.appendChild(hr); 

    }
        async function populatecart(){
    const cart=await fetcartbyid(1);
    const cartproducts=cart.products;

    const productquantitymapping={};


    // console.log(cartproducts); array of 3 products , array of productid and quantity
    const cartproductspromise=cartproducts.map(product=>{
        productquantitymapping[product.productId]=product.quantity;
        return fetchproductbyid(product.productId); 
    })

    const products=await Promise.all(cartproductspromise);
    let totalprice=0;
    products.forEach(x=>{
        totalprice+=x.price*productquantitymapping[x.id]; 
        preparewrapper(x, productquantitymapping);
    })
    const rates= document.getElementById('rate');
    rates.innerHTML=`&#x24 ${totalprice}`;

    const totals=document.getElementById('total');
    totals.innerHTML=`&#x24 ${totalprice-9}`;

    }



    populatecart();
});

