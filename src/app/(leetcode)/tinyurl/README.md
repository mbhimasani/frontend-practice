# Leetcode: 535.Encode and Decode TinyURL

## Description

>**Note: This is a companion problem to the [System Design](https://leetcode.com/discuss/interview-question/system-design/) problem: [Design TinyURL](https://leetcode.com/discuss/interview-question/124658/Design-a-URL-Shortener-(-TinyURL-)-System/).**

TinyURL is a URL shortening service where you enter a URL such as `https://leetcode.com/problems/design-tinyurl` and it returns a short URL such as `http://tinyurl.com/4e9iAk`. Design a class to encode a URL and decode a tiny URL.<br>

There is no restriction on how your encode/decode algorithm should work. You just need to ensure that a URL can be encoded to a tiny URL and the tiny URL can be decoded to the original URL.<br><br>

Implement the `Solution` class:

- `Solution()` Initializes the object of the system.
- `String encode(String longUrl)` Returns a tiny URL for the given longUrl.
- `String decode(String shortUrl)` Returns the original long URL for the given shortUrl. It is guaranteed that the given shortUrl was encoded by the same object.


**Example 1:**
>**Input**: `url = "https://leetcode.com/problems/design-tinyurl"`
>
>**Output**: `"https://leetcode.com/problems/design-tinyurl"`
>
>**Explanation**:<br>
>Solution obj = new Solution();<br>
>string tiny = obj.encode(url); // returns the encoded tiny url.<br>
>string ans = obj.decode(tiny); // returns the original url after decoding it.

<br>
Constraints:

- `1 <= url.length <= 104`<br>
- `url` is guranteed to be a valid URL.

Source: https://leetcode.com/problems/encode-and-decode-tinyurl

<!-- 
Implementation notes:
- FE:
  - text field for users to input url to encode/decode
  - 'encode' button
  - 'decode' button
  - surface decoded/encoded url
  - display message if unable to encode/decode url
- BE:
  - return encoded url
  - return decoded url
  - return error if unable to encode/decode url
- Base62 will be used for encode/decode
- ideally we want to spin up a db that will store the id, short url and long url, and encode the row ID but I'm going to simulate this instead by storing those values in a dictionary in the Solution class 
-->