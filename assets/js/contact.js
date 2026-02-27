(function(){
  const c_p = document.getElementById('c-p').value;
  const cp = atob(c_p).trim();
  const ca = 'iBLNQgfXpdiqC6RkzsiPn3yab3QnEN5gXLJfCiyt';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  var form = document.getElementById('contact-form');
  var hp      = document.getElementById('company');
  var started = document.getElementById('form_started');
  var token   = document.getElementById('js_token');  
  var tyCb    = document.getElementById('contact-thank-you');
  // var icon    = document.getElementById('contact-icon');
  var cHeading = document.getElementById('contact-heading');

  if (started) {
    var startMs = Date.now();
    started.value = String(startMs);
    token.value   = String(Math.random()).slice(2) + '-' + startMs;
  }

  if (hp) hp.value = '';

  function checkMe() {
    if (hp && hp.value.trim() !== '') return true;

    var elapsed = Date.now() - startMs;
    if (elapsed < 3000) return true;

    if (!token.value) return true;

    var msg = (document.getElementById('message') || {}).value || '';
    if (msg.length > 200 && msg.indexOf(' ') === -1) return true;

    return false;
  }

  if (form) {
    form.addEventListener('focusin', function () {
      if (hp) hp.setAttribute('autocomplete', 'off');
    });
  }

  contactBtn = document.getElementById('x-btn-submit-contact');
  if(contactBtn){
    contactBtn.addEventListener('click', async function(e){
      e.preventDefault();
      if (!form) return;
      if (contactBtn.classList.contains('loading')) return;
      contactBtn.classList.add('loading');

      if (checkMe()) {
        contactBtn.classList.remove('loading');
        return;
      }

      var message = (document.getElementById('message') || {}).value || '',
          email   = (document.getElementById('email') || {}).value || '',
          firstName    = (document.getElementById('firstName') || {}).value || '',
          lastName    = (document.getElementById('lastName') || {}).value || '',
          phone    = (document.getElementById('phone') || {}).value || '',
          company    = (document.getElementById('company') || {}).value || '';
           
      if (!message.length || !email.length || !firstName.length) {
        contactBtn.classList.remove('loading');
        alert('All fields are required.');
        return;
      }
      if (company.length) {
        return;
      }

      if (emailRegex.test(email)) {
        try {
          const formData = Object.fromEntries(new FormData(form).entries());
          const res = await fetch(cp, {
            method: "POST",
            headers: { 
              "Content-Type": "application/json",
              "contact": ca,
            },
            body: JSON.stringify(formData)
          });

          if (!res.ok) throw new Error("Network response was not ok");

          form.classList.add('fadeout');
          if (cHeading) cHeading.classList.add('fadeout');
          setTimeout(function(){
            form.style.display = 'none';
            tyCb.classList.add('show');
            setTimeout(function(){
              tyCb.classList.add('visible');
              // icon.classList.add('bounce');
              contactBtn.classList.remove('loading');
            },300);
          },300);
        } catch (error) {
          alert("There was a problem submitting your message. Please try again later: "+JSON.stringify(error));
          contactBtn.classList.remove('loading');
          console.error(72);
        }
      } else {
        alert('Please enter a valid email address.');
        contactBtn.classList.remove('loading');
        return;
      }
    });
  }
})();
