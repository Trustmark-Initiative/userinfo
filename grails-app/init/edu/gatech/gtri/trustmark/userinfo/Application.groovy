package edu.gatech.gtri.trustmark.userinfo

import grails.boot.GrailsApp
import grails.boot.config.GrailsAutoConfiguration
import org.springframework.context.annotation.Bean
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.AuthorityUtils
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService
import org.springframework.security.oauth2.core.user.DefaultOAuth2User
import org.springframework.security.oauth2.core.user.OAuth2User
import org.springframework.security.web.SecurityFilterChain

@EnableMethodSecurity
class Application extends GrailsAutoConfiguration {
    static void main(String[] args) {
        GrailsApp.run(Application, args)
    }

    @Bean
    SecurityFilterChain filterChain(
            final HttpSecurity httpSecurity)
            throws Exception {
        final OAuth2UserService oauth2UserService = new DefaultOAuth2UserService();

        httpSecurity
                .authorizeHttpRequests(authorize -> authorize
                        .regexMatchers("/assets/.*").permitAll()
                        .anyRequest().authenticated())
                .oauth2Login(oauth2LoginConfigurer -> oauth2LoginConfigurer
                        .userInfoEndpoint((userInfo -> userInfo
                                .userService(oauth2UserRequest -> {
                                    final OAuth2User oAuth2User = oauth2UserService.loadUser(oauth2UserRequest);

                                    final List<String> roleList = (List<String>) oAuth2User.getAttribute("roles");
                                    final List<GrantedAuthority> grantedAuthorityList = AuthorityUtils.createAuthorityList((roleList == null ? Collections.<String> emptyList() : roleList).toArray(new String[]
                                            {}));

                                    return new DefaultOAuth2User(
                                            grantedAuthorityList,
                                            oAuth2User.getAttributes(),
                                            "preferred_username");
                                }))));

        return httpSecurity.build();
    }
}
