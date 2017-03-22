var buttonArray = ["Oh My God", "Applause", "Happy", "Scared", "Mind Blown"];

$().ready(function () {

    renderButtons();

    function renderButtons() {

        //Empty the current button area
        $("#button-list").empty();

        //Generate list of buttons
        for (var i = 0; i < buttonArray.length; i++) {
            var btn = $("<button>" + buttonArray[i] + "</button>");

            //add class to button
            btn.addClass("search-button");
            //add dataname to button
            btn.attr("data-name", buttonArray[i]);
            //add text to button
            btn.text(buttonArray[i]);

            //add button to button-list
            $("#button-list").append(btn);
        }
    }

    //Search / Add new button when search term is submitted
    $("#submit-button").on("click", function (event) {
        //Allows user to search with enter button
        event.preventDefault();
        //store user input
        var searchText = $("#search-box").val().trim();
        addToArray(searchText);
        giphySearch(searchText);
    });

    //Clear gifs on button press
    $("#clear-button").on("click", function (event) {
        event.preventDefault();
        $("#results").empty();
    });

    //Search Giphy and display results on search button click
    $("#button-list").on("click", ".search-button", function () {
        console.log("search click");
       var searchText = $(this).attr("data-name");
       giphySearch(searchText);
    });


    function addToArray(text) {
        //leave function if searchtext is blank
        if (text === "") {
            return;
        }
        //pushes new text to array
        buttonArray.push(text);
        //update button list
        renderButtons();
        //clear search box
        $("#search-box").val("");
    }

    function giphySearch(search) {
        var query = "https://api.giphy.com/v1/gifs/search?q=" + search + "&limit=10&api_key=dc6zaTOxFJmzC";

        //call to giphy
        $.ajax({
            url: query,
            method: "GET"
        })

        //response from api
            .done(function (response) {

                console.log(response);

                for(var i = 0; i < response.data.length; i++)
                {
                    var stillURL = response.data[i].images.fixed_width_still.url;
                    var animatedURL = response.data[i].images.fixed_width.url;
                    var rating = response.data[i].rating;
                    var alt = response.data[i].slug;

                    //div for imag & rating
                    var imgDiv = $('<div class="imgDiv">');

                    //img info
                    var gif = $("<img>");
                    gif.attr("src", stillURL);
                    gif.addClass("gifResult");
                    gif.attr("alt", alt);
                    gif.attr("data-animate", animatedURL);
                    gif.attr("data-still", stillURL);
                    gif.attr("data-state", "still");

                    //rating text
                    var ratingText = $('<p class="gifRating">Rated: ' + rating + '</p>');

                    imgDiv.append(gif,ratingText);

                    $("#results").prepend(imgDiv);
                }
            })
    }


    //Animate / Stop gif on click
    $("#results").on("click", '.gifResult', function () {

        //if gif is still, animate it
        if($(this).attr("data-state") === "still"){
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animated");
        }
        else{
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });

});
