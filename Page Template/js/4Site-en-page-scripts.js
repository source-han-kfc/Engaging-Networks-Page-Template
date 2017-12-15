/*****************************
 * 4Site - Engaging Networks - Page Template v1.0.1
 * Repository: https://github.com/4site-interactive-studios/Engaging-Networks-Page-Template/
 ****************************/

/*****************************
 * Element.matches() polyfill
 ****************************/
if (!Element.prototype.matches) {
    Element.prototype.matches =
        Element.prototype.msMatchesSelector ||
        Element.prototype.webkitMatchesSelector;
}

/*****************************
 * Donation page scripts
 ****************************/

(function() {
    /**
     * Handle recurring payment date
     */

    // get current day for recurring payment date
    var recurrday = document.getElementById("en__field_transaction_recurrday");

    // get recurring pay options
    var recurrpay0 = document.getElementById("en__field_transaction_recurrpay0");
    var recurrpay1 = document.getElementById("en__field_transaction_recurrpay1");

    // get the current day
    var d = new Date();
    var n = d.getDate();

    // handle selection of give once
    if (recurrpay0) {
        recurrpay0.addEventListener('click', function(e) {
            var isGiveOnce = e.target.matches('input#en__field_transaction_recurrpay0');

            this.setAttribute('checked', isGiveOnce);
            recurrpay1.setAttribute('checked', !isGiveOnce);
        });
    }

    // handle selection of give monthly
    if (recurrpay1) {
        recurrpay1.addEventListener('click', function(e) {
            var isGiveMonthly = e.target.matches('input#en__field_transaction_recurrpay1');

            this.setAttribute('checked', isGiveMonthly);
            recurrpay0.setAttribute('checked', !isGiveMonthly);

            if (recurrday) {
                recurrday.value = n;
            }
        });
    }
})();

(function() {
    /**
     * Handle surprise radio and input field
     */

    // get elements
    var activeTab = document.getElementsByClassName('en__field__input--other')[0].parentElement,
        activePrevSibling = activeTab.previousElementSibling,
        activeNextSibling = activeTab.nextElementSibling;

    activePrevSibling.className += " en__field__item--other-radio";
    var surpriseLabel = activePrevSibling.getElementsByTagName("label")[0];
    var surpriseRadio = activePrevSibling.getElementsByTagName("input")[0];

    var surpriseInput = document.querySelector('[name="transaction.donationAmt.other"]');
    var mainContent = document.getElementById('main-content');

    // remove surprise label text and use as placeholder
    if (surpriseLabel && surpriseInput) {
        var surpriseLabelText = surpriseLabel.textContent;
        surpriseLabel.textContent = '';
        surpriseInput.placeholder = surpriseLabelText;
        surpriseInput.setAttribute('aria-label', 'Other donation amount');
    }

    // set checked attribute on radio
    // when the other amt input is focused
    if (surpriseRadio) {
        mainContent.addEventListener('focus', function(e) {
            var isOtherDonationAmtInput = e.target.matches('input.en__field__input.en__field__input--other');
            if (isOtherDonationAmtInput) {
                surpriseRadio.setAttribute('checked', '');
            }
        }, true);
    }
})();


(function() {
    /**
     * Handle credit card security code placeholder
     */

    // get elements
    var paymentTypeEl = document.getElementById('en__field_transaction_paymenttype'),
        securityCodeEl = document.getElementById('en__field_transaction_ccvv');

    // set the placeholder to to 4 digits if AMEX or 3 otherwise
    if (paymentTypeEl) {
        setSecCodePlaceholder(securityCodeEl, this, 'AX', '4 digits', '3 digits');
        paymentTypeEl.addEventListener('change', function() {
            setSecCodePlaceholder(securityCodeEl, this, 'AX', '4 digits', '3 digits');
        });
    }

    function setSecCodePlaceholder(el1, el2, cardType, string1, string2) {
        el1.placeholder = (el2.value === cardType) ? string1 : string2;
    }
})();

/*****************************
 * Advocacy page scripts
 ****************************/

(function() {
    /**
     * Display/hide the message area
     */

    // get the element
    var viewMessageEl = document.getElementById('viewMessage');

    if (viewMessageEl) {
        // get the grandparent element
        var viewMessageGrandParentEl = viewMessageEl.parentElement.parentElement;

        // set attributes
        var msgDetailsEl = viewMessageGrandParentEl.nextElementSibling;
        msgDetailsEl.classList.add('msgDetails');
        msgDetailsEl.setAttribute('role', 'tabpanel');
        msgDetailsEl.setAttribute('aria-labelledby', 'viewMessage');

        // toggle the active class value to show/hide
        viewMessageEl.addEventListener('click', function() {
            var isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.classList.toggle('active');
            msgDetailsEl.classList.toggle('show');
            this.setAttribute('aria-expanded', !isExpanded);
        });
    }
})();

(function() {
    /**
     * Insert a <label> for each target contact checkbox
     */

    // declare variables and get the parent element
    var en__contactDetails, en__contactDetails__rows;
    var label, checkBox, contactNumber, contactIdVal;
    var en__contact = document.getElementsByClassName('en__contact');
    var contactCount = en__contact.length;

    if (en__contact) {
        for (var i = 0; i < contactCount; i++) {
            // get contact detail elements for each contact
            en__contactDetails = document.getElementsByClassName('en__contactDetails')[i];
            en__contactDetails__rows = document.getElementsByClassName('en__contactDetails__rows')[i];
            contactNumber = en__contact[i].getAttribute('data-contact');

            // create a unique id value for each contact
            contactIdVal = 'en__contactId__' + contactNumber + '--' + i;

            // get each checkbox element and give it
            // a unique id value and class values to match
            // other EN checkboxes
            checkBox = document.getElementsByClassName('en__contactDetails__select')[i];
            checkBox.setAttribute('id', contactIdVal);
            checkBox.setAttribute('class', 'en__contactDetails__select en__field__input--checkbox');

            // create a <label> for each contact
            // and set for and class values
            label = document.createElement('label');
            label.setAttribute('for', contactIdVal);
            label.setAttribute('class', 'en__field__label');

            // insert the <label> before .en__contactDetails__rows
            en__contactDetails.insertBefore(label, en__contactDetails__rows);
        }
    }
})();

/*****************************
 * Set Input Placeholders
 ****************************/

(function() {
    // set placeholder for address2
    var address2 = document.getElementById('en__field_supporter_address2');
    if (address2) {
        address2.placeholder = 'Apt, ste, bldg.';
    }
})();

/*****************************
 * Submit Btn Loading Spinner
 ****************************/

(function() {
    // get the button element
    var submitBtnEl = document.querySelector('div.en__component.en__component--formblock button');

    // display spinner and disable button
    // if there are no error messages
    if (submitBtnEl) {
        submitBtnEl.addEventListener('click', function(e) {
            // setTimeout to place in queue instead
            // of in call stack immediately.
            // Allows time for validation to occur first.
            setTimeout(function() {
                if (!isMissingRequiredInputs()) {
                    submitBtnEl.innerHTML = '<div class="loaders"><span class="loader loader-quart"> </span> Processing...</div>';
                    submitBtnEl.setAttribute('disabled', '');
                }
            }, 0);
        });
    }

    function isMissingRequiredInputs() {
        return document.querySelector('[class="en__field__error"]');
    }
})();