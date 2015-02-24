/**
 * Created by mosluce on 15/2/24.
 */
var azure = require("azure-storage"), fs = require("fs");
var blobService = azure.createBlobService('[account]','[key]');

blobService.createContainerIfNotExists("asset", function(err, result, response) {
    if(!err) {
        if(result) {
            console.log("Create container: OK!");
        } else {
            console.log("OK!");
        }

        upload();
    }
});

function upload() {
    blobService.createBlockBlobFromLocalFile("asset", "1487051.gif", "1487051.gif", function(err, result, response) {
        if(!err) {
            console.log("Upload file: OK!");

            list();
            download();
        }
    });
}

function list() {
    blobService.listBlobsSegmented("asset", null, function(err, result, response) {
        if(!err) {
            console.log(result);
        }
    });
}

function download() {
    blobService.getBlobToStream("asset", "1487051.gif", fs.createWriteStream("test.gif"), function(err) {
        console.log("Download file: OK!")

        del();
    });
}

function del() {
    blobService.deleteBlob("asset", "1487051.gif", function(err, result, response) {
        console.log("Delete file: OK!");
    });
}