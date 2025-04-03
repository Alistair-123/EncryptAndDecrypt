   
        function encrypt(text) {
           
            const reversed = text.split('').reverse().join('');
            
            
            const shift = 3;
            const asciiWithShift = reversed.split('').map(char => {
             
                if (char === ' ') {
                    return 0;
                }
                return char.charCodeAt(0) + shift;
            });
            
         
            return asciiWithShift.join(' ');
        }
        
        function decrypt(encryptedText) {
          
            const shift = 3;
            const numbers = encryptedText.trim().split(/\s+/);
            
          
            const charactersArray = numbers.map(num => {
                
                if (num === '0') {
                    return ' ';
                }
                return String.fromCharCode(parseInt(num) - shift);
            });
        
            const reversedText = charactersArray.join('');
            const originalText = reversedText.split('').reverse().join('');
            
            return originalText;
        }
        

        function showEncryptionSteps(text) {
            const reversed = text.split('').reverse().join('');
            const shift = 3;
            
            let steps = "Encryption Steps:\n\n";
            steps += `1. Original text: "${text}"\n\n`;
            steps += `2. Reversed text: "${reversed}"\n\n`;
            steps += "3. ASCII conversion with +3 shift (spaces encoded as 0):\n";
            
            const charDetails = reversed.split('').map(char => {
                if (char === ' ') {
                    return `   ' ' (Space) → 0`;
                }
                const ascii = char.charCodeAt(0);
                const shifted = ascii + shift;
                return `   '${char}' (ASCII: ${ascii}) → ${shifted}`;
            });
            
            steps += charDetails.join('\n');
            steps += `\n\n4. Final encrypted output: "${encrypt(text)}"`;
            
            return steps;
        }
      
        function showDecryptionSteps(encryptedText) {
            const shift = 3;
            const numbers = encryptedText.trim().split(/\s+/);
            
            let steps = "Decryption Steps:\n\n";
            steps += `1. Encrypted text: "${encryptedText}"\n\n`;
            steps += "2. Converting numbers back to characters (removing +3 shift, 0 becomes space):\n";
            
            const charDetails = numbers.map(num => {
                if (num === '0') {
                    return `   0 → ' ' (Space)`;
                }
                const original = parseInt(num);
                const unshifted = original - shift;
                const char = String.fromCharCode(unshifted);
                return `   ${original} → ${unshifted} → '${char}'`;
            });
            
            steps += charDetails.join('\n');
            
            const charsAfterShift = numbers.map(num => {
                if (num === '0') return ' ';
                return String.fromCharCode(parseInt(num) - shift);
            }).join('');
            steps += `\n\n3. After shift removal: "${charsAfterShift}"\n\n`;
            
            const finalText = charsAfterShift.split('').reverse().join('');
            steps += `4. After reversing again: "${finalText}"`;
            
            return steps;
        }
        
        
        function isNumberInput(input) {
            return /^[\d\s]+$/.test(input.trim());
        }
        
     
        function createWordItems(encryptedTexts) {
            const container = document.getElementById('encodedWordsContainer');
            container.innerHTML = '';
            
            encryptedTexts.forEach((textObj, index) => {
                const wordItem = document.createElement('div');
                wordItem.className = 'word-item';
                
                const wordCode = document.createElement('div');
                wordCode.className = 'word-code';
                wordCode.textContent = textObj.encrypted;
                
                const decryptBtn = document.createElement('button');
                decryptBtn.className = 'small-decrypt-btn';
                decryptBtn.textContent = 'Decrypt';
                decryptBtn.addEventListener('click', function() {
                    const decrypted = decrypt(textObj.encrypted);
                    
                   
                    let wordText = wordItem.querySelector('.word-text');
                    if (!wordText) {
                        wordText = document.createElement('div');
                        wordText.className = 'word-text';
                        wordItem.appendChild(wordText);
                    }
                    
                    wordText.textContent = `→ ${decrypted}`;
                    
               
                    document.getElementById('processSteps').textContent = showDecryptionSteps(textObj.encrypted);
                });
                
                wordItem.appendChild(wordCode);
                wordItem.appendChild(decryptBtn);
                
                container.appendChild(wordItem);
            });
        }
        
    
        function parseInputForEncryption(text) {
           
            const chunks = text.split(/\n/);
            return chunks.map(chunk => {
                return {
                    original: chunk,
                    encrypted: encrypt(chunk)
                };
            });
        }
        
     
        document.getElementById('encryptBtn').addEventListener('click', function() {
            const input = document.getElementById('inputText').value;
            if (input.trim() === '') {
                alert('Please enter text to encrypt');
                return;
            }
            
            const encryptedTexts = parseInputForEncryption(input);
            createWordItems(encryptedTexts);
            
           
            const fullEncrypted = encrypt(input);
            document.getElementById('outputResult').textContent = fullEncrypted;
            document.getElementById('processSteps').textContent = showEncryptionSteps(input);
        });
        
       
        document.getElementById('decryptBtn').addEventListener('click', function() {
            const input = document.getElementById('inputText').value;
            if (input.trim() === '') {
                alert('Please enter numbers to decrypt');
                return;
            }
            
            try {
                const decrypted = decrypt(input);
                document.getElementById('outputResult').textContent = decrypted;
                document.getElementById('processSteps').textContent = showDecryptionSteps(input);
                
              
                document.getElementById('encodedWordsContainer').innerHTML = '';
            } catch (error) {
                alert('Invalid input. Please enter space-separated numbers for decryption.');
            }
        });
    