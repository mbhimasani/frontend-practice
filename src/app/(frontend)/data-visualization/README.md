Prompt: retrieve a list of numbers from an [endpoint](https://www.random.org/integers/?num=200&min=1&max=10&col=1&base=10&format=plain&rnd=new), then plot a histogram showing the frequency of each number in the list. The histogram should have appropriately numbered x and y axes

Possible extensions

Ensure your histogram displays correctly with extremes, e.g. how does it handle very high frequencies of a single number, what about negative numbers?

Use different colors for each bar in the histogram

Add a button to refetch/regenerate the data (the endpoint will return random numbers each time)

On hovering over a bar in the histogram, change the color and show a label above the bar with the precise value

You may notice that the random.org URL takes query parameters that will change the numbers generated: include a form that will dynamically generate the URL to provide a different set of numbers (e.g. more numbers, min/max value)

Source: https://www.reddit.com/r/webdev/comments/hyuznw/i_wanted_to_share_some_front_end_practice/