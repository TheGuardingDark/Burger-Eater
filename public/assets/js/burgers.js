



// on click event to change burger status from devoured false to true
$(function() {
    $(".eatBurger").on("click", function(event) {
        var id = $(this).data("burgersid");
        var eaten = {
            devoured: true
        };

        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: eaten
        }).then(
            function() {
                console.log("Burger has been eaten");
                location.reload();
            }
        ); 
    });

    // submit form function to add new burger to the database
$(".create-form").on("submit", function(event) {
    event.preventDefault();

    var newBurger = {
        name: $("#burg").val().trim(),
        devoured: 0
    };

    $("#burg").val("");

    $.ajax("/api/burgers", {
        type: "POST",
        data: newBurger
    }).then(
        function() {
            console.log("Created new Burger.");
            location.reload();
        }
    );
});
})