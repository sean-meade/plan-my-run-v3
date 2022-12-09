// https://getbootstrap.com/docs/5.1/components/alerts/

/**
 * A function that when called creates an alert with a message on a colour background
 *
 * @param {String} message = text displayed in alert
 * @param {String} type = type of alert (decides colour of background)
 * @param {String} alertPlaceholder = div to place the alert in
 */
function alert(message, type, alertPlaceholder) {
  var alertPlaceholderDiv = document.getElementById(alertPlaceholder);
  alertPlaceholderDiv.innerHTML =
    '<div class="alert alert-' +
    type +
    ' alert-dismissible" role="alert">' +
    message +
    '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
}
