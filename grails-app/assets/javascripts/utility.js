function fetchGet(input) {
    return fetch(input, {
        method: "GET",
        headers: {
            "Accept": "application/json, text/javascript",
            "Content-Type": "application/json; charset=utf-8",
            "X-Requested-With": "XMLHttpRequest"
        }
    })
}

function fetchPost(input, data) {
    return fetch(input, {
        method: "POST",
        headers: {
            "Accept": "application/json, text/javascript",
            "Content-Type": "application/json; charset=utf-8",
            "X-Requested-With": "XMLHttpRequest"
        },
        body: JSON.stringify(data)
    })
}

function fetchPut(input, data) {
    return fetch(input, {
        method: "PUT",
        headers: {
            "Accept": "application/json, text/javascript",
            "Content-Type": "application/json; charset=utf-8",
            "X-Requested-With": "XMLHttpRequest"
        },
        body: JSON.stringify(data)
    })
}

function fetchDelete(input, data) {
    return fetch(input, {
        method: "DELETE",
        headers: {
            "Accept": "application/json, text/javascript",
            "Content-Type": "application/json; charset=utf-8",
            "X-Requested-With": "XMLHttpRequest"
        },
        body: JSON.stringify(data)
    })
}

function messageMap(failureMap, labelFor, messageFor) {

    function messageForInner(failureKey, failureElement, labelFor) {
        switch (failureElement.type) {
            case "ValidationMessageMustBeEmpty":
                return `The number of associated ${labelFor(failureKey)} must be 0; it is ${failureElement.size}.`
            case "ValidationMessageMustBeLengthGreaterThanOrEqual":
                return `Length of ${labelFor(failureKey)} must be greater than or equal to ${failureElement.lengthMinimumInclusive}; it is ${failureElement.length}.`
            case "ValidationMessageMustBeLengthLessThanOrEqual":
                return `Length of ${labelFor(failureKey)} must be less than or equal to ${failureElement.lengthMaximumInclusive}; it is ${failureElement.length}.`
            case "ValidationMessageMustBeNonNull":
                return `${labelFor(failureKey)} is required.`
            case "ValidationMessageMustBeNumeric":
                return `${labelFor(failureKey)} must be numeric.`
            case "ValidationMessageMustBeReference":
                return `${labelFor(failureKey)} must be a reference.`
            case "ValidationMessageMustBeDistinct":
                return `${labelFor(failureKey)} must be unique.`
            case "ValidationMessageMustBeUnique":
                return `${labelFor(failureKey)} must be unique.`
            case "ValidationMessageMustBeEqual":
                return `${labelFor(failureElement.field1)} and ${labelFor(failureElement.field2)} must be equal.`
            case "ValidationMessageMustBePattern":
                return `${labelFor(failureKey)} must meet the following criteria: ${failureElement.description}`
            default :
                return `${labelFor(failureKey)} invalid.`
        }
    }

    return Object.entries(failureMap).reduce(
        (messageMapInner, failureEntry) => {
            messageMapInner[failureEntry[0]] = failureEntry[1].reduce((messageArrayInner, failureElement) => {
                    if (failureElement.type === undefined) {

                        return messageArrayInner.concat([Object.entries(failureElement).reduce((messageMapInnerInner, failureElementEntry) => {

                                messageMapInnerInner[failureElementEntry[0]] = messageMap(failureElementEntry[1], labelFor, messageFor)

                                return messageMapInnerInner
                            },
                            {})])

                    } else {

                        return messageArrayInner.concat([messageForInner(failureEntry[0], failureElement, labelFor)])
                    }
                },
                [])

            return messageMapInner
        },
        {})
}

function messageMapShow(failureMapPromise, entityName, labelFor) {

    failureMapPromise.then(failureMap => {

        Object
            .entries(messageMap(failureMap, field => document.getElementById(`${entityName}-label-${labelFor[field]}`).innerHTML))
            .forEach(entry => {
                const fieldName = entry[0]
                const messageArray = entry[1]

                document.getElementById(`${entityName}-input-${labelFor[fieldName]}`).classList.add("is-invalid")
                messageArray.forEach(element => {
                    const div = document.createElement("div")
                    div.innerHTML = element
                    document
                        .getElementById(`${entityName}-invalid-feedback-${labelFor[fieldName]}`)
                        .appendChild(div);
                })
            })
    })
}

function classListChangeDNone(elementIdArrayAdd, elementIdArrayRemove) {
    classListAddDNone(elementIdArrayAdd);
    classListRemoveDNone(elementIdArrayRemove);
}

function classListAddDNone(elementIdArray) {
    elementIdArray.forEach(elementId => document.getElementById(elementId).classList.add("d-none"))
}

function classListRemoveDNone(elementIdArray) {
    elementIdArray.forEach(elementId => document.getElementById(elementId).classList.remove("d-none"))
}

function matchArrayLength(
    array,
    f0,
    f1,
    fn) {

    return array.length === 0 ? f0() :
        array.length === 1 ? f1(array[0]) :
            fn(array)
}

function input(
    classMap) {

    return elementNone("input", classMap)
}

function a(
    content) {

    if (typeof content === "string" || content instanceof String || Array.isArray(content)) {
        return elementSome("a", {}, Array.from(arguments).flatMap(element => Array.isArray(element) ? element : [element]))
    } else {
        return elementSome("a", content, Array.from(arguments).slice(1).flatMap(element => Array.isArray(element) ? element : [element]))
    }
}

function label(
    content) {

    if (typeof content === "string" || content instanceof String || Array.isArray(content)) {
        return elementSome("label", {}, Array.from(arguments).flatMap(element => Array.isArray(element) ? element : [element]))
    } else {
        return elementSome("label", content, Array.from(arguments).slice(1).flatMap(element => Array.isArray(element) ? element : [element]))
    }
}

function span(
    content) {

    if (typeof content === "string" || content instanceof String || Array.isArray(content)) {
        return elementSome("span", {}, Array.from(arguments).flatMap(element => Array.isArray(element) ? element : [element]))
    } else {
        return elementSome("span", content, Array.from(arguments).slice(1).flatMap(element => Array.isArray(element) ? element : [element]))
    }
}

function div(
    content) {

    if (typeof content === "string" || content instanceof String || Array.isArray(content)) {
        return elementSome("div", {}, Array.from(arguments).flatMap(element => Array.isArray(element) ? element : [element]))
    } else {
        return elementSome("div", content, Array.from(arguments).slice(1).flatMap(element => Array.isArray(element) ? element : [element]))
    }
}

function ul(
    content) {

    if (typeof content === "string" || content instanceof String || Array.isArray(content)) {
        return elementSome("ul", {}, Array.from(arguments).flatMap(element => Array.isArray(element) ? element : [element]))
    } else {
        return elementSome("ul", content, Array.from(arguments).slice(1).flatMap(element => Array.isArray(element) ? element : [element]))
    }
}


function li(
    content) {

    if (typeof content === "string" || content instanceof String || Array.isArray(content)) {
        return elementSome("li", {}, Array.from(arguments).flatMap(element => Array.isArray(element) ? element : [element]))
    } else {
        return elementSome("li", content, Array.from(arguments).slice(1).flatMap(element => Array.isArray(element) ? element : [element]))
    }
}

function elementSome(
    element,
    classMap,
    contentArray) {

    return `<${element} ${Object.keys(classMap).map(name => classMap[name] === false ? "" : classMap[name] === true ? name : `${name}="${classMap[name]}"`).join(" ")}>${contentArray.join(" ")}</${element}>`
}

function elementNone(
    element,
    classMap) {

    return `<${element} ${Object.keys(classMap).map(name => classMap[name] === false ? "" : classMap[name] === true ? name : `${name}="${classMap[name]}"`).join(" ")}/>`
}

function profile(
    profileFindOneUrl) {

    return fetchGet(profileFindOneUrl)
        .then(response => response.json())
        .then(profile => {

            function modal(userWithoutRole, userWithoutOrganization) {

                if (userWithoutRole) {
                    document.getElementById("modal-role-organization-user-without-role").classList.remove("d-none")
                }

                if (userWithoutOrganization) {
                    document.getElementById("modal-role-organization-user-without-organization").classList.remove("d-none")
                }

                if (userWithoutRole) {
                    new bootstrap.Modal(document.getElementById("modal-role-organization"), {}).show()
                }
            }

            function showUsername() {
                Array.from(document.querySelectorAll(".log-in"))
                    .forEach(element => element.classList.remove("d-none"))

                document.getElementById("navbarDropdown").innerHTML = profile.user.username
            }

            function showRoleAdministratorOrganization(userWithoutOrganization) {
                showUsername()

                Array.from(document.querySelectorAll(".role-administrator-organization"))
                    .forEach(element => element.classList.remove("d-none"))

                modal(false, userWithoutOrganization)
            }

            function showRoleAdministrator(userWithoutOrganization) {
                showUsername()

                Array.from(document.querySelectorAll(".role-administrator"))
                    .forEach(element => element.classList.remove("d-none"))

                modal(false, userWithoutOrganization)
            }

            function roleValue() {
                return profile.user === undefined || profile.user === null || profile.user.role === undefined || profile.user.role === null || !(profile.user.role.value === "trpt-administrator-organization" || profile.user.role.value === "trpt-administrator") ?
                    undefined :
                    profile.user.role.value
            }

            function organization() {
                return profile.user === undefined || profile.user === null || profile.user.organization === undefined || profile.user.organization === null ?
                    undefined :
                    profile.user.organization;
            }

            if (roleValue() === undefined) {
                modal(true, organization() === undefined)
            } else if (roleValue() === "trpt-administrator-organization") {
                showRoleAdministratorOrganization(organization() === undefined)
            } else if (roleValue() === "trpt-administrator") {
                showRoleAdministrator(organization() === undefined)
            }

            return roleValue()
        });
}
