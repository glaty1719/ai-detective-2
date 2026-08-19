const https = require('https');
const fs = require('fs');
const path = require('path');

const voDir = path.resolve(__dirname, '../public/assets/audio/vo');
if (!fs.existsSync(voDir)) {
    fs.mkdirSync(voDir, { recursive: true });
}

const voiceClips = [
    // Level Initial Greetings
    { key: 'vo_greeting_home', text: 'Welcome to the Smart Home! Lets find all three smart tools!' },
    { key: 'vo_greeting_school', text: 'Welcome to the Smart School! Lets find all three smart tools!' },
    { key: 'vo_greeting_hospital', text: 'Welcome to the Smart Hospital! Lets find all three smart tools!' },
    { key: 'vo_greeting_city', text: 'Welcome to the Smart City! Lets find all three smart tools!' },

    // 12 Target AI Tool Names
    { key: 'vo_item_smart_speaker', text: 'Smart Speaker' },
    { key: 'vo_item_robot_vacuum', text: 'Robot Vacuum' },
    { key: 'vo_item_smart_tv', text: 'Smart TV' },
    { key: 'vo_item_smartboard', text: 'Interactive Smartboard' },
    { key: 'vo_item_tablet_learning', text: 'Tablet Learning Assistant' },
    { key: 'vo_item_face_door_lock', text: 'Face-Scan Door Lock' },
    { key: 'vo_item_health_monitor', text: 'Health Monitor AI' },
    { key: 'vo_item_medicine_robot', text: 'Medicine Delivery Robot' },
    { key: 'vo_item_smart_xray', text: 'Smart X-Ray Screen' },
    { key: 'vo_item_self_driving_bus', text: 'Self-Driving Bus' },
    { key: 'vo_item_smart_traffic_lights', text: 'Smart Traffic Lights' },
    { key: 'vo_item_gps_car', text: 'GPS Navigation Car' },

    // Educational Voiceover Takeaways (GDD Section 4)
    { key: 'vo_edu_smart_speaker', text: 'The smart speaker listens and plays your favorite song!' },
    { key: 'vo_edu_robot_vacuum', text: 'The robot vacuum cleans the floor all by itself!' },
    { key: 'vo_edu_smart_tv', text: 'The smart TV recommends fun shows you might like!' },
    { key: 'vo_edu_smartboard', text: 'The smartboard helps us learn with smart drawings!' },
    { key: 'vo_edu_tablet_learning', text: 'The learning tablet creates fun lessons just for you!' },
    { key: 'vo_edu_face_door_lock', text: 'The face-scan lock opens the door safely for recognized students!' },
    { key: 'vo_edu_health_monitor', text: 'The AI monitor watches vital signs to keep patients safe!' },
    { key: 'vo_edu_medicine_robot', text: 'Robots help doctors deliver medicine safely and quickly!' },
    { key: 'vo_edu_smart_xray', text: 'The smart X-ray screen helps doctors spot bone injuries quickly!' },
    { key: 'vo_edu_self_driving_bus', text: 'The self-driving bus takes passengers safely across the city!' },
    { key: 'vo_edu_smart_traffic_lights', text: 'Smart traffic lights change colors to keep traffic moving smoothly!' },
    { key: 'vo_edu_gps_car', text: 'GPS navigation finds the smartest route through city traffic!' },

    // Praise & Encouragement
    { key: 'vo_praise_awesome', text: 'Awesome detective work!' },
    { key: 'vo_praise_smart_choice', text: 'Smart discovery!' },
    { key: 'vo_praise_high_five', text: 'High five! Great detective skills!' },

    // 20 Ordinary Object Hints (GDD Section 6)
    // Level 1: Smart Home
    { key: 'vo_hint_home_chair', text: 'That is a cozy armchair! Can you find something that thinks like a computer?' },
    { key: 'vo_hint_home_lamp', text: 'That is a regular lamp! Can you find something that thinks like a computer?' },
    { key: 'vo_hint_home_teddy', text: 'That is a toy teddy bear! Can you find something that thinks like a computer?' },
    { key: 'vo_hint_home_fruit', text: 'That is a bowl of fresh fruit! Can you find something that thinks like a computer?' },
    { key: 'vo_hint_home_bookshelf', text: 'That is a wooden bookshelf! Can you find something that thinks like a computer?' },

    // Level 2: Smart School
    { key: 'vo_hint_school_backpack', text: 'That is a student backpack! Can you find something that thinks like a computer?' },
    { key: 'vo_hint_school_globe', text: 'That is a spinning world globe! Can you find something that thinks like a computer?' },
    { key: 'vo_hint_school_pencils', text: 'That is a cup of colored pencils! Can you find something that thinks like a computer?' },
    { key: 'vo_hint_school_clock', text: 'That is a regular wall clock! Can you find something that thinks like a computer?' },
    { key: 'vo_hint_school_plant', text: 'That is a green desk plant! Can you find something that thinks like a computer?' },

    // Level 3: Smart Hospital
    { key: 'vo_hint_hospital_stethoscope', text: 'That is a doctor stethoscope! Can you find something that thinks like a computer?' },
    { key: 'vo_hint_hosp_bed', text: 'That is a comfortable care bed! Can you find something that thinks like a computer?' },
    { key: 'vo_hint_hosp_clipboard', text: 'That is a medical clipboard! Can you find something that thinks like a computer?' },
    { key: 'vo_hint_hosp_firstaid', text: 'That is a first aid kit! Can you find something that thinks like a computer?' },
    { key: 'vo_hint_hosp_water', text: 'That is a water dispenser! Can you find something that thinks like a computer?' },

    // Level 4: Smart City
    { key: 'vo_hint_city_bench', text: 'That is a park bench! Can you find something that thinks like a computer?' },
    { key: 'vo_hint_city_tree', text: 'That is a shady green tree! Can you find something that thinks like a computer?' },
    { key: 'vo_hint_city_hydrant', text: 'That is a fire hydrant! Can you find something that thinks like a computer?' },
    { key: 'vo_hint_city_bicycle', text: 'That is a pedal bicycle! Can you find something that thinks like a computer?' },
    { key: 'vo_hint_city_trash', text: 'That is a recycle bin! Can you find something that thinks like a computer?' },

    // Level Completions
    { key: 'vo_victory_home', text: 'Great detective work! You spotted all the smart machines in the Smart Home!' },
    { key: 'vo_victory_school', text: 'Super detective work! You spotted all the smart machines in the Smart School!' },
    { key: 'vo_victory_hospital', text: 'Amazing job! You spotted all the smart machines in the Smart Hospital!' },
    { key: 'vo_victory_city', text: 'Incredible detective skills! You spotted all the smart machines in the Smart City!' },
    { key: 'vo_victory_master', text: 'Congratulations! You earned the Master AI Detective Badge!' }
];

function downloadTTS(key, text) {
    return new Promise((resolve, reject) => {
        const encodedText = encodeURIComponent(text);
        const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodedText}&tl=en&client=tw-ob`;
        const filePath = path.join(voDir, `${key}.mp3`);
        const fileStream = fs.createWriteStream(filePath);

        https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
            if (res.statusCode !== 200) {
                reject(new Error(`Failed with status ${res.statusCode} for ${key}`));
                return;
            }
            res.pipe(fileStream);
            fileStream.on('finish', () => {
                fileStream.close();
                console.log(`Saved ${key}.mp3 (${fs.statSync(filePath).size} bytes)`);
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(filePath, () => {});
            reject(err);
        });
    });
}

async function run() {
    console.log('Generating voiceover MP3 audio clips...');
    for (const clip of voiceClips) {
        try {
            await downloadTTS(clip.key, clip.text);
            await new Promise(r => setTimeout(r, 100));
        } catch (e) {
            console.error(`Error downloading ${clip.key}:`, e.message);
        }
    }
    console.log('All voiceover clips downloaded successfully!');
}

run();
