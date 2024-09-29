const validLicenseKeys = 
[
'InstintoPlayKey', 
'InstintoPlayKey'
]; // Chaves válidas

function validateLicense(key) {
    return validLicenseKeys.includes(key);
}
