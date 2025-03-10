/**
 * Script to download sample profile images from Unsplash
 * 
 * This script downloads free-to-use images from Unsplash for our profile images.
 * It organizes them by gender and visual type.
 * 
 * Usage: node scripts/download-profile-images.js
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// Define the base directory for profile images
const baseDir = path.join(__dirname, '../public/images/profiles');

// Define the visual types
const visualTypes = [
  'athletic',
  'artistic',
  'professional',
  'casual',
  'alternative',
  'classic',
  'trendy',
  'outdoorsy'
];

// Define the genders
const genders = ['women', 'men'];

// Unsplash API for random images (no API key required for these URLs)
// These are direct image URLs that are free to use
const unsplashImages = {
  women: {
    athletic: [
      'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=500&q=80',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&q=80'
    ],
    artistic: [
      'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=500&q=80',
      'https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?w=500&q=80'
    ],
    professional: [
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&q=80',
      'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=500&q=80'
    ],
    casual: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&q=80',
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=500&q=80'
    ],
    alternative: [
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=500&q=80',
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500&q=80'
    ],
    classic: [
      'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=500&q=80',
      'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=500&q=80'
    ],
    trendy: [
      'https://images.unsplash.com/photo-1485875437342-9b39470b3d95?w=500&q=80',
      'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=500&q=80'
    ],
    outdoorsy: [
      'https://images.unsplash.com/photo-1542145748-a8f9c4e2d8a6?w=500&q=80',
      'https://images.unsplash.com/photo-1504439904031-93ded9f93e4e?w=500&q=80'
    ]
  },
  men: {
    athletic: [
      'https://images.unsplash.com/photo-1583468982228-19f19164aee1?w=500&q=80',
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&q=80'
    ],
    artistic: [
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=500&q=80',
      'https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=500&q=80'
    ],
    professional: [
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80'
    ],
    casual: [
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&q=80',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&q=80'
    ],
    alternative: [
      'https://images.unsplash.com/photo-1520975661595-6453be3f7070?w=500&q=80',
      'https://images.unsplash.com/photo-1512484776495-a09d92e87c3b?w=500&q=80'
    ],
    classic: [
      'https://images.unsplash.com/photo-1463453091185-61582044d556?w=500&q=80',
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&q=80'
    ],
    trendy: [
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&q=80',
      'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=500&q=80'
    ],
    outdoorsy: [
      'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=500&q=80',
      'https://images.unsplash.com/photo-1530086236344-95eb67df15c7?w=500&q=80'
    ]
  }
};

// Function to download an image
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    // Create directory if it doesn't exist
    const dir = path.dirname(filepath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Check if file already exists
    if (fs.existsSync(filepath)) {
      console.log(`File already exists: ${filepath}`);
      resolve();
      return;
    }

    // Download the image
    const file = fs.createWriteStream(filepath);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded: ${filepath}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {}); // Delete the file if there's an error
      reject(err);
    });
  });
}

// Main function to download all images
async function downloadAllImages() {
  console.log('Starting download of profile images...');

  // Loop through genders and visual types
  for (const gender of genders) {
    for (const visualType of visualTypes) {
      const images = unsplashImages[gender][visualType];
      
      // Loop through images for this gender and visual type
      for (let i = 0; i < images.length; i++) {
        const url = images[i];
        let filename;
        
        if (gender === 'women') {
          filename = i === 0 ? 
            `${visualType === 'athletic' ? 'emma' : 
              visualType === 'artistic' ? 'isabella' : 
              visualType === 'professional' ? 'charlotte' : 
              visualType === 'casual' ? 'mia' : 
              visualType === 'alternative' ? 'lily' : 
              visualType === 'classic' ? 'grace' : 
              visualType === 'trendy' ? 'zoe' : 'hannah'}.jpg` :
            `${visualType === 'athletic' ? 'sophia' : 
              visualType === 'artistic' ? 'olivia' : 
              visualType === 'professional' ? 'ava' : 
              visualType === 'casual' ? 'amelia' : 
              visualType === 'alternative' ? 'ruby' : 
              visualType === 'classic' ? 'ella' : 
              visualType === 'trendy' ? 'chloe' : 'lucy'}.jpg`;
        } else {
          filename = i === 0 ? 
            `${visualType === 'athletic' ? 'ethan' : 
              visualType === 'artistic' ? 'liam' : 
              visualType === 'professional' ? 'william' : 
              visualType === 'casual' ? 'benjamin' : 
              visualType === 'alternative' ? 'jackson' : 
              visualType === 'classic' ? 'henry' : 
              visualType === 'trendy' ? 'oliver' : 'daniel'}.jpg` :
            `${visualType === 'athletic' ? 'noah' : 
              visualType === 'artistic' ? 'mason' : 
              visualType === 'professional' ? 'james' : 
              visualType === 'casual' ? 'lucas' : 
              visualType === 'alternative' ? 'aiden' : 
              visualType === 'classic' ? 'alexander' : 
              visualType === 'trendy' ? 'jacob' : 'michael'}.jpg`;
        }
        
        const filepath = path.join(baseDir, gender, visualType, filename);
        
        try {
          await downloadImage(url, filepath);
        } catch (error) {
          console.error(`Error downloading ${url} to ${filepath}:`, error);
        }
      }
    }
  }

  console.log('All profile images downloaded successfully!');
}

// Run the download function
downloadAllImages().catch(console.error); 