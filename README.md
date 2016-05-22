# Bifrost Microservices Sample Application
This application has been built to demonstrate the release and live-testing capabilities of the Bifrost Toolkit.

## Launching the Application
### Requirements
* [Docker](https://www.docker.com/) >= 1.9.1
* [Docker-Compose](https://www.docker.com/products/docker-compose) >= 1.9.1

On Windows/Linux, add the following entries into your `hosts`-file to allow the nginx-container to properly route your requests:

```
localhost auth.bifrost.com
localhost products.bifrost.com
localhost frontend.bifrost.com
```

If you're using `docker-machine`, replace localhost with the correspondant machine IP (default: `192.168.99.100`).

### Application-Only
To launch the version without Bifrost deployed, simply use:

```
docker-compose -f docker-compose.yml up -d
```

You should now be able to open `http://frontend.bifrost.com/` in a browser.

### Application using the Bifrost Toolkit
To launch the version using the Bifrost Toolkit, simply use:

```
docker-compose -f docker-compose-bifrost.yml up -d
```

You should now be able to open `http://frontend.bifrost.com/` in a browser.

### Generating Demo-Data
You can generate some users and data. Note that the name of the containers depends on the folder you have cloned the project into.

```
docker exec -ti bifrostmicroservicessampleapplication_auth_1 node seed.js
docker exec -ti bifrostmicroservicessampleapplication_products_1 node seed.js
```

You should now be able to open `http://frontend.bifrost.com/` in a browser and login using `demouser@demo.ch` and password `test`.

### Testing Bifrost
A sample release is provided in `/strategies/bifrost.yml`. To test this release and rollout a "modified" service, you can use the Bifrost CLI, simply build a docker-image:

```
docker build --tag cli ./strategies
```

#### Switch Services
To showcase the routing capabilities of Bifrost, one can switch the traffic to different frontend services as follows:

```
docker run --rm -t --name cli --net=bifrostmicroservicessampleapplication_default cli node bifrost-run.js --engine bifrost:8181 switch_frontend_redesigned.yml
```

#### Simulating a Full Release

This should launch a sample strategy using Bifrost.

```
docker run --rm -t --name cli --net=bifrostmicroservicessampleapplication_default cli node bifrost-run.js --engine bifrost:8181 bifrost.yml
```