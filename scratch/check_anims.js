import fs from 'fs';
import { promisify } from 'util';

// Mocking environment for Node.js if needed, but GLTFLoader usually needs a browser context
// Actually, I can just use a simple script to read the JSON part of the GLB if I want to see animations.

async function checkAnimations(filePath) {
    const buffer = fs.readFileSync(filePath);
    // GLB starts with 0x46546C67 (glTF)
    // Then version, then total length.
    // Then first chunk: length, type (0x4E4F534A for JSON), data.
    
    const jsonLength = buffer.readUInt32LE(12);
    const jsonChunk = buffer.slice(20, 20 + jsonLength);
    const json = JSON.parse(jsonChunk.toString());
    
    console.log(`Animations in ${filePath}:`);
    if (json.animations) {
        json.animations.forEach((anim, i) => {
            console.log(`  ${i}: ${anim.name}`);
        });
    } else {
        console.log('  None');
    }
}

checkAnimations('public/models/BookCover.glb').catch(console.error);
checkAnimations('public/models/Page00.glb').catch(console.error);
