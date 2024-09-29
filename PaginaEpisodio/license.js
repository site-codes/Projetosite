   const validLicenseKeysBase64 = [
            "Q3JpYWRvIFBvciBJbnN0aW50byBQbGF5"
        ]; 

        function decodeBase64Keys(keys) {
            return keys.map(key => atob(key)); 
        }

        function validateLicense(key) {
            const validLicenseKeys = decodeBase64Keys(validLicenseKeysBase64);
            return validLicenseKeys.includes(key);
        }
