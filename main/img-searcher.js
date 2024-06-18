document.addEventListener('DOMContentLoaded', function() {
    // Event listener for the form submission
    document.getElementById('textForm').addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent the form from submitting normally
  
      const inputText = document.getElementById('inputText').value.trim(); // Get the input value
      if (inputText === '') {
        alert('Please enter a Pokemon name.'); // Notify user if the input is empty
        return;
      }
  
      const image = `https://img.pokemondb.net/artwork/large/${inputText.toLowerCase()}.jpg`; // Construct image URL
      const imgElement = document.querySelector('.image img'); // Select the <img> element
  
      imgElement.src = image; // Set the src attribute of the <img> element
      imgElement.alt = inputText; // Set the alt attribute for accessibility
  
      // Clear the input field after submission if desired
      // document.getElementById('inputText').value = '';
    });
  });
  
  