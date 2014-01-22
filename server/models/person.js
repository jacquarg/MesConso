americano = require('americano');

module.exports = Person = americano.getModel('person', {
    'origin': String,
    'lastname': String,
    'firstname': String,
    'civility': String,
    'birthdate': Date,
    'gender': String,
    'csp': String,
    'maritalStatus': String,
    'postcode': String,
    'countryCode': String,
    'phoneNumber': String,
    'proPhoneNumber': String,
    'mobilePhoneNumber': String,
    'hasChildren': Boolean,
    'childrenCount': Number,
    'birthdateChild1': Date,
    'birthdateChild2': Date,
    'birthdateChild3': Date,
    'birthdateChild4': Date,
    'birthdateChild5': Date,
    'email': String,
    'axaCDBNQCLI': String,
    'timestamp': Date,
    'drivingLicenceDate': Date,
    'cliisf': Boolean,
    'address1': String,
    'address2': String,
    'address3': String,
    'address4': String,
    'city': String
});

Person.one = function(callback) {
    Person.request(
        "all", 
        {
            limit: 1
        },
        function(err, instances) {
            callback(null, instances);
        }
    );
}
