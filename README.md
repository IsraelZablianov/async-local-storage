# async-local-storage examples
AsyncLocalStorage is a Node.js API that provides a way of propagating the context of the current async operation through the call chain without the need to  explicitly pass it as a function parameter. It is similar to thread-local storage in other languages.

[Solving the Async Context Challenge in Node.js](https://medium.com/wix-engineering/solving-the-async-context-challenge-in-node-js-088864aa715e)


The main idea of Async Local Storage is that we can wrap some function call with the `AsyncLocalStorage#run` call. All code that is invoked within the wrapped call gets access to the same store, which will be unique to each call chain.

Motivation -

Consider for example a standard web server that handles a couple of I/O operations. 
```ts
// server.ts
    router.get(
      path.join('/', 'user-details'), async (req, res) => {
          const accessToken = await extractAccessToken(req);
          const userDetails = await getUserDetails(accessToken);
          res.send(response);
      },
    );

// getUserDetails.ts
export async function getUserDetails(accessToken: string) {
    const isPermitted = await checkPermissionsOn(accessToken);
    if (!isPermitted) {
        throw new NotPermittedError('Not permitted');
    }

    const userDetalis = await queryUserDetails(accessToken);
    await logger.report(accessToken, `getUserDetails fetched with ${userDetalis}`);

    return userDetails;
}
```
In this example, the 'accessToken' param is contextual data associated with this request. It needs to be available in some or even all function scopes that are triggered within the 'user-details' route.

For each client request, we have an API call, a DB query, and another API call. The simplest way to have the accessToken available in the entire flow is to drill it down, from one function to another as a parameter.

But is it wise?
<br/>

Do we really want to explicitly send accessToken from one function to another? <br/>
Should it be part of all functions' signatures in this chain? <br/>
Imagine a call chain where a parameter is passed from one function to another only to be used at the very end, should we drill down in that case?<br/>

Prop drilling is considered a bad practice in front-end development and to overcome it, there is the concept of state management and state management libraries.
The basic idea of this concept is to have a 'store', an object that contains the application context.<br/>

Wouldn't it be nice to have something similar in Node?
