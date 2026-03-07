# Difference between var, let, and const =>
  These all are is keyword which is used to declare variable. That means by using this we create variable to reserve data.    

  var is ES5 version, const and let is ES6 version. Sometimes var create some bug because it doesn't agree with block scope. That's why now we don't use var, we use const and let(best recommended).

  **1. Var:**  
      This is a function scoped and also not block scope. But redeclaration & reassignment allowed for it. If we may use it then for hoisting reason sometimes we see unexpected bug.    
    
  **2. const:**  
      It is block scope. Value reassign is not allowed for it.

  **3. let:**  
      It has block scope too. But value reassign allowed for it.


# Spread operator (...) =>
  It is a feature that by using it we can separate any array, object or collection of elements. Even it used for arguments spread when we call a function. After using it the original array, object still unchanged.


# Difference between map(), filter(), and forEach() =>
  These all are is a array method of JavaScript. 

  **1. map():**  
      By using it we can do something on every elements of an array. It creates a new array that's why the original array is still unchanged.

  **2. filter():**  
      By using it we can get some new items with a specific condition from an array. It creates an new array and the old array is still unchanged.

  **3. forEach():**  
      It is used for looping on every elements of an array. It returns nothing. It don't creates new array.


# Arrow function =>
  It is a new and modern style of function declaration. It is came from ES6 version.   
  
  It has many of syntax. If the code is one line then there is no need to write return. If the parameter is single so no need to (). But case of no parameter the () must be needed.

  Arrow function has no *this* behavior. It takes *this* from parent scope.


# Template literals =>
  It is a feature of ES6 version. It is also a system to write string. Backtick(``) is used for it. But it has some very useful side that is over than single quotes(' ') and double quotes(" ").  
  
  By using this we can write multi-line string, insert the variable, call function and expression in string etc.

  It is also very useful to create HTML dynamically.  