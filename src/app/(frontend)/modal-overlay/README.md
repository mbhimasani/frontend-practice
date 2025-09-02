Prompt: Create a dismissible modal overlay. The UI should initially show a 'Show offer' button which, when clicked, displays an overlay resembling the mockup below, including a transparent grey overlay over the background. The modal should be vertically and horizontally centered, and always in the same position regardless of scrolling.

https://www.reddit.com/media?url=https%3A%2F%2Fpreview.redd.it%2Fat4ojyq9c1z51.png%3Fwidth%3D320%26crop%3Dsmart%26auto%3Dwebp%26s%3Dafc31233bc6ede075ffc26705d3b57428e1dddc1

https://www.reddit.com/media?url=https%3A%2F%2Fpreview.redd.it%2F2hf1fbuac1z51.png%3Fwidth%3D320%26crop%3Dsmart%26auto%3Dwebp%26s%3Dff726a6d809cc426ff6f3ce6d425485eff28f845


If the user clicks anywhere on the grey background or the 'x', the modal should be dismissed and the UI should again just show the 'Show offer' button. However, if the user clicks the 'Accept offer' button, the modal will dismiss and the UI should now show the text "Offer accepted".
https://preview.redd.it/0ecnshbcc1z51.png?width=320&crop=smart&auto=webp&s=86761880ed81578c2cd79c05e4f53e8b2fd19b18

Possible extensions:

Can you extend the UI to support multiple modals? For example, the UI should have buttons for 'Show offer one' and 'Show offer two'. If the user accepts offer one, that modal button should change to 'Accepted offer one', and the UI should still have the 'Show offer two' button

Make it so that the Esc key closes the modal as well

Make the modal responsive so that on mobile web the modal takes up the entire browser window

If the page is longer than one screen (has a vertical scrollbar), prevent scrolling when the modal is open
