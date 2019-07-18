// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
    console.log("frontend news.js loaded");
    $("#crawl_news").on("click", function(event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();
        console.log("Crawl News Clicked");

        // var newCat = {
        //   name: $("#ca").val().trim(),
        //   sleepy: $("[name=sleepy]:checked").val().trim()
        // };
    
        // // Send the POST request.
        $.ajax("/api/news", {
          type: "GET"
        }).then(
          function(data) {
            console.log("Receiving News...");
            // console.log(data);
            displayNews(data);
            // Reload the page to get the updated list
            // location.reload();
          }
        );
      });


    function displayNews(news_data){
      console.log("typeof: " + typeof news_data[0]);
      // console.log("first element: " + news_data[0]);
      // console.log("JSON stringify element: " + JSON.stringify(news_data));
      // console.log("JSON stringify first element: " + JSON.stringify(news_data[0]));
      // console.log("news_data[0].link: " + news_data[0].link);
      // console.log("data in displayNews: " + news_data);
      for(i = 0; i < news_data.length; i++){
        console.log("typeof 2: " + typeof news_data[i]);
        // console.log("typeof: " + typeof news);
        // console.log("news.link: " + news.link);
        // var txt1 = "<p>Text.</p>";               // Create element with HTML  
        // var txt2 = $("<p></p>").text("Text.");   // Create with jQuery
        // var txt3 = document.createElement("p");  // Create with DOM
        // txt3.innerHTML = "Text.";
        // $("body").append(txt1, txt2, txt3);  
        var title = "<h1>" + news_data[i].title + "</h1>";
        var synopsis = "<h4>" + news_data[i].synopsis + "</h4>";
        var link = "<p>" + news_data[i].link + "<p>";
        var divider = "<br><span>--------------------------------------------<span><br><br>";
        // var div = "<div class='news_element'></div>"
        $('#news_items').append(title, synopsis, link,divider);
      }
      
    }
    // $(".change-sleep").on("click", function(event) {
    //   var id = $(this).data("id");
    //   var newSleep = $(this).data("newsleep");
  
    //   var newSleepState = {
    //     sleepy: newSleep
    //   };
  
    //   // Send the PUT request.
    //   $.ajax("/api/cats/" + id, {
    //     type: "PUT",
    //     data: newSleepState
    //   }).then(
    //     function() {
    //       console.log("changed sleep to", newSleep);
    //       // Reload the page to get the updated list
    //       location.reload();
    //     }
    //   );
    // });
  
    
  
    // $(".delete-cat").on("click", function(event) {
    //   var id = $(this).data("id");
  
    //   // Send the DELETE request.
    //   $.ajax("/api/cats/" + id, {
    //     type: "DELETE"
    //   }).then(
    //     function() {
    //       console.log("deleted cat", id);
    //       // Reload the page to get the updated list
    //       location.reload();
    //     }
    //   );
    // });
  });
  