// Initialisation d'EmailJS 
(function(){
    emailjs.init("uMw1ptPByTet3Fhqm"); 
})();

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    const templateParams = {
        user_name: name,
        user_email: email,
        subject: subject,
        message: message
    };

    emailjs.send("portfolio_html", "template_r4uzdgc", templateParams)
    .then((response) => {
        document.getElementById('response-message').innerText = 'Merci, votre message a été envoyé !';
        console.log('SUCCESS!', response.status, response.text);
        document.getElementById('contact-form').reset(); 
    }, (error) => {
        document.getElementById('response-message').innerText = 'Une erreur est survenue. Veuillez réessayer.';
        console.log('FAILED...', error);
    });
});
