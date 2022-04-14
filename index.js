(function() {
    let newsStories = document.querySelector(".story-list");

    let storyItems = "";
    
    for (story of sdqPT410) {
        storyItems += "<tr><td><p>" + story.id + ": " + story.question + "</td><td></p><input type='radio' name=" + story.id + "></td><td></p><input type='radio' name=" + story.id + "></td><td></p><input type='radio' name=" + story.id + "></td></tr>";
      }

    newsStories.innerHTML = storyItems;
        
})();

