function emailCopy() {
  navigator.clipboard.writeText("honusondrej@gmail.com");
}
function outFunc() {
  var tooltip = document.getElementById("myTooltip");
  tooltip.innerHTML = "Copy to clipboard";
}
$('[data-toggle="popover"]').on("click", function () {
  var $this = $(this);
  if ($this.attr("aria-describedby")) {
    // Popover is currently visible, hide it
    $this.popover("hide");
  } else {
    // Popover is currently hidden, show it
    $this.popover("show");
    // Hide the popover after 2 seconds
    setTimeout(function () {
      $this.popover("hide");
    }, 1000); // Adjust the timeout duration as needed (2000 milliseconds for 2 seconds)
  }
});
