# Site Blocker extension
I made this extension so I won't doomscroll on social media and actually be productive. I tested it just for the Brave browser but it should work on every chromium based browser. To use the extension go to the Extensions > Manage Extensions, enable Developer mode and Load unpacked extension. 
> **Tip:** Extensions doesn't work on mobile, but if you use the Brave browser you can go to settings > Brave Shields & privacy > Content filtering > Create custom filters and type ||site.com^. This will disable rendering of that site.

## Config Syntax
```js
[
  "siteToBlock.com",     // Site domain that you want to block
  "https://siteToRedirect.com/path",  // Site URL that you want to be redirected to.
  ["key", "words"]       // for "usesWhitelist": If the url contains at least one of the key words the redirect won't happen.
                         // for "usesBlacklist": The url must contain at least one of the key words otherwise the redirect won't happen.
]
```
> Tip: If you want to block a site completely just place the site to "usesBlacklist" and in key words list leave empty string.
