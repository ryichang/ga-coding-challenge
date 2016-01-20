var signupData = $("#signup-form").serialize();
  console.log(signupData);

 $.post('/users', signupData, function(response){
    console.log(response);
  });