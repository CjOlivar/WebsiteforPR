let menuicn = document.querySelector(".menuicn");
let nav = document.querySelector(".navcontainer");

menuicn.addEventListener("click", () => {
    nav.classList.toggle("navclose");
})
// Make sure this code is inside <script> tags in your HTML or your main JS file

// View Button functionality
document.querySelectorAll('.view-btn').forEach(button => {
    button.addEventListener('click', function() {
      let itemId = this.dataset.itemId; // Assumes buttons have data attributes
      alert('Viewing item: ' + itemId);
      // Add navigation or modal popup logic here
    });
  });
  
  // Edit Button functionality
  document.querySelectorAll('.edit-btn').forEach(button => {
    button.addEventListener('click', function() {
      let itemId = this.dataset.itemId;
      alert('Editing item: ' + itemId);
      // Add form filling logic or navigation to the edit page here
    });
  });
  
  // Delete Button functionality
  document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', function() {
      let itemId = this.dataset.itemId;
      if (confirm('Are you sure you want to delete item: ' + itemId + '?')) {
        alert('Item deleted!');
        // Add delete functionality here, like an API call or DOM removal
      }
    });
  });
  