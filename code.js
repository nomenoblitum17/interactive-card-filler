"use strict";

const personName = document.getElementById("cardholder-name"),
personNameError = document.querySelector(".cardholder-error"),
cardNumber = document.getElementById("card-number"),
cardNumberError = document.querySelector(".card-number-error"),
month = document.getElementById("month"),
year = document.getElementById("year"),
montYearError = document.querySelector(".month-year-error"),
cvc = document.getElementById("cvc-value"),
cvcError = document.querySelector(".cvc-error"),
formContainer = document.querySelector(".form-container"),
form = document.getElementById("form"),
showCardNumber = document.getElementById("card-number-1"),
showName = document.getElementById("card-user-1"),
showMonth = document.getElementById("month-1"),
showYear = document.getElementById("year-1"),
showCvc = document.getElementById("cvc");

cardNumber.addEventListener("keydown",(e)=>{
	if (cardNumber.value.length === 4) {
		cardNumber.value = cardNumber.value.concat(" ");
		if(e.key === "Backspace") cardNumber.value = cardNumber.value.substring(0,4);
	}
	else if (cardNumber.value.length === 9) {
		cardNumber.value = cardNumber.value.concat(" ");
		if(e.key === "Backspace") cardNumber.value = cardNumber.value.substring(0,9);
	}
	else if (cardNumber.value.length === 14) {
		cardNumber.value = cardNumber.value.concat(" ");
		if(e.key === "Backspace") cardNumber.value = cardNumber.value.substring(0,14);
	}
});

month.addEventListener("keyup",()=>{
	if (month.value.length === 0) showMonth.textContent = "00";
	else if(month.value.length === 1) showMonth.textContent = "0".concat(month.value);
	else if(month.value.length === 2) showMonth.textContent = month.value;

});
year.addEventListener("keyup",()=>{
	if (year.value.length === 0) showYear.textContent = "00";
	else if(year.value.length === 1) showYear.textContent = "0".concat(year.value);
	else if(year.value.length === 2) showYear.textContent = year.value;
});

const addEvent = (element,showElement,textContent) =>{
	element.addEventListener("keyup",()=>{
		if (element.value == "") showElement.textContent = textContent;
		else showElement.textContent = element.value;
	})
},

numberOnly = number => {
	if (number.endsWith("0")) return true
	else if (number.endsWith("1")) return true;
	else if (number.endsWith("2")) return true;
	else if (number.endsWith("3")) return true;
	else if (number.endsWith("4")) return true;
	else if (number.endsWith("5")) return true;
	else if (number.endsWith("6")) return true;
	else if (number.endsWith("7")) return true;
	else if (number.endsWith("8")) return true;
	else if (number.endsWith("9")) return true;
	return false;
},

returnPromise = (condition,element,rejectError,elementBorder) =>{
	return new Promise((resolve,reject)=>{
		if (condition) reject(element.textContent = rejectError,elementBorder.style.border = "1px solid  hsl(0, 100%, 66%)")
		else resolve(element.innerHTML = "&nbsp",elementBorder.style.border = "1px solid hsl(270, 3%, 76%)")
	})
},

success = () =>{
	let succesful = document.createElement("div"),
	scImg = document.createElement("img"),
	thanks = document.createElement("h2"),
	detail = document.createElement("p"),
	continueButton = document.createElement("button");

	succesful.classList.add("success");
	scImg.setAttribute("src","images/icon-complete.svg");

	thanks.textContent = "Thank you!";
	detail.textContent = "We've added your card details";
	continueButton.textContent = "Continue";

	succesful.appendChild(scImg);
	succesful.appendChild(thanks);
	succesful.appendChild(detail);
	succesful.appendChild(continueButton);

	continueButton.addEventListener("click",()=>{
		succesful.style.animation = "disappear 0.5s forwards";
		cardResult = false;
		personName.value = "";
		cardNumber.value = "";
		month.value = "";
		year.value = "";
		cvc.value = "";
		showCardNumber.textContent = "0000 0000 0000 0000";
		showName.textContent = "Jane Appleseed";
		showMonth.textContent = "00";
		showYear.textContent = "00";
		showCvc.textContent = "000";
		form.style.animation = "disappear 0.5s reverse"
		setTimeout(()=>{
			form.style.display = "flex";
			formContainer.removeChild(succesful)
		},300)
	})

	return succesful;
}

addEvent(cardNumber,showCardNumber,"0000 0000 0000 0000");
addEvent(personName,showName,"Jane Appleseed");
addEvent(cvc,showCvc,"000");

let cardResult;

document.getElementById("confirm").addEventListener("click",(e)=>{
	e.preventDefault();
	returnPromise((personName.value.length < 3),personNameError,"Must be more than 3 characters",personName)
	.then(e=> returnPromise((cardNumber.value.length < 19),cardNumberError,"must be al least 16 numbers",cardNumber))
	.then(e=> returnPromise((!numberOnly(cardNumber.value.split("").sort().toString())),cardNumberError,"Wrong format, numbers only",cardNumber))
	.then(e=> returnPromise((cardNumber.value.length < 19),cardNumberError,"must be al least 16 numbers",cardNumber))
	.then(e=> returnPromise((cardNumber.value.split(" ").length !== 4),cardNumberError,"must be 16 numbers",cardNumber))
	.then(e=> returnPromise((month.value.length < 1),montYearError,"Cant be blank",month))
	.then(e=> returnPromise((parseInt(month.value) > 12 || parseInt(month.value) < 1),montYearError,"must be between 1 and 12",month))
	.then(e=> returnPromise((!numberOnly(month.value.split("").sort().toString())),montYearError,"Numbers only",month))
	.then(e=> returnPromise((year.value.length < 1),montYearError,"Cant be blank",year))
	.then(e=> returnPromise((!numberOnly(year.value.split("").sort().toString())),montYearError,"Numbers only",year))
	.then(e=> returnPromise((cvc.value.length < 3),cvcError,"must be at least 3 numbers",cvc))
	.then(e=> returnPromise((!numberOnly(cvc.value.split("").sort().toString())),cvcError,"Numbers only",cvc),cardResult = true)
	.then(e=> {
		if(cardResult){
			form.style.animation = "disappear 0.6s forwards";
			setTimeout(()=>{
				form.style.display = "none";
				formContainer.appendChild(success());
			},500)
		}
	})
	.catch(e => console.log(e));
})