import CryptoJS from 'crypto-js';

export const hashText = (text: string, algorithm: string): string => {
  try {
    switch (algorithm) {
      case 'md5':
        return CryptoJS.MD5(text).toString();
      case 'sha1':
        return CryptoJS.SHA1(text).toString();
      case 'sha256':
        return CryptoJS.SHA256(text).toString();
      case 'sha512':
        return CryptoJS.SHA512(text).toString();
      default:
        return 'Unsupported hashing algorithm';
    }
  } catch (error) {
    console.error('Hashing error:', error);
    return 'Error generating hash';
  }
};