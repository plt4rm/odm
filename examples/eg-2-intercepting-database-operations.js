let getAnysolsODM = require("./getAnysolsODM");

getAnysolsODM(function (anysolsODM) {

    anysolsODM.addInterceptor({

        getName: function () {
            return "my-intercept";
        },

        intercept: (collectionName, operation, when, records) => {
            return new Promise((resolve, reject) => {
                if (collectionName === 'student') {
                    if (operation === 'create') {
                        console.log("[collectionName=" + collectionName + ", operation=" + operation + ", when=" + when + "]");
                        if (when === "before") {
                            for (let record of records) {
                                console.log("computed field updated for :: " + record.get('name'));
                                record.set("computed", record.get("name") + " +++ computed");
                            }
                        }
                    }
                    if (operation === 'read') {
                        console.log("[collectionName=" + collectionName + ", operation=" + operation + ", when=" + when + "]");
                        for (let record of records) {
                            console.log(record.toObject());
                        }
                    }
                }
                resolve(records);
            });
        }
    });

    anysolsODM.defineCollection({
        name: 'student',
        fields: [{
            name: 'name',
            type: 'string'
        }, {
            name: 'computed',
            type: 'string'
        }]
    });

    let studentCollection = anysolsODM.collection("student");
    let s = studentCollection.initializeRecord();
    s.set("name", "John " + new Date().toISOString());
    s.insert().then(function () {
        studentCollection.find().execute().then(function (students) {
            anysolsODM.closeConnection();
        });
    });

});
