export const encodeText = (text: string, method: string): string => {
  try {
    switch (method) {
      case 'base64':
        return btoa(text);
      case 'uri':
        return encodeURIComponent(text);
      case 'caesar':
        return caesarCipher(text, 13);
      case 'vigenere':
        return vigenereCipher(text, 'SECRETKEY', true);
      case 'caesar-vigenere':
        const caesarFirst = caesarCipher(text, 13);
        return vigenereCipher(caesarFirst, 'SECRETKEY', true);
      default:
        return 'Unsupported encoding method';
    }
  } catch (error) {
    console.error('Encoding error:', error);
    return 'Error encoding text';
  }
};

export const decodeText = (text: string, method: string): string => {
  try {
    switch (method) {
      case 'base64':
        return atob(text);
      case 'uri':
        return decodeURIComponent(text);
      case 'caesar':
        return caesarCipher(text, -13);
      case 'vigenere':
        return vigenereCipher(text, 'SECRETKEY', false);
      case 'caesar-vigenere':
        const vigenereFirst = vigenereCipher(text, 'SECRETKEY', false);
        return caesarCipher(vigenereFirst, -13);
      default:
        return 'Unsupported decoding method';
    }
  } catch (error) {
    console.error('Decoding error:', error);
    return 'Error decoding text. Please ensure input is valid.';
  }
};

// Caesar cipher implementation (ROT13)
const caesarCipher = (text: string, shift: number): string => {
  return text
    .split('')
    .map(char => {
      const code = char.charCodeAt(0);
      
      // Uppercase letters (A-Z: 65-90)
      if (code >= 65 && code <= 90) {
        return String.fromCharCode(((code - 65 + shift) % 26 + 26) % 26 + 65);
      }
      
      // Lowercase letters (a-z: 97-122)
      if (code >= 97 && code <= 122) {
        return String.fromCharCode(((code - 97 + shift) % 26 + 26) % 26 + 97);
      }
      
      return char; // Return unchanged if not a letter
    })
    .join('');
};

// Vigenère cipher implementation
const vigenereCipher = (text: string, key: string, encode: boolean): string => {
  const normalizedKey = key.toUpperCase();
  let result = '';
  let keyIndex = 0;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const code = char.charCodeAt(0);
    
    if ((code >= 65 && code <= 90) || (code >= 97 && code <= 122)) {
      const isUpperCase = code >= 65 && code <= 90;
      const baseCharCode = isUpperCase ? 65 : 97;
      const keyChar = normalizedKey[keyIndex % normalizedKey.length];
      const keyShift = keyChar.charCodeAt(0) - 65;
      
      let shift = encode ? keyShift : -keyShift;
      let newCharCode = ((code - baseCharCode + shift) % 26 + 26) % 26 + baseCharCode;
      
      result += String.fromCharCode(newCharCode);
      keyIndex++;
    } else {
      result += char;
    }
  }
  
  return result;
};