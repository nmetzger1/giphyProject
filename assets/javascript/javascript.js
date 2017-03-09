var buttonArray = ["football", "hockey", "basketball", "baseball", "wwe"];

$(document).ready(function () {

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

    $("#submit-button").on("click", function (event) {
        //Allows user to search with enter button
        event.preventDefault();
        //store user input
        var searchText = $("#search-box").val().trim();
        addToArray(searchText);
        giphySearch(searchText);
    });

    $(".search-button").on("click", function () {
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
        var query = "http://api.giphy.com/v1/gifs/search?q=" + search + "&limit=10&api_key=dc6zaTOxFJmzC";

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
                    var imgURL = response.data[i].images.fixed_height.url;
                    var rating = response.data[i].rating;
                    var alt = response.data[i].slug;

                    //div for imag & rating
                    var imgDiv = $('<div class="imgDiv">');

                    //img info
                    var gif = $("<img>");
                    gif.attr("src", imgURL);
                    gif.addClass("gifResult");
                    gif.attr("alt", alt);

                    //rating text
                    var ratingText = $('<p class="gifRating">' + rating + '</p>');

                    imgDiv.append(gif,ratingText);

                    $("#results").prepend(imgDiv);
                }
            })
    }
});