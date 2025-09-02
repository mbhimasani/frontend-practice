Prompt: Create a Snake game that meets the following requirements:

15x15 grid

Snake should be controlled with cursor keys (or WASD if you prefer)

Snake should start with a length of 3

One apple at a time should appear in a random position on the grid. When collected, it should increase the score by one, increase the snake length by one, and change to another random position

Display a score for how many apples have been collected

If the snake head collides with the rest of the body, the game should end

If the snake head collides with the borders, the game should end


Possible extensions:

When the game is over, display a game over message with the score and allow the user to press space to restart

As well as the current score, display the player's high score (you could also persist this with localStorage)

Before the game starts, display an intro message (e.g. game title, controls, high score) and wait for the player to press a key

Consider ways to increase the difficulty over time (or add selectable difficulty modes): increasing the speed of the snake, adding random obstacles

At this point, you have a pretty complete game: congratulations!

Source: https://www.reddit.com/r/webdev/comments/hyuznw/i_wanted_to_share_some_front_end_practice/