// JSON.stringify() is used to convert JavaScript objects into a JSON string.
const obj = { name: "John", age: 30, city: "New York" };
const jsonString = JSON.stringify(obj);
console.log(jsonString); // Output: {"name":"John","age":30,"city":"New York"}

//  JSON.parse() is used to parse a JSON string and convert it into a JavaScript object.
const jsonString1 = '{"name":"John","age":30,"city":"New York"}';
const obj1 = JSON.parse(jsonString1);
console.log(obj1); // Output: { name: 'John', age: 30, city: 'New York' }