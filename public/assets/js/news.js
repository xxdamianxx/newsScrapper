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
      console.log(news_data[0]);
      for(i = 0; i < news_data.length; i++){
        var title = "<h1>" + news_data[i].headline + "</h1>";
        var synopsis = "<h4>" + news_data[i].summary + "</h4>";
        var link = "<p>" + news_data[i].url + "<p>";
        var comment_box = "<input type='text' id='" + news_data[i]._id + "'></input>";
        var leave_comment_button = "<input type='button' value='Add Comment' id='button_" + news_data[i]._id + "' /> ";
        
        var divider = "<br><span>--------------------------------------------<span><br><br>";

        $('#news_items').append(title, synopsis, link, comment_box, leave_comment_button);
        loadComments($('#news_items'), news_data[i].comments, news_data[i]._id);
        $('#news_items').append(divider);
        attachEvenListener(news_data[i]._id);
      }
    }

    function loadComments(parent_element, comments, id){
      for(comment of comments){
        // console.log("Comment found: " + comment);
        var comment_element = "<p>" + comment + "<p>";
        var delete_Button = "<button id='delete_" + id + "'>Delete</button>"
        parent_element.append(comment_element, delete_Button);
        attachEvenListenerDelete(id, comment);
      }
    }

    function attachEvenListenerDelete(news_id, comment){
      console.log("attachEvenListenerDelete ");
      $("#delete_"+news_id).on("click", function(){
        console.log("attachEvenListenerDelete Clicked");
        $.ajax({
          method: "DELETE",
          url: "/api/news/"+news_id,
          data: {"comment":comment}
        }).then(
          function(data) {
            console.log("Comment deleted");
            
          }
        );  
      })
    }

    function attachEvenListener(news_id){
      $("#button_"+news_id).on("click", function(){
        var val = $("#"+news_id).val();
        addCommentToNews(news_id, val);
      })
    }

    function addCommentToNews(id, value){
      console.log("Calling on backend with value: " + value);
      // // Send the POST request.
      $.ajax({
        method: "PUT",
        url: "/api/news/"+id,
        data: {"comment":value}
      }).then(
        function(data) {
          console.log("Front-end: Comment added");
          // displayNews(data);
          // Simulate Crawl Button Click     
          location.reload();
          $("#crawl_news").trigger('click');
        }
      );
    }

  });
  