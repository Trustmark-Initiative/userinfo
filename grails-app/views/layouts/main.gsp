<%@ page contentType="text/html;charset=UTF-8" %>
<!doctype html>
<html lang="en">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>

    <asset:stylesheet src="application.css"/>
    <asset:javascript src="application.js"/>
    <asset:javascript src="actuator.js"/>

    <script type="text/javascript">
        actuator(
            "${createLink(uri:'/actuator/info')}");
    </script>

    <title>${grailsApplication.config.getProperty('server.title')}</title>

    <g:layoutHead/>
</head>

<body>
<main>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
            <ul class="navbar-nav me-auto">
                <li class="nav-item fw-bold pe-4"><a class="nav-link" href="${createLink(uri: "/")}">${grailsApplication.config.getProperty('server.title')}</a></li>
            </ul>
            <ul class="navbar-nav">
                <li class="d-none log-in nav-item dropdown">
                    <a id="navbarDropdown" class="nav-link" href="#" role="button"></a>
                </li>
            </ul>
        </div>
    </nav>

    <div class="container pt-4">
        <div class="row">
            <div class="col-12">
                <asset:image src="tmi-header.png" height="90em"/>
            </div>
        </div>
    </div>

    <g:layoutBody/>
</main>

<footer class="navbar navbar-expand-lg navbar-dark bg-dark mt-4 p-2">
    <div class="container">
        <div class="navbar-nav mx-auto">
            <a class="nav-link">Version <g:meta name="info.app.version"/>; Build Date <span id="git-commit-time"></span></a>
        </div>
    </div>
</footer>
</body>
</html>
