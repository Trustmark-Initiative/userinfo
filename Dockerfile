FROM amazoncorretto:11

EXPOSE 8080

RUN yum install -y wget

WORKDIR /work
COPY ./build/libs/userinfo-1.0.war             userinfo.war

CMD [ \
    "java", \
    "-Djavax.net.debug=all", \
    "-Djava.security.egd=file:/dev/./urandom", \
    "-jar", \
    "/work/userinfo.war" \
    ]

