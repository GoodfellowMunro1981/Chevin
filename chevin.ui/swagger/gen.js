// require('child_process').exec('cmd /c "swagger/gen.bat"', function(e){
//     console.log(e);
//  });
const fs = require('fs');
var child_process = require('child_process');

let currentDir = process.cwd();
console.log(currentDir);
// cmd /c "${currentDir}/swagger/gen.bat"
child_process.exec(`java -jar "${currentDir}/swagger/swagger-codegen-cli-2.4.10.jar" generate -i https://localhost:44366/swagger/ChevinAPI/swagger.json -l typescript-fetch -o "${currentDir}/swagger/output" -Dio.swagger.parser.util.RemoteUrl.trustAll=true`, function (error, stdout, stderr) {
    if (error === null) {
        let fileNames = ['api.ts', 'configuration.ts', 'custom.d.ts', 'index.ts'];

        fileNames.forEach((fileName) => {

            fs.readFile(`${currentDir}/swagger/output/${fileName}`, 'utf8', function (err, data) {
                if (err) {
                    return console.log(err);
                }

                var result = data;
                if (fileName === 'api.ts') {
                    result = data
                        .replace(/protected configuration: Configuration/g, 'protected configuration?: Configuration')
                        .replace(/name: "RequiredError"/g, '');
                }

                fs.writeFile(`${currentDir}/src/swagger/${fileName}`, result, 'utf8', function (err) {
                    if (err) return console.log(err);
                    console.log(`${fileName} was copied to destination.txt`);
                });
            });


        })
    }
    else {
        console.log(error);
    }
});