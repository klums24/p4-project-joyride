// Identify users and maintain them logged in until they log out using tokens and sessions

// when setting up sessions we can create a good secret_key using:
    // create random secret key:
    // secrets = secrets.token_hex(32)
    // compute the SHA256 hash of the seret key:
    // sha256_hash = hashlib.sha256(secret_key.encode()).hexdigest()
    //  safely store the key in flask-dotenv library where you store it in a .env file and load it into your app
    // store .envv in the gitignore file for safety
    // use RBAC role based access control system to decide what routes they have access to
    // you can set a role column in the users database or use Flask Security
    // check fernet library
    // .env file never goes to github, never serialize passwords

    // if there is no user in state then we will redirect them back to their login/signup point
