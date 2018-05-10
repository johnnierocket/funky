# Adding your own game module into funky

## 1. Update Modules.js
In `/src/Modules.js` add a new entry to describe your module. Example:
```javascript
const modules = {
  ...
  munkyjs: {
    moduleName: 'MunkyJS',
    logoName: './src/images/logos/funky.png',
  },
};
```

You can add any images into `/src/images/logos` as needed to be displayed for this module.

## 2. Add new exercises for the Module
In `/src/exercises` add a new JS file with an empty object as default export.

In the next step we will start creating exercises as unit tests first. Each exercise needs to have the following fields:

- `id`: string that matches the key it is stored in
- `title`: string to be displayed at the top of the page
- `points`: number of points to be awarded on success
- `display`: big string that contains all the example code - use the token __INPUT__ to render the user's input box. don't put more than one on there, I don't know what will happen if you do
- `givens`: object of key/val pairs that will be made available to the context used to eval the user's input
- `assert`: function that is passed an object containing the givens along with an 'input' field and if it runs without throwing an exception the exercise is considered a success

Take a look at `/src/exercises/funkyjs.js` for an example implementation

## 3. Develop exercises through unit tests
I've found the easiest way to build new exercises for your module is make a unit test for it so you can have a tight feedback loop and avoid having to game test each one until the very end.

To add a unit test, create a new JS file in `/src/__tests__` and import your exercises module.  You can use a helper to choreograph the answering of your question so the code isn't too lengthy.

Example:
```javascript
import exercises from '../exercises/funkyjs';
import getValidater from '../helpers/Validate';

const validate = getValidater(exercises);

it('1 Using a function returned from another function', () => {
	validate('1', '"Hello"');
});
```

In this example `'1'` is the id of the exercise to test and `"Hello"` is the correct answer to feed into the exercise function.

Now you can do TDD all day long!
