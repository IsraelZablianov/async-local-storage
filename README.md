# AsyncLocalStorage examples 

AsyncLocalStorage is a Node.js API that provides a way of propagating the context of the current async operation through the call chain without the need to  explicitly pass it as a function parameter. It is similar to thread-local storage in other languages.
The main idea of Async Local Storage is that we can wrap some function call with the AsyncLocalStorage#run call. All code that is invoked within the wrapped call gets access to the same store, which will be unique to each call chain.
