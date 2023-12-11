### ToDos

#### Quick Links
* [Installation](#installation)
* [Troubleshooting](#troubleshooting)

#### Installation
- clone this repo and cd into the dir
    ```
    git clone https://github.com/justjcurtis/todo.git
    cd todo
    ```
- cd into the `todo-server` dir and `yarn install`
    ```
    cd todo-server
    yarn install
    ```
- create a `.env` file and add the following environment variables
    ```
    MONGODB_URI
    JWT_SECRET
    JWT_EXPIRES_IN
    REFRESH_TOKEN_SECRET
    REFRESH_TOKEN_EXPIRES_IN
    ```
- set each environment variable to values that make sense to you (eg.)
    ```
    MONGODB_URI=mongodb+srv://admin:892ruhffhuisdf0@cluster0.73r3rgjh.mongodb.net/todo?retryWrites=true&w=majority
    JWT_SECRET=C2zSu&f!F95b@478hrfgirvbj89nu875nd857084sxau84[3d&^%d78ao3N9WM
    JWT_EXPIRES_IN=300000
    REFRESH_TOKEN_SECRET=Z2zSu&u8er78curua8cunuf4m49uq3q,-d034DF3f@£fksSD12Lf
    REFRESH_TOKEN_EXPIRES_IN=86400000
    ```
- run `yarn dev` to start the server locally
    ```
    yarn dev
    ```
- cd into the `todo-client` dir in another terminal and run yarn `install`
    ```
    yarn install
    ```
- run `yarn dev` to launch the client and navigate to `localhost:5173` in your preferred browser
    ```
    yarn dev
    ```

#### Troubleshooting

The server & client make use of `httpOnly` cookies to store jwt for auth. I have `cors` and `sameSite` set as loosely as possible but your browser may still block these cookies. I found that chrome worked as expected but brave did not (even after disabling and form of cookie blocking I could in brave)

- use chrome
- ensure cookie settigs are relaxed while testing
- have a great day

[Take me to the TOP!](#top)
