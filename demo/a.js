define('a', ['b'], function(b) {
  console.log('a');
  console.log(b.equal(1,2));
  return {
    add(a, b) {
      return a + b;
    }
  }
});