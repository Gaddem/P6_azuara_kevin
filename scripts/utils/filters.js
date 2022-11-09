const blockfilters_under = document.getElementById("mainFiltersHide");
const blockfilters_main = document.getElementById("mainFilter");


function openFilter(){
const ouverture = window.getComputedStyle(blockfilters_under).display;
    if(ouverture=="block"){
        blockfilters_under.style.display="none"
        blockfilters_main.style.borderBottomLeftRadius="5px";
        blockfilters_main.style.borderBottomRightRadius="5px";
        
    }else{
        blockfilters_under.style.display="block";
        blockfilters_main.style.borderBottomLeftRadius="0";
        blockfilters_main.style.borderBottomRightRadius="0";

    }
}

