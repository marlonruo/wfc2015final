document.addEventListener('deviceready',function() {
    var lock = new Auth0Lock(
      // All these properties are set in auth0-variables.js
      AUTH0_CLIENT_ID,
      AUTH0_DOMAIN
    );

    var userProfile;

    $('.btn-login').click(function(e) {
      e.preventDefault();
      lock.show(function(err, profile, token) {
        if (err) {
          // Error callback
          console.log("There was an error");
          alert("There was an error logging in");
        } else {
          // Success calback

          // Save the JWT token.
          localStorage.setItem('userToken', token);

          // Save the profile
          userProfile = profile;

          //$('.login-box').hide();
          //$('.logged-in-box').show();
          //$('.nickname').text(profile.nickname);
          //$('.nickname').text(profile.name);
		  //$('.correo').text(profile.email);
          //$('.avatar').attr('src', profile.picture);
		  
		  
		  			window.location.href = '#exito'
					$('#exito').fadeIn(400)
					$('#login').fadeOut(400)
					ini_exi()
					document.getElementById('escribirtxt').src = "http://marlonruo.com/wfc2015/enviar2.php?nombre="+profile.name+"&email="+profile.email;
					document.getElementById('if_qr').src = "http://marlonruo.com/wfc2015/qr.php?datos="+"<b>"+profile.name+"</b><br> Phone: <a href='tel:'></a><br> Mail: <a href='mailto:"+profile.email+"'>"+profile.email+"</a>"
					allText = "<b>"+profile.name+"</b><br> Phone: <a href='tel:'></a><br> Mail: <a href='mailto:"+profile.email+"'>"+profile.email+"</a>"
		  
		  
        }
      });
    });

    $.ajaxSetup({
      'beforeSend': function(xhr) {
        if (localStorage.getItem('userToken')) {
          xhr.setRequestHeader('Authorization',
                'Bearer ' + localStorage.getItem('userToken'));
        }
      }
    });

    $('.btn-api').click(function(e) {
      // Just call your API here. The header will be sent
      $.ajax({
        url: 'http://auth0-nodejsapi-sample.herokuapp.com/secured/ping',
        method: 'GET'
      }).then(function(data, textStatus, jqXHR) {
        alert("The request to the secured enpoint was successfull");
      }, function() {
        alert("You need to download the server seed and start it to call this API");
      });
    });


}, false);
