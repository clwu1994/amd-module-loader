define("b", ["c"], function(c) {
  console.log("b");
  console.log(c.sqrt(4));
  return {
    equal(a, b) {
      return a === b;
    }
  };
});
