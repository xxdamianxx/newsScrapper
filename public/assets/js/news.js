// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
    console.log("frontend news.js loaded");
    $("#crawl_news").on("click", function(event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();
        console.log("Crawl News Clicked");
    
        // // Send the POST request.
        $.ajax("/api/news", {
          type: "GET"
        }).then(
          function(data) {
            console.log("Receiving News...");
            displayNews(data);
            // location.reload();
          }
        );
      });

    function displayNews(news_data){
      console.log(news_data);
      for(i = 0; i < news_data.length; i++){
        var title = "<h1>" + news_data[i].title + "</h1>";
        var synopsis = "<h4>" + news_data[i].synopsis + "</h4>";
        var link = "<p>" + news_data[i].link + "<p>";
        var comment_box = "<input type='text' id='" + news_data._id + "'></input>";
        var leave_comment_button = "<input type='button' value='" + news_data._id + "' id='button_" + news_data._id + "' /> ";
        var divider = "<br><span>--------------------------------------------<span><br><br>";
        $('#news_items').append(title, synopsis, link, comment_box, leave_comment_button, divider);
        attachEvenListener(news_data._id);
      }
    }

    function attachEvenListener(news_id){
      $("#button_"+news_id).on("click", function(){
        var val = $("#"+news_id).val();
        alert("Value: " + val);
      })
    }

  });
  