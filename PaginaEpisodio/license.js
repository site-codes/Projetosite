

const obfuscatedKey = "Q3JpYWRvIFBvciBJbnN0aW50byBQbGF5"; 
const licenseKey = atob(obfuscatedKey); 

function checkLicense(userLicenseKey) {
    return userLicenseKey === licenseKey;
}