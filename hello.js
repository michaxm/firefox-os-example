
window.onload = function init() {
    $('#test-handler').on('click', test);
    $('#dev-handler').on('click', devHandler);
}

function test() {
    $('#test').text("world");
    console.log("sdf");
}

function devHandler() {
    $('#out').text("testing reading");
    var store = navigator.getDeviceStorage("sdcard");

    writeTestFile(store);
    
    $('#out').text("reading");
    readFile("sdcard", "testdata", function (fileContent) {
        $('#out').text(fileContent);
    });
}

function writeTestFile(store) {
    var file = new Blob(["This is a text file."], {type: "text/plain"});
    var writeRequest = store.addNamed(file, "testdata");
    writeRequest.onsuccess = function () {
        var name = this.result.name;
        console.log('File "' + name + '" successfully wrote on the sdcard storage area');
        $('#out').text("write success");
    }
    writeRequest.onerror = function () {
        console.warn('Unable to write the file: ' + this.error.name);
        console.log('Already exists?');
        $('#out').text("write error");
    }
}

function readFile(storageName, filePath, successCallback) {
        console.log('Reading '+filePath);
    var store = navigator.getDeviceStorage(storageName);
    var readRequest = store.get("testdata");
    readRequest.onerror = function () {
        $('#debug').text("reading error: "+prettyPrint(this.error));
    }
    readRequest.onsuccess = function () {
        var name = this.result.name;
        //console.log('File "' + name + '" successfully retrieved from the sdcard storage area');
        var fileReader = new FileReader();
        fileReader.onload = function () {
            console.log("File contents: "+fileReader.result);
            successCallback(fileReader.result);
        }
        fileReader.readAsText(this.result);
    }
}

function buildDebugLink(){
    var url = window.URL.createObjectURL(file);
    //$('#out').text(url);
    var imageElement = $('<a>link</a>');
    imageElement.attr('href', url);
    $("<p>" + file.name + "," + file.lastModifiedDate + "," + file.type + "," + file.size  + "</p>")
        .appendTo('#results');
    imageElement.appendTo("#results");
    $('#debug').text(prettyPrint($.getJSON(sdrequest.name)));
}

function logObject(object) {
    console.log(object);
    var output = prettyPrint(object);
    console.log(output);
}

function prettyPrint(object) {
    var output = '';
    for (var property in object) {
        output += property + ': ' + object[property]+'; ';
    }
    return output;
}