// AN Note: This is my function to parse the data from a simple receipt where everything lines up horizontally.
// I'm going to refactor this to make is easier to read....eventually.
export const receiptParser = function (receiptData) {
  // First I initialized three arrays.
  // One to hold an array of price objects (holds price and location/verticies data).
  // One to hold an array of word objects (holds locations of the first y coordinate of a word and the word itself).
  // Lastly, I have initialized the final array which will be the output of mapping the two arrays above to produce a data structure suitable for display in a component.
  const arrayOfPriceObjects = [];
  const arrayOfWordObjects = [];
  let finalArray = [];
  // Here I'm setting a variable called regexPrice to be the format of the price of an item.
  const regexPrice = /^\d+\.\d\d$/;
  // Here I'm setting a variable to be the index of 0 and the key of text annotations of the JSON receipt.
  let textAnnotationArrayOfObjects = receiptData[0].textAnnotations;
  // Here I'm doing a forEach on that variable as it's an array of objects.
  textAnnotationArrayOfObjects.forEach(object => {
    // Firstly, I set an empty object.
    let obj = {};
    // Then if the object in the array of objects is a dollar amount,
    // Then put that in the empty object along with it's location data.
    if (object.description.match(regexPrice)) {
      obj.price = object.description;
      obj.verticies = object.boundingPoly.vertices;
      if (Object.keys(obj).length !== 0) {
        // If the object has stuff in it (aka has keys of any sort), push that in the array of price objects.
        // Which was initialized at the start of this function.
        arrayOfPriceObjects.push(obj);
      }
      // However, if the object.description is a word with no digits or special characters,
    } else if (object.description.match(/[^$#-D]/)) {
      // Put the location of it's first y coordinate in the empty object.
      obj.location = object.boundingPoly.vertices[0].y;
      // And put the word in that empty object.
      obj.details = object.description;
      // Then push that object into the array of word objects initialized in the beginning of this function.
      arrayOfWordObjects.push(obj);
    }
  });
  // Now we map the two array of objects we created at the beginning of this function,
  // To create our final output.
  // We're looping through the array of price objects.
  arrayOfPriceObjects.forEach(priceObject => {
    // We're setting an empty object.
    let obj = {};
    // We putting the price in that object.
    obj.price = priceObject.price;
    // Now we're initializing a variable called words.
    let words = [];
    // Now we're doing a forEach on the array of word objects.
    arrayOfWordObjects.forEach(wordObject => {
      // If the price object's first y coordinate is between the first y coordinate of the word with a +/- 40 point margin of error,
      // We can assume that word is on the same line as the price.
      if (
        priceObject.verticies[0].y <= wordObject.location + 40 &&
        priceObject.verticies[0].y >= wordObject.location - 40
      ) {
        // So add that word to the words array.
        words.push(wordObject.details);
        // Add that words array to the object.
        obj.words = words;
      }
    });
    // Push all of that into the final array.
    finalArray.push(obj);
  });
  return finalArray;
};
