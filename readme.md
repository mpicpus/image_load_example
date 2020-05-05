# JS server-efficient image load example
This example, derived from a help request, illustrates the difference between a quick but server-stressing image manipulation schema versus a more verbose, server-efficient architecture.

It's up to you to decide where to put the stress, depending on your project specifications.

Pardon the lack of style, it's irrelevant to the matter at hand.

All the relevant code is at `app.js`.

To visually test the difference, follow these steps:
- Download the code and open `index.html` in browser (Chrome ideally).
- Open Chrome dev tools, open the "Network" tab and select "Img".

<img src="readme_assets/2020-05-02_02-49.png" width="400">

- Leave the optional flags as they are for the first iteration:

```javascript
// #### Configuration variables ####

// Toggle between image load versions.
let useEfficientLoad = false;
// Trigger eager load of all images on app initialization.
let eagerLoad = false;
```

- The code will create a simple list. Upon "hover" javascript will inject a different image on the dome.
___
### 1. Basic mode (non-efficient)
Although we only have 3 images, the Img screen in the Chrome inspector will quickly fill with image loads as we pass the cursor over the top list:

<img src="readme_assets/2020-05-02_02-46.png" width="400px">

### 2. Efficient mode
In this version, the images will load only once: after that they'll be pulled from memory, not from the server.

Change the option value:
```javascript
let useEfficientLoad = true;
```

Reload the page and watch the Img screen: only 3 image loads will happen, no matter the times we hover on the list:

<img src="readme_assets/2020-05-02_02-47.png" width="400">