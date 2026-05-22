(function(){
  var root=document.documentElement;
  var nav=document.getElementById("nav");
  var page=document.body.dataset.page;
  var toast=document.getElementById("toast");
  function showToast(text){
    toast.textContent=text;
    toast.classList.add("show");
    clearTimeout(toast.timer);
    toast.timer=setTimeout(function(){toast.classList.remove("show")},2200);
  }
  function save(key,value){
    try{localStorage.setItem("mierla_"+key,value)}catch(e){}
  }
  function load(key,fallback){
    try{return localStorage.getItem("mierla_"+key)||fallback}catch(e){return fallback}
  }
  root.dataset.theme=load("theme","light");
  root.dataset.size=load("size","normal");
  document.querySelectorAll("[data-page-link]").forEach(function(link){
    if(link.dataset.pageLink===page){link.classList.add("active")}
  });
  document.getElementById("menuBtn").addEventListener("click",function(){
    nav.classList.toggle("open");
  });
  function openPanel(id){
    document.getElementById(id).classList.add("open");
    document.getElementById("overlay").classList.add("open");
  }
  function closePanels(){
    document.querySelectorAll(".panel").forEach(function(panel){panel.classList.remove("open")});
    document.getElementById("overlay").classList.remove("open");
  }
  document.getElementById("settingsBtn").addEventListener("click",function(){openPanel("settingsPanel")});
  document.getElementById("helpBtn").addEventListener("click",function(){openPanel("helpPanel")});
  document.getElementById("overlay").addEventListener("click",closePanels);
  document.querySelectorAll("[data-close]").forEach(function(btn){btn.addEventListener("click",closePanels)});
  document.querySelectorAll("[data-theme-btn]").forEach(function(btn){
    btn.addEventListener("click",function(){
      root.dataset.theme=btn.dataset.themeBtn;
      save("theme",btn.dataset.themeBtn);
      showToast("Tema a fost schimbată");
    });
  });
  document.querySelectorAll("[data-size-btn]").forEach(function(btn){
    btn.addEventListener("click",function(){
      root.dataset.size=btn.dataset.sizeBtn;
      save("size",btn.dataset.sizeBtn);
      showToast("Mărimea textului a fost schimbată");
    });
  });
  var orders={};
  try{orders=JSON.parse(localStorage.getItem("mierla_orders")||"{}")}catch(e){orders={}}
  function updateOrders(){
  document.querySelectorAll(".menu-grid").forEach(function(grid){

    var items=Array.from(grid.querySelectorAll(".item"));

    items.sort(function(a,b){
      var aCount=orders[a.dataset.id]||0;
      var bCount=orders[b.dataset.id]||0;
      return bCount-aCount;
    });

    items.forEach(function(item){
      grid.appendChild(item);

      var id=item.dataset.id;
      var count=orders[id]||0;

      item.querySelector(".count").textContent=count+" comenzi";

      item.classList.toggle("popular",count>0);
    });

  });
}
  document.querySelectorAll(".small-btn").forEach(function(btn){
    btn.addEventListener("click",function(){
      var item=btn.closest(".item");
      var id=item.dataset.id;
      orders[id]=(orders[id]||0)+1;
      localStorage.setItem("mierla_orders",JSON.stringify(orders));
      updateOrders();
      showToast("Produs adăugat");
    });
  });
  var reset=document.getElementById("resetOrders");
  if(reset){reset.addEventListener("click",function(){orders={};localStorage.setItem("mierla_orders","{}");updateOrders();showToast("Comenzile au fost resetate")})}
  updateOrders();
  function check(field){
    var value=(field.value||"").trim();
    var rule=field.dataset.rule;
    var ok=true;
    var msg="";
    if(!value){ok=false;msg="Câmp obligatoriu"}
    else if(rule==="name"&&!/^[A-Za-zĂÂÎȘȚăâîșț -]{3,40}$/.test(value)){ok=false;msg="Numele trebuie să aibă minim 3 litere"}
    else if(rule==="email"&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)){ok=false;msg="Email invalid"}
    else if(rule==="phone"&&!/^0[0-9]{9}$/.test(value)){ok=false;msg="Telefon invalid"}
    else if(rule==="date"&&new Date(value)<new Date(new Date().toDateString())){ok=false;msg="Alege o dată din viitor"}
    else if(rule==="guests"&&(Number(value)<1||Number(value)>20)){ok=false;msg="Alege între 1 și 20 persoane"}
    else if(rule==="message"&&value.length<10){ok=false;msg="Mesajul trebuie să aibă minim 10 caractere"}
    else if(rule==="select"&&!value){ok=false;msg="Alege o opțiune"}
    var label=field.closest("label");
    var old=label.querySelector(".error");
    if(old){old.remove()}
    label.classList.toggle("invalid",!ok);
    if(!ok){
      var e=document.createElement("span");
      e.className="error";
      e.textContent=msg;
      label.appendChild(e);
    }
    return ok;
  }
  document.querySelectorAll("form[data-form]").forEach(function(form){
    form.querySelectorAll("[data-rule]").forEach(function(field){
      field.addEventListener("input",function(){check(field)});
      field.addEventListener("change",function(){check(field)});
    });
    form.addEventListener("submit",function(event){
      event.preventDefault();
      var ok=true;
      form.querySelectorAll("[data-rule]").forEach(function(field){if(!check(field)){ok=false}});
      var result=form.querySelector(".form-result");
      if(ok){
        result.textContent=form.dataset.form==="contact"?"Mesaj trimis cu succes.":"Rezervarea a fost trimisă cu succes.";
        form.reset();
        showToast("Formular trimis");
      }else{
        result.textContent="";
        showToast("Verifică datele introduse");
      }
    });
  });
})();
