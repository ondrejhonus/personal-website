document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("email").innerText="ondrasihonda@gmail.com";    
});
function emailCopy() {
        navigator.clipboard.writeText("honusondrej@gmail.com");
    }
    function outFunc() {
        var tooltip = document.getElementById("myTooltip");
        tooltip.innerHTML = "Copy to clipboard";
      }