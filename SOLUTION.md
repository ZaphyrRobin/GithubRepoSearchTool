# Post-submission Improvements
If we had more time .... :)

## Code Refactoring/Improvements

### Moving async searchRepos functions in Home.tsx to a separated file.

### Create a new path/page to render individual repository details.
If we want to display more information of the repository detail.

### Consider using Redux
If the App is growing bigger and we may need to store the search results so that it could be shared between different
components without passing from props.

### Make getRepoByKeyword in utilities.ts more flexible
So that it could be able to handle more query cases.

### Working on pagination of watchers
Right now only get the first 10 of them.

### Customize UX support for mobile device sizes
The current version supports responsive design but no optimization for the mobile devices.

### Adding Unit Tests
We should add more unit tests (by enzyme or other frameworks) and setup coverage threshold.


## Advanced improvements

### Make it to be a PWA (Progressive Web App)
Need to support different sizes of favicon.ico, add serviceWorkers and make it installable.

### Make a AMP version
AMP could boost website SEO a lot.
