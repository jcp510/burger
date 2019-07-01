// Wait for DOM to fully load before attaching handlers.
$(function() {
    // Whenever a user submits a burger's name, your app will display the burger on the left side of the page 
    // waiting to be devoured.  
    // Each burger in the waiting area also has a Devour it! button. When the user clicks it, the burger will 
    // move to the right side of the page.

    $("#submit").on("submit", function(event) {
        event.preventDefault();

        var newBurger = {
            name: $("#new-burger").val().trim(),
            devoured: false
        };
    });
});