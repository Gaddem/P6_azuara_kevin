const blockfilters_under = document.getElementById("mainFiltersHide");
const blockfilters_main = document.getElementById("mainFilter");


function openFilter(){
const ouverture = window.getComputedStyle(blockfilters_under).display;
const arrowChevron = document.getElementById("chrv");
const filter1 = document.getElementById("chrv");
const filter2 = document.getElementById("chrv");

    if(ouverture=="block"){
        blockfilters_under.style.display="none"
        blockfilters_main.style.borderBottomLeftRadius="5px";
        blockfilters_main.style.borderBottomRightRadius="5px";
        arrowChevron.style.transform = "rotate(0deg)";
    }else{
        blockfilters_under.style.display="block";
        blockfilters_main.style.borderBottomLeftRadius="0";
        blockfilters_main.style.borderBottomRightRadius="0";
        arrowChevron.style.transform = "rotate(180deg)";


    }
}

