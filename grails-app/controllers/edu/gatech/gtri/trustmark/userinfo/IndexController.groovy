package edu.gatech.gtri.trustmark.userinfo

import org.springframework.security.access.prepost.PreAuthorize

class IndexController {

    @PreAuthorize('isFullyAuthenticated()')
    def index() {}
}
