function searchBar(keywords){
  let productList = localStorage.getItem("productList");
  productList = JSON.parse(productList);

  let searchResult = productList.filter((product)=>product.title.toLowerCase().includes(keywords.toLowerCase()));
  if (keywords.length == 0){
    searchResult = productList;
  }
  else{
    document.querySelector("#cart-container").remove();
    createCart(searchResult);
  }
}
function frontPageHeading(searchValue){
    var maindiv = document.querySelector(".main");
    var headermain = document.createElement("div");
    headermain.setAttribute("class","container-fluid")
    
    var headerdiv = document.createElement("div");
    headerdiv.setAttribute("style","height:70px");
    headerdiv.setAttribute("class","bg-dark row");
    // headerdiv.setAttribute("class","navbar-collapse")
    
    var divlogo = document.createElement("div");
    divlogo.setAttribute("class","d-flex align-items-center col-md-3 h-100");

    var divlogoname = document.createElement("h1");
    divlogoname.innerHTML = "<span class = 'text-success'>e</span><span class = 'text-light'>-shop</span>";
    divlogoname.setAttribute("style","cursor:pointer");
    divlogoname.addEventListener("click",async function(){
      await cleancart();
      document.querySelector(".main").innerHTML = "";
      frontPageHeading();
      createCart(JSON.parse(localStorage.getItem("productList")));
    })
    divlogo.appendChild(divlogoname);
    
    var divsearch = document.createElement("div");
    divsearch.setAttribute("class","d-flex justify-content-center align-items-center col-md-6 h-100");
    var divsearchbar = document.createElement("input");
    divsearchbar.setAttribute("type","text");
    divsearchbar.setAttribute("placeholder","Search");
    divsearchbar.setAttribute("style","height:50px");
    divsearchbar.setAttribute("class","col-md-8");
    divsearchbar.value = searchValue ? searchValue : "";
    divsearchbar.addEventListener("keyup",function(){
      searchBar(divsearchbar.value);
    })
    divsearch.appendChild(divsearchbar);
    
    var divsign = document.createElement("div");
    divsign.setAttribute("class","d-flex justify-content-center align-items-center col-md-3 h-100");
  if (!sessionStorage.getItem("Login")){
    // alert(sessionStorage.getItem("login"));
    var divsignup = document.createElement("span");
    divsignup.innerHTML = "Sign Up";
    divsignup.setAttribute("class","text-white");
    divsignup.setAttribute("style","cursor:pointer");
    divsignup.addEventListener("click",async function(){
      await cleancart();
      generateform("Sign Up");
    })
    divsign.appendChild(divsignup);

    var divsignin = document.createElement("span");
    divsignin.innerHTML = "Sign In";
    divsignin.setAttribute("class","text-white ml-3");
    divsignin.setAttribute("style","cursor:pointer");
    divsignin.addEventListener("click",async function(){
      await cleancart();
      generateform("Sign In");
    })
    divsign.appendChild(divsignin);
  }
  else{
    var viewCart = document.createElement("span");
    viewCart.innerText = "View Cart";
    viewCart.setAttribute("class","text-white");
    viewCart.setAttribute("style","cursor:pointer");
    divsign.appendChild(viewCart);

    viewCart.addEventListener("click",function(){
      let cartContainer = document.querySelector("#cart-container");
      cartContainer.innerHTML = "";

      let cartList = JSON.parse(localStorage.getItem("Cart-list"))

      let cartDiv = document.createElement("div");
      cartDiv.setAttribute("class","row mt-5");
      
      let tableDiv = document.createElement("div");
      tableDiv.setAttribute("class","col-md-7");

      let orderDiv = document.createElement("div");
      orderDiv.setAttribute("class","col-md-4 offset-1 d-flex flex-column justify-content-center align-items-center");
      orderDiv.setAttribute("style","height:fit-content; border: 1px solid black");

      let checkout = document.createElement("h3");
      checkout.innerText = "Order Summary";

      let totalItems = document.createElement("span");
      totalItems.setAttribute("style","display:block;");
      totalItems.innerText = "Total Items: " + cartList.length;

      let totalCost = document.createElement("span");
      totalCost.innerHTML = "Total Cost: <label id = 'totalBillAmount' class = 'text-danger'>"+getBillAmount()+"</label>"

      let buttonCheckOut = document.createElement("button");
      buttonCheckOut.setAttribute("class","btn btn-warning");
      buttonCheckOut.innerText = "Checkout";
      buttonCheckOut.setAttribute("style","width:fit-content;");
      buttonCheckOut.addEventListener("click",function(){
        orderCheckOut(orderDiv);
      })

      orderDiv.appendChild(checkout);
      orderDiv.appendChild(totalItems);
      orderDiv.appendChild(totalCost);
      orderDiv.appendChild(buttonCheckOut);

      let table = document.createElement("table");
      table.setAttribute("class","table");
      let headingTable = ["Sno","title","price","Qty"];
      let tr = document.createElement("tr");
      for (var heading of headingTable){
        let th = document.createElement("th");
        th.innerText = heading;
        tr.appendChild(th);
      }
      table.appendChild(tr);
      let i = 0;
      for (let cartItem of cartList){
        let tr = document.createElement("tr");
        let td = document.createElement("td");
        td.innerText = i;
        tr.appendChild(td);
        for (let key in cartItem){
          if(key == "title"){
            let td = document.createElement("td");
            td.innerText = cartItem[key];
            tr.appendChild(td);
          }
          else if(key == "price"){
            let td = document.createElement("td");
            td.innerText = cartItem[key];
            tr.appendChild(td);
          }
          else if(key == "qty"){
            let td = document.createElement("td");
            let qtyInput = document.createElement("input");
            qtyInput.setAttribute("type","number");
            qtyInput.setAttribute("style","width:50px");
            qtyInput.setAttribute("value",cartItem[key]);
            qtyInput.addEventListener("change",function(){
              let index = cartList.findIndex((obj)=>obj.id == cartItem.id);
              let product = cartList[index];
              cartList.splice(index,1);
              product.qty = qtyInput.value;
              cartList.splice(index,0,product);
              localStorage.setItem("Cart-list",JSON.stringify(cartList));
              // console.log(getBillAmount());
              document.querySelector("#totalBillAmount").innerHTML = getBillAmount();
            });
            td.appendChild(qtyInput);
            tr.appendChild(td);
          }
        }

        i++;
        table.appendChild(tr);
      }
      tableDiv.appendChild(table);
      cartDiv.appendChild(tableDiv);
      cartDiv.appendChild(orderDiv);
      cartContainer.appendChild(cartDiv);
    });
    
    var SignOut = document.createElement("span");
    SignOut.innerText = "Sign Out";
    SignOut.setAttribute("class","text-white ml-3");
    SignOut.setAttribute("style","cursor:pointer");
    divsign.appendChild(SignOut);

    SignOut.addEventListener("click",function(){
      sessionStorage.removeItem("Login");
      document.querySelector(".main").innerHTML = "";
      frontPageHeading();
      createCart(JSON.parse(localStorage.getItem("productList")));
    });
  }

    headerdiv.appendChild(divlogo);
    headerdiv.appendChild(divsearch);
    headerdiv.appendChild(divsign);
    headermain.appendChild(headerdiv);
    maindiv.appendChild(headermain);
}
function orderCheckOut(orderDiv){
  let formElementDiv = document.createElement("div");
  formElementDiv.setAttribute("class","col-md-12");

  let inputDiv = document.createElement("div");
  inputDiv.setAttribute("class","form-group");

  let personNameInfo = document.createElement("input");
  personNameInfo.setAttribute("class","form-control mt-3");
  personNameInfo.setAttribute("placeholder","Enter your Name");
  personNameInfo.addEventListener("keyup",function(){
    let valueName = personNameInfo.value;
    if(valueName.length != 0){
      smallpersonName.classList.add("d-none");
    }
  })

  inputDiv.appendChild(personNameInfo);
  let smallpersonName = document.createElement("small");
  smallpersonName.innerText = "Enter your name";
  smallpersonName.setAttribute("class","text-danger d-none");
  inputDiv.appendChild(smallpersonName);
  
  let personContactInfo = document.createElement("input");
  personContactInfo.setAttribute("class","form-control mt-3");
  personContactInfo.setAttribute("placeholder","Enter your Mobile no.");
  personContactInfo.addEventListener("keyup",function(){
    let valuecontact = personContactInfo.value;
    if(valuecontact.length == 10 && isNaN(valuecontact) == false){
      smallpersonContact.classList.add("d-none");
    }
  })

  inputDiv.appendChild(personContactInfo);
  let smallpersonContact = document.createElement("small");
  smallpersonContact.innerText = "Please enter valid mobile number";
  smallpersonContact.setAttribute("class","text-danger d-none");
  inputDiv.appendChild(smallpersonContact);
  
  let personAddressInfo = document.createElement("input");
  personAddressInfo.setAttribute("class","form-control mt-3");
  personAddressInfo.setAttribute("placeholder","Enter your Address");
  personAddressInfo.addEventListener("keyup",function(){
    let valueAddress = personAddressInfo.value;
    if(valueAddress.length != 0){
      smallpersonAdress.classList.add("d-none");
    }
  })

  inputDiv.appendChild(personAddressInfo);
  let smallpersonAdress = document.createElement("small");
  smallpersonAdress.innerText = "Enter your address";
  smallpersonAdress.setAttribute("class","text-danger d-none");
  inputDiv.appendChild(smallpersonAdress);

  let orderButton = document.createElement("button");
  orderButton.innerText = "Place Order";
  orderButton.setAttribute("class","btn btn-outline-secondary mt-3 w-100");
  orderButton.addEventListener("click",function(){
    let personName = personNameInfo.value;
    let personContact = personContactInfo.value;
    let personAddress = personAddressInfo.value;
    if(personName.length == 0 || personAddress.length == 0 || personContact.length != 10 || isNaN(personContact)){
      if(personName.length == 0){
        smallpersonName.classList.remove("d-none");
      }
      if(personAddress.length == 0){
        smallpersonAdress.classList.remove("d-none");
      }
      if(personContact.length != 10 || isNaN(personContact)){
        smallpersonContact.classList.remove("d-none");
      }
    }
    else{
      let mainlast = document.querySelector(".main");
      mainlast.innerHTML = "";
      let completeOrderDiv = document.createElement("div");
      completeOrderDiv.setAttribute("style","height:100vh;");
      completeOrderDiv.setAttribute("class","d-flex flex-column justify-content-center align-items-center");

      let headingOne = document.createElement("h1");
      headingOne.innerText = "Thanks for shopping with us";
      completeOrderDiv.appendChild(headingOne);

      let continueShop = document.createElement("button");
      continueShop.setAttribute("class","btn btn-outline-warning");
      continueShop.innerText = "Continue Shopping";
      continueShop.addEventListener("click",function(){
        document.querySelector(".main").innerHTML = "";
        frontPageHeading();
        createCart(JSON.parse(localStorage.getItem("productList")));
      })
      completeOrderDiv.appendChild(continueShop);

      mainlast.appendChild(completeOrderDiv);
    }
  })
  inputDiv.appendChild(orderButton);

  formElementDiv.appendChild(inputDiv);
  orderDiv.appendChild(formElementDiv);
}
function getBillAmount(){
  let cartList = JSON.parse(localStorage.getItem("Cart-list"));
  let totalBillAmountQty = 0;
  for (let item of cartList){
    totalBillAmountQty = totalBillAmountQty + (item.qty * item.price);
  }
  return totalBillAmountQty;
}
function generateform(buttonText){
  var cartContainer = document.getElementById("cart-container");
  cartContainer.innerHTML = "";
  var rowDiv = document.createElement("div");
  rowDiv.setAttribute("class","row d-flex justify-content-center align-items-center");
  var colDiv = document.createElement("div");
  colDiv.setAttribute("class","col-md-6 border border-success");
  colDiv.setAttribute("style","heigth:200px; margin-top:100px")

  var emailblock = document.createElement("input");
  emailblock.setAttribute("type","email");
  emailblock.setAttribute("class","form-control mt-3");
  emailblock.setAttribute("placeholder","Enter your email-id");
  emailblock.setAttribute("id","email");
  colDiv.appendChild(emailblock);


  var passwordblock = document.createElement("input");
  passwordblock.setAttribute("type","password");
  passwordblock.setAttribute("class","form-control mt-3");
  passwordblock.setAttribute("placeholder","Enter your password");
  passwordblock.setAttribute("id","password");
  colDiv.appendChild(passwordblock);

  var buttonblock = document.createElement("button");
  // buttonblock.setAttribute("type","submit");
  buttonblock.innerText = buttonText;
  buttonblock.setAttribute("class","form-control mt-3 mb-3 btn btn-success w-50");
  buttonblock.addEventListener("click",async function(){
    var emailValue = document.querySelector("#email").value;
    var passwordValue = document.querySelector("#password").value;
    if(buttonText == "Sign Up"){
      await cleancart();
      saveUser(emailValue,passwordValue);
      document.querySelector(".main").innerHTML = "";
      frontPageHeading();
      createCart(JSON.parse(localStorage.getItem("productList")));
    }
    else if(buttonText == "Sign In"){
      var status = signin(emailValue,passwordValue);
      if(status){
        await cleancart();
        document.querySelector(".main").innerHTML = "";
        frontPageHeading();
        createCart(JSON.parse(localStorage.getItem("productList")));
        alert("Sign In successful......");
      }
      else {
        alert("valid email id and password");
      }
    }
  })
  colDiv.appendChild(buttonblock);
  rowDiv.appendChild(colDiv);
  cartContainer.appendChild(rowDiv);
}
function signin(email,password){
  var userList = localStorage.getItem("User-list");
  userList = JSON.parse(userList);
  let user = userList.find((user)=>{return (user.email == email && user.password == password)});
  if(user){
    sessionStorage.setItem("Login",true);
    return true;
  }
  return false;
}
function saveUser(email,password){
  var userList = localStorage.getItem("User-list"); // []
  userList = JSON.parse(userList);
  let user = userList.find((user)=>{return user.email == email});
  if(user)
   window.alert("Email id already exist");
  else{
     let user = {email,password};
     userList.push(user);
     localStorage.setItem("User-list",JSON.stringify(userList));
     window.alert("Sign up success...");
  }
}
async function cleancart(){

  document.querySelector("#cart-container").innerHTML = "";
}
function createCart(data){
    var mainDiv = document.querySelector(".main");
    var divContainer = document.createElement("div");
    divContainer.setAttribute("class","container");
    divContainer.setAttribute("id","cart-container");
    var rowDiv = document.createElement("div");
    rowDiv.setAttribute("class","row");
  
    for(let product of data){
      var cartContainer = document.createElement("div");
      cartContainer.setAttribute("class","col-md-4 p-3 mt-3");
      cartContainer.setAttribute("style","height:400px;");
      var cart = document.createElement("div");
      cart.setAttribute("class","d-flex flex-column align-items-center border");
      cart.setAttribute("style","height:400px;");
      
      var imageblock = document.createElement("img");
      imageblock.src = product.thumbnail;
      imageblock.setAttribute("style","height:250px; width:100%;");
      cart.appendChild(imageblock);

      var titlediv = document.createElement("h6");
      titlediv.innerText = product.title;
      titlediv.setAttribute("class","mt-2")
      cart.appendChild(titlediv);

      var pricediv = document.createElement("h5");
      pricediv.innerText = "$ " + product.price;
      cart.appendChild(pricediv);

      var viewMoreDetails = document.createElement("a");
      viewMoreDetails.setAttribute("style","display:block;");
      viewMoreDetails.innerText = "view more";
      viewMoreDetails.setAttribute("href","#");
      viewMoreDetails.addEventListener("click",function(){
        viewMoreDetailsNext(product);
      });
      cart.appendChild(viewMoreDetails);
      var buttonblock = document.createElement("button");
      buttonblock.setAttribute("class","btn btn-primary");
      buttonblock.innerText = "Add to cart";
      buttonblock.addEventListener("click",function(){
        saveItemsInCart(product);
      })
      cart.appendChild(buttonblock);
      cartContainer.appendChild(cart);
      rowDiv.appendChild(cartContainer); 
    }
    divContainer.appendChild(rowDiv);
  
    mainDiv.appendChild(divContainer);
}
function viewMoreDetailsNext(product){
    var cartContainer = document.querySelector("#cart-container");
    cartContainer.innerHTML = "";

    var rowDiv = document.createElement("div");
    rowDiv.setAttribute("class","row mt-5");

    var colDiv = document.createElement("div");
    colDiv.setAttribute("class","col-md-6");
    let imageblock = document.createElement("img");
    imageblock.src = product.thumbnail;
    imageblock.setAttribute("style","height:400px;width:100%");
    var imageArray = document.createElement("div");
    imageArray.setAttribute("class","d-flex justify-content-around")
    colDiv.appendChild(imageblock);

    for(let i=0;i<4;i++){
      let imageElement = document.createElement("img");
      imageElement.src = product.images[i];
      // imageElement.setAttribute("class","mt-1 mr-2")
      imageElement.setAttribute("style","height:100px;width:18%");
      imageElement.addEventListener("click",function(){
        let temp = imageElement.src;
        imageElement.src = imageblock.src;
        imageblock.src = temp;
      })
      imageArray.appendChild(imageElement);
    }
    colDiv.appendChild(imageArray);
    rowDiv.appendChild(colDiv);

    let discriptionBlock = document.createElement("div");
    discriptionBlock.setAttribute("class","col-md-4 offset-1");
    
    let titleBlock = document.createElement("h1");
    titleBlock.innerText = product.title;

    let productDescription = document.createElement("p");
    productDescription.innerText = product.description;

    let priceBlock = document.createElement("p");
    priceBlock.innerHTML = "<span class = 'text-warning'>"+"$ "+product.price+"</span>";

    let addToCart = document.createElement("span");
    addToCart.innerHTML = "<span class = 'btn btn-warning'>Add to Cart</span>";
    addToCart.addEventListener("click",function(){
      saveItemsInCart(product);
    });

    discriptionBlock.appendChild(titleBlock);
    discriptionBlock.appendChild(productDescription);
    discriptionBlock.appendChild(priceBlock);
    discriptionBlock.appendChild(addToCart);

    rowDiv.appendChild(discriptionBlock);
    cartContainer.appendChild(rowDiv);
}
function saveItemsInCart(product){
    if(isloggedin()){
      let cartList = localStorage.getItem("Cart-list");
      cartList = JSON.parse(cartList);
      let itemStatus = cartList.find((user)=>{return user.id == product.id});
      if(itemStatus){
        alert("already present in the cart");
      }
      else{
        product.qty = 1;
        cartList.push(product);
        localStorage.setItem("Cart-list",JSON.stringify(cartList));
      }
    }
    else{
      document.querySelector("#cart-container").innerHTML = "";
      generateform("Sign In");
    }
}
function setData(data){
     data = JSON.stringify(data);
     localStorage.setItem("productList",data);
}  
function getData(){
      return  [
        {
            "id": 1,
            "title": "iPhone 9",
            "description": "An apple mobile which is nothing like apple",
            "price": 549,
            "discountPercentage": 12.96,
            "rating": 4.69,
            "stock": 94,
            "brand": "Apple",
            "category": "smartphones",
            "thumbnail": "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg",
            "images": [
                "https://cdn.dummyjson.com/product-images/1/1.jpg",
                "https://cdn.dummyjson.com/product-images/1/2.jpg",
                "https://cdn.dummyjson.com/product-images/1/3.jpg",
                "https://cdn.dummyjson.com/product-images/1/4.jpg",
                "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg"
            ]
        },
        {
            "id": 2,
            "title": "iPhone X",
            "description": "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
            "price": 899,
            "discountPercentage": 17.94,
            "rating": 4.44,
            "stock": 34,
            "brand": "Apple",
            "category": "smartphones",
            "thumbnail": "https://cdn.dummyjson.com/product-images/2/thumbnail.jpg",
            "images": [
                "https://cdn.dummyjson.com/product-images/2/1.jpg",
                "https://cdn.dummyjson.com/product-images/2/2.jpg",
                "https://cdn.dummyjson.com/product-images/2/3.jpg",
                "https://cdn.dummyjson.com/product-images/2/thumbnail.jpg"
            ]
        },
        {
            "id": 3,
            "title": "Samsung Universe 9",
            "description": "Samsung's new variant which goes beyond Galaxy to the Universe",
            "price": 1249,
            "discountPercentage": 15.46,
            "rating": 4.09,
            "stock": 36,
            "brand": "Samsung",
            "category": "smartphones",
            "thumbnail": "https://cdn.dummyjson.com/product-images/3/thumbnail.jpg",
            "images": [
                "https://cdn.dummyjson.com/product-images/3/1.jpg"
            ]
        },
        {
            "id": 4,
            "title": "OPPOF19",
            "description": "OPPO F19 is officially announced on April 2021.",
            "price": 280,
            "discountPercentage": 17.91,
            "rating": 4.3,
            "stock": 123,
            "brand": "OPPO",
            "category": "smartphones",
            "thumbnail": "https://cdn.dummyjson.com/product-images/4/thumbnail.jpg",
            "images": [
                "https://cdn.dummyjson.com/product-images/4/1.jpg",
                "https://cdn.dummyjson.com/product-images/4/2.jpg",
                "https://cdn.dummyjson.com/product-images/4/3.jpg",
                "https://cdn.dummyjson.com/product-images/4/4.jpg",
                "https://cdn.dummyjson.com/product-images/4/thumbnail.jpg"
            ]
        },
        {
            "id": 5,
            "title": "Huawei P30",
            "description": "Huawei’s re-badged P30 Pro New Edition was officially unveiled yesterday in Germany and now the device has made its way to the UK.",
            "price": 499,
            "discountPercentage": 10.58,
            "rating": 4.09,
            "stock": 32,
            "brand": "Huawei",
            "category": "smartphones",
            "thumbnail": "https://cdn.dummyjson.com/product-images/5/thumbnail.jpg",
            "images": [
                "https://cdn.dummyjson.com/product-images/5/1.jpg",
                "https://cdn.dummyjson.com/product-images/5/2.jpg",
                "https://cdn.dummyjson.com/product-images/5/3.jpg"
            ]
        },
        {
            "id": 6,
            "title": "MacBook Pro",
            "description": "MacBook Pro 2021 with mini-LED display may launch between September, November",
            "price": 1749,
            "discountPercentage": 11.02,
            "rating": 4.57,
            "stock": 83,
            "brand": "Apple",
            "category": "laptops",
            "thumbnail": "https://cdn.dummyjson.com/product-images/6/thumbnail.png",
            "images": [
                "https://cdn.dummyjson.com/product-images/6/1.png",
                "https://cdn.dummyjson.com/product-images/6/2.jpg",
                "https://cdn.dummyjson.com/product-images/6/3.png",
                "https://cdn.dummyjson.com/product-images/6/4.jpg"
            ]
        },
        {
            "id": 7,
            "title": "Samsung Galaxy Book",
            "description": "Samsung Galaxy Book S (2020) Laptop With Intel Lakefield Chip, 8GB of RAM Launched",
            "price": 1499,
            "discountPercentage": 4.15,
            "rating": 4.25,
            "stock": 50,
            "brand": "Samsung",
            "category": "laptops",
            "thumbnail": "https://cdn.dummyjson.com/product-images/7/thumbnail.jpg",
            "images": [
                "https://cdn.dummyjson.com/product-images/7/1.jpg",
                "https://cdn.dummyjson.com/product-images/7/2.jpg",
                "https://cdn.dummyjson.com/product-images/7/3.jpg",
                "https://cdn.dummyjson.com/product-images/7/thumbnail.jpg"
            ]
        },
        {
            "id": 8,
            "title": "Microsoft Surface Laptop 4",
            "description": "Style and speed. Stand out on HD video calls backed by Studio Mics. Capture ideas on the vibrant touchscreen.",
            "price": 1499,
            "discountPercentage": 10.23,
            "rating": 4.43,
            "stock": 68,
            "brand": "Microsoft Surface",
            "category": "laptops",
            "thumbnail": "https://cdn.dummyjson.com/product-images/8/thumbnail.jpg",
            "images": [
                "https://cdn.dummyjson.com/product-images/8/1.jpg",
                "https://cdn.dummyjson.com/product-images/8/2.jpg",
                "https://cdn.dummyjson.com/product-images/8/3.jpg",
                "https://cdn.dummyjson.com/product-images/8/4.jpg",
                "https://cdn.dummyjson.com/product-images/8/thumbnail.jpg"
            ]
        },
        {
            "id": 9,
            "title": "Infinix INBOOK",
            "description": "Infinix Inbook X1 Ci3 10th 8GB 256GB 14 Win10 Grey – 1 Year Warranty",
            "price": 1099,
            "discountPercentage": 11.83,
            "rating": 4.54,
            "stock": 96,
            "brand": "Infinix",
            "category": "laptops",
            "thumbnail": "https://cdn.dummyjson.com/product-images/9/thumbnail.jpg",
            "images": [
                "https://cdn.dummyjson.com/product-images/9/1.jpg",
                "https://cdn.dummyjson.com/product-images/9/2.png",
                "https://cdn.dummyjson.com/product-images/9/3.png",
                "https://cdn.dummyjson.com/product-images/9/4.jpg",
                "https://cdn.dummyjson.com/product-images/9/thumbnail.jpg"
            ]
        },
        {
            "id": 10,
            "title": "HP Pavilion 15-DK1056WM",
            "description": "HP Pavilion 15-DK1056WM Gaming Laptop 10th Gen Core i5, 8GB, 256GB SSD, GTX 1650 4GB, Windows 10",
            "price": 1099,
            "discountPercentage": 6.18,
            "rating": 4.43,
            "stock": 89,
            "brand": "HP Pavilion",
            "category": "laptops",
            "thumbnail": "https://cdn.dummyjson.com/product-images/10/thumbnail.jpeg",
            "images": [
                "https://cdn.dummyjson.com/product-images/10/1.jpg",
                "https://cdn.dummyjson.com/product-images/10/2.jpg",
                "https://cdn.dummyjson.com/product-images/10/3.jpg",
                "https://cdn.dummyjson.com/product-images/10/thumbnail.jpeg"
            ]
        },
        {
            "id": 11,
            "title": "perfume Oil",
            "description": "Mega Discount, Impression of Acqua Di Gio by GiorgioArmani concentrated attar perfume Oil",
            "price": 13,
            "discountPercentage": 8.4,
            "rating": 4.26,
            "stock": 65,
            "brand": "Impression of Acqua Di Gio",
            "category": "fragrances",
            "thumbnail": "https://cdn.dummyjson.com/product-images/11/thumbnail.jpg",
            "images": [
                "https://cdn.dummyjson.com/product-images/11/1.jpg",
                "https://cdn.dummyjson.com/product-images/11/2.jpg",
                "https://cdn.dummyjson.com/product-images/11/3.jpg",
                "https://cdn.dummyjson.com/product-images/11/thumbnail.jpg"
            ]
        },
        {
            "id": 12,
            "title": "Brown Perfume",
            "description": "Royal_Mirage Sport Brown Perfume for Men & Women - 120ml",
            "price": 40,
            "discountPercentage": 15.66,
            "rating": 4,
            "stock": 52,
            "brand": "Royal_Mirage",
            "category": "fragrances",
            "thumbnail": "https://cdn.dummyjson.com/product-images/12/thumbnail.jpg",
            "images": [
                "https://cdn.dummyjson.com/product-images/12/1.jpg",
                "https://cdn.dummyjson.com/product-images/12/2.jpg",
                "https://cdn.dummyjson.com/product-images/12/3.png",
                "https://cdn.dummyjson.com/product-images/12/4.jpg",
                "https://cdn.dummyjson.com/product-images/12/thumbnail.jpg"
            ]
        },
        {
            "id": 13,
            "title": "Fog Scent Xpressio Perfume",
            "description": "Product details of Best Fog Scent Xpressio Perfume 100ml For Men cool long lasting perfumes for Men",
            "price": 13,
            "discountPercentage": 8.14,
            "rating": 4.59,
            "stock": 61,
            "brand": "Fog Scent Xpressio",
            "category": "fragrances",
            "thumbnail": "https://cdn.dummyjson.com/product-images/13/thumbnail.webp",
            "images": [
                "https://cdn.dummyjson.com/product-images/13/1.jpg",
                "https://cdn.dummyjson.com/product-images/13/2.png",
                "https://cdn.dummyjson.com/product-images/13/3.jpg",
                "https://cdn.dummyjson.com/product-images/13/4.jpg",
                "https://cdn.dummyjson.com/product-images/13/thumbnail.webp"
            ]
        },
        {
            "id": 14,
            "title": "Non-Alcoholic Concentrated Perfume Oil",
            "description": "Original Al Munakh® by Mahal Al Musk | Our Impression of Climate | 6ml Non-Alcoholic Concentrated Perfume Oil",
            "price": 120,
            "discountPercentage": 15.6,
            "rating": 4.21,
            "stock": 114,
            "brand": "Al Munakh",
            "category": "fragrances",
            "thumbnail": "https://cdn.dummyjson.com/product-images/14/thumbnail.jpg",
            "images": [
                "https://cdn.dummyjson.com/product-images/14/1.jpg",
                "https://cdn.dummyjson.com/product-images/14/2.jpg",
                "https://cdn.dummyjson.com/product-images/14/3.jpg",
                "https://cdn.dummyjson.com/product-images/14/thumbnail.jpg"
            ]
        },
        {
            "id": 15,
            "title": "Eau De Perfume Spray",
            "description": "Genuine  Al-Rehab spray perfume from UAE/Saudi Arabia/Yemen High Quality",
            "price": 30,
            "discountPercentage": 10.99,
            "rating": 4.7,
            "stock": 105,
            "brand": "Lord - Al-Rehab",
            "category": "fragrances",
            "thumbnail": "https://cdn.dummyjson.com/product-images/15/thumbnail.jpg",
            "images": [
                "https://cdn.dummyjson.com/product-images/15/1.jpg",
                "https://cdn.dummyjson.com/product-images/15/2.jpg",
                "https://cdn.dummyjson.com/product-images/15/3.jpg",
                "https://cdn.dummyjson.com/product-images/15/4.jpg",
                "https://cdn.dummyjson.com/product-images/15/thumbnail.jpg"
            ]
        },
        {
            "id": 16,
            "title": "Hyaluronic Acid Serum",
            "description": "L'OrÃ©al Paris introduces Hyaluron Expert Replumping Serum formulated with 1.5% Hyaluronic Acid",
            "price": 19,
            "discountPercentage": 13.31,
            "rating": 4.83,
            "stock": 110,
            "brand": "L'Oreal Paris",
            "category": "skincare",
            "thumbnail": "https://cdn.dummyjson.com/product-images/16/thumbnail.jpg",
            "images": [
                "https://cdn.dummyjson.com/product-images/16/1.png",
                "https://cdn.dummyjson.com/product-images/16/2.webp",
                "https://cdn.dummyjson.com/product-images/16/3.jpg",
                "https://cdn.dummyjson.com/product-images/16/4.jpg",
                "https://cdn.dummyjson.com/product-images/16/thumbnail.jpg"
            ]
        },
        {
            "id": 17,
            "title": "Tree Oil 30ml",
            "description": "Tea tree oil contains a number of compounds, including terpinen-4-ol, that have been shown to kill certain bacteria,",
            "price": 12,
            "discountPercentage": 4.09,
            "rating": 4.52,
            "stock": 78,
            "brand": "Hemani Tea",
            "category": "skincare",
            "thumbnail": "https://cdn.dummyjson.com/product-images/17/thumbnail.jpg",
            "images": [
                "https://cdn.dummyjson.com/product-images/17/1.jpg",
                "https://cdn.dummyjson.com/product-images/17/2.jpg",
                "https://cdn.dummyjson.com/product-images/17/3.jpg",
                "https://cdn.dummyjson.com/product-images/17/thumbnail.jpg"
            ]
        },
        {
            "id": 18,
            "title": "Oil Free Moisturizer 100ml",
            "description": "Dermive Oil Free Moisturizer with SPF 20 is specifically formulated with ceramides, hyaluronic acid & sunscreen.",
            "price": 40,
            "discountPercentage": 13.1,
            "rating": 4.56,
            "stock": 88,
            "brand": "Dermive",
            "category": "skincare",
            "thumbnail": "https://cdn.dummyjson.com/product-images/18/thumbnail.jpg",
            "images": [
                "https://cdn.dummyjson.com/product-images/18/1.jpg",
                "https://cdn.dummyjson.com/product-images/18/2.jpg",
                "https://cdn.dummyjson.com/product-images/18/3.jpg",
                "https://cdn.dummyjson.com/product-images/18/4.jpg",
                "https://cdn.dummyjson.com/product-images/18/thumbnail.jpg"
            ]
        },
        {
            "id": 19,
            "title": "Skin Beauty Serum.",
            "description": "Product name: rorec collagen hyaluronic acid white face serum riceNet weight: 15 m",
            "price": 46,
            "discountPercentage": 10.68,
            "rating": 4.42,
            "stock": 54,
            "brand": "ROREC White Rice",
            "category": "skincare",
            "thumbnail": "https://cdn.dummyjson.com/product-images/19/thumbnail.jpg",
            "images": [
                "https://cdn.dummyjson.com/product-images/19/1.jpg",
                "https://cdn.dummyjson.com/product-images/19/2.jpg",
                "https://cdn.dummyjson.com/product-images/19/3.png",
                "https://cdn.dummyjson.com/product-images/19/thumbnail.jpg"
            ]
        },
        {
            "id": 20,
            "title": "Freckle Treatment Cream- 15gm",
            "description": "Fair & Clear is Pakistan's only pure Freckle cream which helpsfade Freckles, Darkspots and pigments. Mercury level is 0%, so there are no side effects.",
            "price": 70,
            "discountPercentage": 16.99,
            "rating": 4.06,
            "stock": 140,
            "brand": "Fair & Clear",
            "category": "skincare",
            "thumbnail": "https://cdn.dummyjson.com/product-images/20/thumbnail.jpg",
            "images": [
                "https://cdn.dummyjson.com/product-images/20/1.jpg",
                "https://cdn.dummyjson.com/product-images/20/2.jpg",
                "https://cdn.dummyjson.com/product-images/20/3.jpg",
                "https://cdn.dummyjson.com/product-images/20/4.jpg",
                "https://cdn.dummyjson.com/product-images/20/thumbnail.jpg"
            ]
        },
        {
            "id": 21,
            "title": "- Daal Masoor 500 grams",
            "description": "Fine quality Branded Product Keep in a cool and dry place",
            "price": 20,
            "discountPercentage": 4.81,
            "rating": 4.44,
            "stock": 133,
            "brand": "Saaf & Khaas",
            "category": "groceries",
            "thumbnail": "https://cdn.dummyjson.com/product-images/21/thumbnail.png",
            "images": [
                "https://cdn.dummyjson.com/product-images/21/1.png",
                "https://cdn.dummyjson.com/product-images/21/2.jpg",
                "https://cdn.dummyjson.com/product-images/21/3.jpg"
            ]
        },
        {
            "id": 22,
            "title": "Elbow Macaroni - 400 gm",
            "description": "Product details of Bake Parlor Big Elbow Macaroni - 400 gm",
            "price": 14,
            "discountPercentage": 15.58,
            "rating": 4.57,
            "stock": 146,
            "brand": "Bake Parlor Big",
            "category": "groceries",
            "thumbnail": "https://cdn.dummyjson.com/product-images/22/thumbnail.jpg",
            "images": [
                "https://cdn.dummyjson.com/product-images/22/1.jpg",
                "https://cdn.dummyjson.com/product-images/22/2.jpg",
                "https://cdn.dummyjson.com/product-images/22/3.jpg"
            ]
        },
        {
            "id": 23,
            "title": "Orange Essence Food Flavou",
            "description": "Specifications of Orange Essence Food Flavour For Cakes and Baking Food Item",
            "price": 14,
            "discountPercentage": 8.04,
            "rating": 4.85,
            "stock": 26,
            "brand": "Baking Food Items",
            "category": "groceries",
            "thumbnail": "https://cdn.dummyjson.com/product-images/23/thumbnail.jpg",
            "images": [
                "https://cdn.dummyjson.com/product-images/23/1.jpg",
                "https://cdn.dummyjson.com/product-images/23/2.jpg",
                "https://cdn.dummyjson.com/product-images/23/3.jpg",
                "https://cdn.dummyjson.com/product-images/23/4.jpg",
                "https://cdn.dummyjson.com/product-images/23/thumbnail.jpg"
            ]
        },
        {
            "id": 24,
            "title": "cereals muesli fruit nuts",
            "description": "original fauji cereal muesli 250gm box pack original fauji cereals muesli fruit nuts flakes breakfast cereal break fast faujicereals cerels cerel foji fouji",
            "price": 46,
            "discountPercentage": 16.8,
            "rating": 4.94,
            "stock": 113,
            "brand": "fauji",
            "category": "groceries",
            "thumbnail": "https://cdn.dummyjson.com/product-images/24/thumbnail.jpg",
            "images": [
                "https://cdn.dummyjson.com/product-images/24/1.jpg",
                "https://cdn.dummyjson.com/product-images/24/2.jpg",
                "https://cdn.dummyjson.com/product-images/24/3.jpg",
                "https://cdn.dummyjson.com/product-images/24/4.jpg",
                "https://cdn.dummyjson.com/product-images/24/thumbnail.jpg"
            ]
        },
        {
            "id": 25,
            "title": "Gulab Powder 50 Gram",
            "description": "Dry Rose Flower Powder Gulab Powder 50 Gram • Treats Wounds",
            "price": 70,
            "discountPercentage": 13.58,
            "rating": 4.87,
            "stock": 47,
            "brand": "Dry Rose",
            "category": "groceries",
            "thumbnail": "https://cdn.dummyjson.com/product-images/25/thumbnail.jpg",
            "images": [
                "https://cdn.dummyjson.com/product-images/25/1.png",
                "https://cdn.dummyjson.com/product-images/25/2.jpg",
                "https://cdn.dummyjson.com/product-images/25/3.png",
                "https://cdn.dummyjson.com/product-images/25/4.jpg",
                "https://cdn.dummyjson.com/product-images/25/thumbnail.jpg"
            ]
        },
        {
            "id": 26,
            "title": "Plant Hanger For Home",
            "description": "Boho Decor Plant Hanger For Home Wall Decoration Macrame Wall Hanging Shelf",
            "price": 41,
            "discountPercentage": 17.86,
            "rating": 4.08,
            "stock": 131,
            "brand": "Boho Decor",
            "category": "home-decoration",
            "thumbnail": "https://cdn.dummyjson.com/product-images/26/thumbnail.jpg",
            "images": [
                "https://cdn.dummyjson.com/product-images/26/1.jpg",
                "https://cdn.dummyjson.com/product-images/26/2.jpg",
                "https://cdn.dummyjson.com/product-images/26/3.jpg",
                "https://cdn.dummyjson.com/product-images/26/4.jpg",
                "https://cdn.dummyjson.com/product-images/26/5.jpg",
                "https://cdn.dummyjson.com/product-images/26/thumbnail.jpg"
            ]
        },
        {
            "id": 27,
            "title": "Flying Wooden Bird",
            "description": "Package Include 6 Birds with Adhesive Tape Shape: 3D Shaped Wooden Birds Material: Wooden MDF, Laminated 3.5mm",
            "price": 51,
            "discountPercentage": 15.58,
            "rating": 4.41,
            "stock": 17,
            "brand": "Flying Wooden",
            "category": "home-decoration",
            "thumbnail": "https://cdn.dummyjson.com/product-images/27/thumbnail.webp",
            "images": [
                "https://cdn.dummyjson.com/product-images/27/1.jpg",
                "https://cdn.dummyjson.com/product-images/27/2.jpg",
                "https://cdn.dummyjson.com/product-images/27/3.jpg",
                "https://cdn.dummyjson.com/product-images/27/4.jpg",
                "https://cdn.dummyjson.com/product-images/27/thumbnail.webp"
            ]
        },
        {
            "id": 28,
            "title": "3D Embellishment Art Lamp",
            "description": "3D led lamp sticker Wall sticker 3d wall art light on/off button  cell operated (included)",
            "price": 20,
            "discountPercentage": 16.49,
            "rating": 4.82,
            "stock": 54,
            "brand": "LED Lights",
            "category": "home-decoration",
            "thumbnail": "https://cdn.dummyjson.com/product-images/28/thumbnail.jpg",
            "images": [
                "https://cdn.dummyjson.com/product-images/28/1.jpg",
                "https://cdn.dummyjson.com/product-images/28/2.jpg",
                "https://cdn.dummyjson.com/product-images/28/3.png",
                "https://cdn.dummyjson.com/product-images/28/4.jpg",
                "https://cdn.dummyjson.com/product-images/28/thumbnail.jpg"
            ]
        },
        {
            "id": 29,
            "title": "Handcraft Chinese style",
            "description": "Handcraft Chinese style art luxury palace hotel villa mansion home decor ceramic vase with brass fruit plate",
            "price": 60,
            "discountPercentage": 15.34,
            "rating": 4.44,
            "stock": 7,
            "brand": "luxury palace",
            "category": "home-decoration",
            "thumbnail": "https://cdn.dummyjson.com/product-images/29/thumbnail.webp",
            "images": [
                "https://cdn.dummyjson.com/product-images/29/1.jpg",
                "https://cdn.dummyjson.com/product-images/29/2.jpg",
                "https://cdn.dummyjson.com/product-images/29/3.webp",
                "https://cdn.dummyjson.com/product-images/29/4.webp",
                "https://cdn.dummyjson.com/product-images/29/thumbnail.webp"
            ]
        },
        {
            "id": 30,
            "title": "Key Holder",
            "description": "Attractive DesignMetallic materialFour key hooksReliable & DurablePremium Quality",
            "price": 30,
            "discountPercentage": 2.92,
            "rating": 4.92,
            "stock": 54,
            "brand": "Golden",
            "category": "home-decoration",
            "thumbnail": "https://cdn.dummyjson.com/product-images/30/thumbnail.jpg",
            "images": [
                "https://cdn.dummyjson.com/product-images/30/1.jpg",
                "https://cdn.dummyjson.com/product-images/30/2.jpg",
                "https://cdn.dummyjson.com/product-images/30/3.jpg",
                "https://cdn.dummyjson.com/product-images/30/thumbnail.jpg"
            ]
        }
    ];
}
function isloggedin(){
    return !!sessionStorage.getItem("Login");
}