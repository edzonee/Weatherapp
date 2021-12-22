fetch(`https://raw.githubusercontent.com/edzonee/FE21-JS1-Slutprojekt-Ediz-Mehmet/main/js/countries.json`)
.then(  
    function(response) {
    console.log(response);

      // Examine the text in the response  
      response.json().then(function(data) {  
        let option;
    
    	for (let i = 0; i < data.length; i++) {
          option = document.createElement('option');
          getCountry.appendChild(option);
      	  option.text = data[i].name;
      	  option.value = data[i].code;
      	  getCountry.add(option);
    	}    
      });  
    }  
  )  
  .catch(function(err) {  
    console.error('Fetch Error -', err);  
  });