function frontPageHeading(){
    var maindiv = document.querySelector(".main");
    var headermain = document.createElement("div");
    headermain.setAttribute("class","container-fluid border border-danger")
    
    var headerdiv = document.createElement("div");
    headerdiv.setAttribute("style","height:70px");
    headerdiv.setAttribute("class","bg-dark row");
    
    var divlogo = document.createElement("div");
    divlogo.setAttribute("class","d-flex align-items-center col-md-3 border border-danger h-100");

    var divlogoname = document.createElement("h1");
    divlogoname.innerHTML = "<span class = 'text-success'>e</span><span class = 'text-light'>-shop</span>";
    divlogo.appendChild(divlogoname);
    
    var divsearch = document.createElement("div");
    divsearch.setAttribute("class","d-flex justify-content-center align-items-center col-md-6 border border-danger h-100");
    var divsearchbar = document.createElement("input");
    divsearchbar.setAttribute("type","text");
    divsearchbar.setAttribute("placeholder","Search");
    divsearchbar.setAttribute("style","height:50px");
    divsearchbar.setAttribute("class","col-md-8");
    divsearch.appendChild(divsearchbar);
    
    var divsign = document.createElement("div");
    divsign.setAttribute("class","d-flex justify-content-center align-items-center col-md-3 border border-danger h-100");
    
    var divsignup = document.createElement("span");
    divsignup.innerHTML = "Sign Up";
    divsignup.setAttribute("class","text-white");
    divsign.appendChild(divsignup);

    var divsignin = document.createElement("span");
    divsignin.innerHTML = "Sign In";
    divsignin.setAttribute("class","text-white ml-3");
    divsign.appendChild(divsignin);

    headerdiv.appendChild(divlogo);
    headerdiv.appendChild(divsearch);
    headerdiv.appendChild(divsign);
    headermain.appendChild(headerdiv);
    maindiv.appendChild(headermain);
}
