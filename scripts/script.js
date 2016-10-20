//API key for github page: 801d4108ac0093540bafd760053a6a7e12761771

var profileContainerNode = document.querySelector(".profile-container"),
	repositoryContainerNode = document.querySelector(".repository-container"),
	inputNode = document.querySelector("input")

//Outputs date based on given Date() input
var getDate = function(dateInput) {
	var cleanDate = new Date(dateInput).toDateString()
	return cleanDate.slice(4)
}

var populateProfileData = function(searchTerms) {
	var baseProfileURL = "https://api.github.com/users/",
		accessTokenUrl = "?access_token=801d4108ac0093540bafd760053a6a7e12761771",
		profileUrl = baseProfileURL + searchTerms + accessTokenUrl

	var promise = $.getJSON(profileUrl)
	var responseHandler = function(profileData) {
		htmlString = ""
		htmlString += "<div class='user-details'>"
			htmlString += "<img src='" + profileData.avatar_url + "'>"
			htmlString += profileData.name ? "<h1>" + profileData.name + "</h1>" : ""
			htmlString += "<h2>" + profileData.login + "</h2>"
			htmlString += profileData.bio ? "<p>" + profileData.bio + "</p>" : ""
			htmlString += "<p class='follow-button'>Follow</p>"
			htmlString += "<ul class='contact-details'>"
				htmlString += profileData.company ? "<li>" + profileData.company + "</li>" : ""
				htmlString += profileData.location ? "<li>" + profileData.location + "</li>" : ""
				htmlString += profileData.email ? "<li>" + profileData.email + "</p>" : ""
				htmlString += profileData.created_at ? "<li>Joined on " + getDate(profileData.created_at) + "</li>" : ""
			htmlString += "</ul>"
		htmlString += "</div>"
		profileContainerNode.innerHTML = htmlString
	}
	promise.then(responseHandler)
}


var populateRepositoryData = function(searchTerms) {
	var baseProfileURL = "https://api.github.com/users/",
		reposAccessTokenUrl = "/repos?access_token=801d4108ac0093540bafd760053a6a7e12761771",
		reposUrl = baseProfileURL + searchTerms + reposAccessTokenUrl

	var promise = $.getJSON(reposUrl)

	var responseHandler = function(repositoryData) {
		var htmlString = ""
		for(var i = 0; i < repositoryData.length; i++) {
			var repositoryObject = repositoryData[i]
			htmlString += "<div class='repository'>" 
				htmlString += repositoryObject.name ? "<a href='" + repositoryObject.html_url + "'>"
				+ repositoryObject.name + "</a>" : ""
				// htmlString += repositoryData.language ? "<p>" + repositoryData.language + "</p>" : ""
			htmlString += "</div>"
		}
		repositoryContainerNode.innerHTML = htmlString
	}
	promise.then(responseHandler)
}

var search = function(eventObj){
	if(eventObj.keyCode === 13){
		var searchTerms = eventObj.target.value
		populateProfileData(searchTerms)
		populateRepositoryData(searchTerms)
		eventObj.target.value = ""
	}
}

inputNode.addEventListener('keydown',search)

//initializing project startup with my github
populateProfileData("e-david")
populateRepositoryData("e-david")