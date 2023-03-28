package edu.gatech.gtri.trustmark.userinfo

class UrlMappings {

    static mappings = {
        "/$controller/$action?/$id?(.$format)?" {
            constraints {
                // apply constraints here
            }
        }

        "/"(controller: "index", action: "index")
        "403"(view: '/forbidden')
        "404"(view: '/notFound')
        "500"(view: '/error')
        "500"(view: '/forbidden', exception: org.springframework.security.access.AccessDeniedException)
    }
}
