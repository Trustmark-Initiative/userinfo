# userinfo
This is a utility project that will show all the user's information after they login via Keycloak.  It is useful for debugging user roles if they are having trouble accessing Trustmark Tool.
The trustmark-keycloak-deploy will deploy this software for you from the Trustmark software repository.  You should only need to build it from this project if you want to make changes.

Configure Hosts
===============

Add the following line to the `/etc/hosts` file on the host machine:

```text
127.0.0.1 host.docker.internal
```

Generate Keys and TrustStore
============================

Run `./sh/openssl-req.sh` to generate the public and private keys for the keycloak server and import
those keys into the truststore of the sample application. When prompted for a password, use `password`.

```shell
$ ./sh/openssl-req.sh
```

Build Sample Application
========================

Build the application as follows:

```shell
$ rm -rf .gradle build && ./grailsw clean && ./grailsw war
```

Configure Keycloak
==================

Run the docker container as follows:

```shell
$ docker compose up -d --build 
```

Open `https://localhost:9443/auth/`. You may log in with username `administrator` and password `administrator`.

* Add a realm; name it `keycloak`.
* Add a role; name it `userinfo-role`.
* Add a client scope; name it `openid`.
* Update the `roles` client scope; update the `realm roles` mapper; change the Token Claim Name to `roles`.
* Add a client; name it `userinfo`.
* Under the `userinfo` client, uncheck "Direct Access Grants".
* and set the "Valid Redirect URIs" to `http://localhost:8080/userinfo/login/oauth2/code/userinfo`.
* Under the `userinfo` client, add the `openid` client scope.
* Add the following users:

```
username: userinfo 
email: userinfo@example.org
given name: userinfo-name-given
family name: userinfo-name-family
password: userinfo 
role: userinfo-role
```

Run
====

Because the keycloak server had not been configured, the userinfo application likely failed to start. Restart the
userinfo application as follows:

```shell
$ docker compose up -d --build userinfo-userinfo
```

Open `http://localhost:8080/userinfo/`. The system will redirect the client to `https://localhost:9443/auth/`, where you
may log in with the username `userinfo` and the password `userinfo`.

Keycloak will then redirect to the application; the application will show the username, the user's given name, the
user's surname, the user's email, and the user's role.

```
userinfo
sub	                810562ef-02b2-4d0a-951b-474cc799f534
email_verified	    false
roles	            [offline_access, default-roles-userinfo, uma_authorization, userinfo-role]
name	            userinfo-name-given userinfo-name-last
preferred_username	userinfo
given_name	        userinfo-name-given
family_name	        userinfo-name-last
email	            userinfo@example.org
```

Configuration Notes
===================

Sample Application
------------------

In `docker-compose.yml` and `docker/keycloak-grails/grails-app/conf/application.properties`,

* `SPRING_BOOT_CONTEXT_PATH`: the value of `server.servlet.context-path`; currently `/userinfo`.
* `SPRING_SECURITY_CLIENT_ID`: the value of `spring.security.oauth2.client.registration.keycloak.client-id`;
  currently `userinfo`.
* `SPRING_SECURITY_ISSUER_URI`: the value of `spring.security.oauth2.client.provider.keycloak.issuer-uri`;
  currently `https://host.docker.internal/auth/realms/keycloak`
* `SPRING_SECURITY_REDIRECT_URI`: the value of `spring.security.oauth2.client.registration.keycloak.redirect-uri`;
  currently `http://localhost:8080/userinfo/login/oauth2/code/userinfo`

Note:

* The `SPRING_SECURITY_CLIENT_ID` must match the keycloak client name.
* The `SPRING_SECURITY_ISSUER_URI` must match the keycloak realm for the keycloak client.
* The `SPRING_SECURITY_REDIRECT_URI` must reference the sample application.

See also https://docs.spring.io/spring-security/reference/servlet/oauth2/login/core.html#oauth2login-sample-application-config
.

If the httpd server or the keycloak server rely on self-signed certificates, the sample application startup must specify
the keystore and they keystore password; they appear in the `Dockerfile`:

```dockerfile
CMD [ \
    "java", \
    "-Djavax.net.debug=all", \
    "-Djavax.net.ssl.trustStore=/work/userinfo-truststore.jks", \
    "-Djavax.net.ssl.trustStorePassword=password", \
    "-Djava.security.egd=file:/dev/./urandom", \
    "-jar", \
    "/work/userinfo.war" \
]
```

If neither of these servers rely on self-signed certificates, the Dockerfile may omit them.
