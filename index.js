console.log("Postman clone");
//Utility functions:
//1.Utility function to get Dom element from string
function getElementfromString(string) {
  let div = document.createElement("div");
  div.innerHTML = string;
  return div.firstElementChild;
}
//initialize  no of parameters
let addedParamCount = 1;
//Hide the parameters box initially
let parameterBox = document.getElementById("parameterBox");
parameterBox.style.display = "none";
//if the user clicks on params hide the json box
let paramsRadio = document.getElementById("paramsradio");
paramsRadio.addEventListener("click", () => {
  document.getElementById("requestJsonBox").style.display = "none";
  document.getElementById("parameterBox").style.display = "block";
});
//if the use clicks on json hide the params box
let jsonRadio = document.getElementById("jsonradio");
jsonRadio.addEventListener("click", () => {
  document.getElementById("parameterBox").style.display = "none";
  document.getElementById("requestJsonBox").style.display = "block";
});
//if the user clicks on + button add more parameters
let addParam = document.getElementById("addParam");
addParam.addEventListener("click", () => {
  let params = document.getElementById("params");
  let string = `<div class="form-row my-2">
                <label for="url" class="col-sm-2 col-form-label">Parameter ${
                  addedParamCount + 1
                }
                </label>
                <div class="col-md-4">
                    <input
                    type="text"
                    class="form-control"
                    id="parameterKey${addedParamCount + 1}"
                    placeholder="Enter parameter ${addedParamCount + 1} key"
                    />
                </div>
                <div class="col-md-4">
                    <input
                    type="text"
                    class="form-control"
                    id="parameterValue${addedParamCount + 1}"
                    placeholder="Enter parameter ${addedParamCount + 1} value"
                    />
                </div>
                <button  class="btn btn-primary deleteParam">-</button>
                </div>`;
  addedParamCount++;
  //Convert the element string to Dom node
  let paramElement = getElementfromString(string);
  params.appendChild(paramElement);
  //Add an event listener to remove the parameter on clicking -button
  let deleteParam = document.getElementsByClassName("deleteParam");
  for (item of deleteParam) {
    item.addEventListener("click", (e) => {
      e.target.parentElement.remove();
    });
  }
});

//if the user clicks on submit button
let submit = document.getElementById("submit");
submit.addEventListener("click", () => {
  //Show please wait in the response box to request patience from user
  document.getElementById("responsePrism").innerHTML =
    "Please wait...Fetching response";
  Prism.highlightAll();
  //Fetch all the values user has entered
  let url = document.getElementById("urlField").value;
  let requestType = document.querySelector('input[name="RequestType"]:checked')
    .value;
  let contentType = document.querySelector('input[name="ContentType"]:checked')
    .value;
  //Console all values for debugging
  console.log("Url is :", url);
  console.log("Request type is :", requestType);
  console.log("Content type is :", contentType);
  //If user has used params instead of json,collect all the the parameters in an object
  if (contentType == "params") {
    data = {};
    for (i = 0; i < addedParamCount; i++) {
      if (document.getElementById("parameterKey" + (i + 1)) != undefined) {
        let key = document.getElementById("parameterKey" + (i + 1)).value;
        let value = document.getElementById("parameterValue" + (i + 1)).value;
        data[key] = value;
      }
    }
    data = JSON.stringify(data);
  } else {
    data = document.getElementById("requestJsonText").value;
  }
  console.log("Url is :", url);
  console.log("Request type is :", requestType);
  console.log("Content type is :", contentType);
  console.log("data is", data);
  //   if request type is post ,invoke fetch api to create a post request
  if (requestType == "GET") {
    fetch(url, {
      method: "GET",
    })
      .then((response) => response.text())
      .then((text) => {
        document.getElementById("responsePrism").innerHTML = text;
        Prism.highlightAll();
      });
  } else {
    fetch(url, {
      method: "POST",
      body: data,
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.text())
      .then((text) => {
        document.getElementById("responsePrism").innerHTML = text;
        Prism.highlightAll();
      });
  }
});
