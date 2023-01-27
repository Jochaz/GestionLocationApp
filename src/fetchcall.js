function getvals(Method, ){
    return fetch('https://jsonplaceholder.typicode.com/posts',
    {
    	method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((responseData) => {
      console.log(responseData);
      return responseData;
    })
    .catch(error => console.warn(error));
  }
  
  getvals().then(response => console.log(response));