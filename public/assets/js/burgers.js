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

        // Send POST request.
        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(
            function() {
                console.log("Created new burger.");
                // Reload page to display updated list.
                location.reload();
            }
        );

    });

    // Click handler for devour-it button.
    $(".devour-it").on("click", function(event) {
        var id = $(this).data("id");
        var burgerState = {devoured: true};

         // Send PUT request.
        $.ajax("/api/burgers" + id, {
            type: "PUT",
            data: burgerState
        }).then(function() {
            console.log("This burger is devoured.");
            // Reload page to display updated list.
            location.reload();
        });
    });
   
});