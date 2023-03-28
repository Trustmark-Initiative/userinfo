<%@ page import="java.util.stream.Collectors" %>
<%@ page import="org.springframework.security.authentication.AnonymousAuthenticationToken" %>
<%@ page import="org.springframework.security.core.context.SecurityContextHolder" %>
<%@ page import="org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<!DOCTYPE html>
<html>
<head>
    <meta name="layout" content="main"/>
</head>

<body>

<div class="container pt-4">
    <h2>User Information</h2>

    <div class="mt-2">
        Authenticated users may view this page;

        <sec:authorize access="!isFullyAuthenticated()">
            the current user is anonymous.
        </sec:authorize>
        <sec:authorize access="isFullyAuthenticated() && hasAnyAuthority('userinfo-role')">
            the current user has the "userinfo-role".
        </sec:authorize>
        <sec:authorize access="isFullyAuthenticated() && !hasAnyAuthority('userinfo-role')">
            the current user is authenticated, but an unknown role.
        </sec:authorize>
    </div>

    <table>
        <%=String.format(
                "<table class='mt-2 table table-bordered table-striped-hack mb-0'>%s</table>",
                Optional.ofNullable(SecurityContextHolder.context.authentication)
                        .map({ Object object ->
                            object instanceof AnonymousAuthenticationToken ?
                                    "<tr><td colspan='2' style='font-weight: bold'>(principal is anonymous)</td></tr>" :
                                    String.format(
                                            "<tr><td colspan='2' style='font-weight: bold'>%s</td></tr>%s",
                                            ((OAuth2AuthenticationToken) object).getPrincipal().getName(),
                                            ((OAuth2AuthenticationToken) object).getPrincipal().getAttributes().entrySet().stream()
                                                    .map(entry -> {
                                                        java.util.List.class.isAssignableFrom(entry.getValue().getClass()) ?
                                                                String.format(
                                                                        "<tr><td style='font-weight: bold; width: 25%%'>%s</td><td style='width: 75%%'><ul style='margin-bottom: 0px; padding-left: 1.3rem'><li>%s</li></ul></td></tr>",
                                                                        entry.getKey(),
                                                                        ((java.util.List) entry.getValue()).sort().join("</li><li>")) :
                                                                String.format(
                                                                        "<tr><td style='font-weight: bold; width: 25%%'>%s</td><td style='width: 75%%'>%s</td></tr>",
                                                                        entry.getKey(),
                                                                        entry.getValue())
                                                    })
                                                    .collect(Collectors.joining()))
                        })
                        .orElse("<tr><td colspan='2' style='font-weight: bold'>(principal is null)</td></tr>"))%>
    </table>
</div>

</body>
</html>
