export interface TargetObjectData {
    id: string;
    name: string;
    iconKey: string;
    activeTextureKey: string;
    x: number;
    y: number;
    width: number;
    height: number;
    voNameKey: string;
    voEduKey: string;
    eduTakeaway: string;
    actionType: 'music_pulse' | 'spin_clean' | 'screen_play' | 'board_draw' | 'tablet_quiz' | 'scan_beam' | 'monitor_pulse' | 'roll_medicine' | 'xray_glow' | 'bus_drive' | 'light_cycle' | 'gps_route';
}

export interface OrdinaryObjectData {
    id: string;
    name: string;
    textureKey: string;
    x: number;
    y: number;
    width: number;
    height: number;
    voHintKey: string;
    hintText: string;
}

export interface LevelData {
    levelId: number;
    name: string;
    subtitle: string;
    bgKey: string;
    stampKey: string;
    stampTitle: string;
    greetingVO: string;
    victoryVO: string;
    targets: TargetObjectData[];
    ordinaryObjects: OrdinaryObjectData[];
}

export const LEVELS_CONFIG: LevelData[] = [
    // Level 1: Smart Home (Modern Living Room / Kitchen)
    {
        levelId: 1,
        name: 'Smart Home',
        subtitle: 'Living Room & Kitchen',
        bgKey: 'bg_smart_home',
        stampKey: 'stamp_home_detective',
        stampTitle: 'Home Detective',
        greetingVO: 'vo_greeting_home',
        victoryVO: 'vo_victory_home',
        targets: [
            {
                id: 'smart_speaker',
                name: 'Smart Speaker',
                iconKey: 'item_smart_speaker',
                activeTextureKey: 'item_smart_speaker_active',
                x: 620,
                y: 600,
                width: 140,
                height: 170,
                voNameKey: 'vo_item_smart_speaker',
                voEduKey: 'vo_edu_smart_speaker',
                eduTakeaway: 'The smart speaker listens and plays your favorite song!',
                actionType: 'music_pulse'
            },
            {
                id: 'robot_vacuum',
                name: 'Robot Vacuum',
                iconKey: 'item_robot_vacuum',
                activeTextureKey: 'item_robot_vacuum_active',
                x: 1040,
                y: 860,
                width: 200,
                height: 140,
                voNameKey: 'vo_item_robot_vacuum',
                voEduKey: 'vo_edu_robot_vacuum',
                eduTakeaway: 'The robot vacuum cleans the floor all by itself!',
                actionType: 'spin_clean'
            },
            {
                id: 'smart_tv',
                name: 'Smart TV',
                iconKey: 'item_smart_tv',
                activeTextureKey: 'item_smart_tv_active',
                x: 1380,
                y: 390,
                width: 280,
                height: 200,
                voNameKey: 'vo_item_smart_tv',
                voEduKey: 'vo_edu_smart_tv',
                eduTakeaway: 'The smart TV recommends fun shows you might like!',
                actionType: 'screen_play'
            }
        ],
        ordinaryObjects: [
            {
                id: 'cozy_armchair',
                name: 'Cozy Armchair',
                textureKey: 'prop_home_armchair',
                x: 290,
                y: 690,
                width: 260,
                height: 280,
                voHintKey: 'vo_hint_home_chair',
                hintText: 'That is a cozy armchair! Can you find something that thinks like a computer?'
            },
            {
                id: 'desk_lamp',
                name: 'Regular Lamp',
                textureKey: 'prop_home_lamp',
                x: 440,
                y: 530,
                width: 110,
                height: 170,
                voHintKey: 'vo_hint_home_lamp',
                hintText: 'That is a regular lamp! Can you find something that thinks like a computer?'
            },
            {
                id: 'teddy_bear',
                name: 'Teddy Bear',
                textureKey: 'prop_home_teddy',
                x: 290,
                y: 660,
                width: 110,
                height: 120,
                voHintKey: 'vo_hint_home_teddy',
                hintText: 'That is a toy teddy bear! Can you find something that thinks like a computer?'
            },
            {
                id: 'fruit_bowl',
                name: 'Fruit Bowl',
                textureKey: 'prop_home_fruit',
                x: 760,
                y: 630,
                width: 100,
                height: 70,
                voHintKey: 'vo_hint_home_fruit',
                hintText: 'That is a bowl of fresh fruit! Can you find something that thinks like a computer?'
            },
            {
                id: 'bookshelf',
                name: 'Bookshelf',
                textureKey: 'prop_home_bookshelf',
                x: 1720,
                y: 540,
                width: 200,
                height: 440,
                voHintKey: 'vo_hint_home_bookshelf',
                hintText: 'That is a wooden bookshelf! Can you find something that thinks like a computer?'
            }
        ]
    },

    // Level 2: Smart School (Classroom & Hallway)
    {
        levelId: 2,
        name: 'Smart School',
        subtitle: 'Classroom & Hallway',
        bgKey: 'bg_smart_school',
        stampKey: 'stamp_school_detective',
        stampTitle: 'School Detective',
        greetingVO: 'vo_greeting_school',
        victoryVO: 'vo_victory_school',
        targets: [
            {
                id: 'smartboard',
                name: 'Interactive Smartboard',
                iconKey: 'item_smartboard',
                activeTextureKey: 'item_smartboard_active',
                x: 960,
                y: 350,
                width: 380,
                height: 240,
                voNameKey: 'vo_item_smartboard',
                voEduKey: 'vo_edu_smartboard',
                eduTakeaway: 'The smartboard helps us learn with smart drawings!',
                actionType: 'board_draw'
            },
            {
                id: 'tablet_learning',
                name: 'Tablet Learning Assistant',
                iconKey: 'item_tablet_learning',
                activeTextureKey: 'item_tablet_learning_active',
                x: 520,
                y: 720,
                width: 170,
                height: 140,
                voNameKey: 'vo_item_tablet_learning',
                voEduKey: 'vo_edu_tablet_learning',
                eduTakeaway: 'The learning tablet creates fun lessons just for you!',
                actionType: 'tablet_quiz'
            },
            {
                id: 'face_door_lock',
                name: 'Face-Scan Door Lock',
                iconKey: 'item_face_door_lock',
                activeTextureKey: 'item_face_door_lock_active',
                x: 1680,
                y: 470,
                width: 120,
                height: 180,
                voNameKey: 'vo_item_face_door_lock',
                voEduKey: 'vo_edu_face_door_lock',
                eduTakeaway: 'The face-scan lock opens the door safely for recognized students!',
                actionType: 'scan_beam'
            }
        ],
        ordinaryObjects: [
            {
                id: 'school_backpack',
                name: 'Student Backpack',
                textureKey: 'prop_school_backpack',
                x: 320,
                y: 810,
                width: 130,
                height: 160,
                voHintKey: 'vo_hint_school_backpack',
                hintText: 'That is a student backpack! Can you find something that thinks like a computer?'
            },
            {
                id: 'classroom_globe',
                name: 'World Globe',
                textureKey: 'prop_school_globe',
                x: 1380,
                y: 670,
                width: 130,
                height: 160,
                voHintKey: 'vo_hint_school_globe',
                hintText: 'That is a spinning world globe! Can you find something that thinks like a computer?'
            },
            {
                id: 'pencil_holder',
                name: 'Pencil Holder',
                textureKey: 'prop_school_pencils',
                x: 720,
                y: 680,
                width: 80,
                height: 90,
                voHintKey: 'vo_hint_school_pencils',
                hintText: 'That is a cup of colored pencils! Can you find something that thinks like a computer?'
            },
            {
                id: 'wall_clock',
                name: 'Wall Clock',
                textureKey: 'prop_school_clock',
                x: 400,
                y: 230,
                width: 110,
                height: 110,
                voHintKey: 'vo_hint_school_clock',
                hintText: 'That is a regular wall clock! Can you find something that thinks like a computer?'
            },
            {
                id: 'desk_plant',
                name: 'Desk Plant',
                textureKey: 'prop_school_plant',
                x: 1220,
                y: 680,
                width: 100,
                height: 120,
                voHintKey: 'vo_hint_school_plant',
                hintText: 'That is a green desk plant! Can you find something that thinks like a computer?'
            }
        ]
    },

    // Level 3: Smart Hospital (Doctor's Clinic / Care Room)
    {
        levelId: 3,
        name: 'Smart Hospital',
        subtitle: "Doctor's Clinic & Care Room",
        bgKey: 'bg_smart_hospital',
        stampKey: 'stamp_hospital_detective',
        stampTitle: 'Hospital Detective',
        greetingVO: 'vo_greeting_hospital',
        victoryVO: 'vo_victory_hospital',
        targets: [
            {
                id: 'health_monitor',
                name: 'Health Monitor AI',
                iconKey: 'item_health_monitor',
                activeTextureKey: 'item_health_monitor_active',
                x: 480,
                y: 510,
                width: 200,
                height: 250,
                voNameKey: 'vo_item_health_monitor',
                voEduKey: 'vo_edu_health_monitor',
                eduTakeaway: 'The AI monitor watches vital signs to keep patients safe!',
                actionType: 'monitor_pulse'
            },
            {
                id: 'medicine_robot',
                name: 'Medicine Delivery Robot',
                iconKey: 'item_medicine_robot',
                activeTextureKey: 'item_medicine_robot_active',
                x: 1000,
                y: 750,
                width: 210,
                height: 270,
                voNameKey: 'vo_item_medicine_robot',
                voEduKey: 'vo_edu_medicine_robot',
                eduTakeaway: 'Robots help doctors deliver medicine safely and quickly!',
                actionType: 'roll_medicine'
            },
            {
                id: 'smart_xray',
                name: 'Smart X-Ray Screen',
                iconKey: 'item_smart_xray',
                activeTextureKey: 'item_smart_xray_active',
                x: 1480,
                y: 410,
                width: 280,
                height: 220,
                voNameKey: 'vo_item_smart_xray',
                voEduKey: 'vo_edu_smart_xray',
                eduTakeaway: 'The smart X-ray screen helps doctors spot bone injuries quickly!',
                actionType: 'xray_glow'
            }
        ],
        ordinaryObjects: [
            {
                id: 'stethoscope',
                name: "Doctor's Stethoscope",
                textureKey: 'prop_hosp_stethoscope',
                x: 740,
                y: 690,
                width: 120,
                height: 110,
                voHintKey: 'vo_hint_hospital_stethoscope',
                hintText: 'That is a doctor stethoscope! Can you find something that thinks like a computer?'
            },
            {
                id: 'patient_bed',
                name: 'Care Bed',
                textureKey: 'prop_hosp_bed',
                x: 230,
                y: 740,
                width: 280,
                height: 240,
                voHintKey: 'vo_hint_hosp_bed',
                hintText: 'That is a comfortable care bed! Can you find something that thinks like a computer?'
            },
            {
                id: 'clipboard',
                name: 'Medical Clipboard',
                textureKey: 'prop_hosp_clipboard',
                x: 840,
                y: 670,
                width: 80,
                height: 100,
                voHintKey: 'vo_hint_hosp_clipboard',
                hintText: 'That is a medical clipboard! Can you find something that thinks like a computer?'
            },
            {
                id: 'first_aid_box',
                name: 'First Aid Kit',
                textureKey: 'prop_hosp_firstaid',
                x: 1720,
                y: 720,
                width: 140,
                height: 120,
                voHintKey: 'vo_hint_hosp_firstaid',
                hintText: 'That is a first aid kit! Can you find something that thinks like a computer?'
            },
            {
                id: 'water_cooler',
                name: 'Water Dispenser',
                textureKey: 'prop_hosp_water',
                x: 1280,
                y: 570,
                width: 110,
                height: 240,
                voHintKey: 'vo_hint_hosp_water',
                hintText: 'That is a water dispenser! Can you find something that thinks like a computer?'
            }
        ]
    },

    // Level 4: Smart City (City Street & Roads)
    {
        levelId: 4,
        name: 'Smart City',
        subtitle: 'City Street & Intersection',
        bgKey: 'bg_smart_city',
        stampKey: 'stamp_city_detective',
        stampTitle: 'City Detective',
        greetingVO: 'vo_greeting_city',
        victoryVO: 'vo_victory_city',
        targets: [
            {
                id: 'self_driving_bus',
                name: 'Self-Driving Bus',
                iconKey: 'item_self_driving_bus',
                activeTextureKey: 'item_self_driving_bus_active',
                x: 520,
                y: 660,
                width: 380,
                height: 230,
                voNameKey: 'vo_item_self_driving_bus',
                voEduKey: 'vo_edu_self_driving_bus',
                eduTakeaway: 'The self-driving bus takes passengers safely across the city!',
                actionType: 'bus_drive'
            },
            {
                id: 'smart_traffic_lights',
                name: 'Smart Traffic Lights',
                iconKey: 'item_smart_traffic_lights',
                activeTextureKey: 'item_smart_traffic_lights_active',
                x: 1140,
                y: 440,
                width: 130,
                height: 300,
                voNameKey: 'vo_item_smart_traffic_lights',
                voEduKey: 'vo_edu_smart_traffic_lights',
                eduTakeaway: 'Smart traffic lights change colors to keep traffic moving smoothly!',
                actionType: 'light_cycle'
            },
            {
                id: 'gps_car',
                name: 'GPS Navigation Car',
                iconKey: 'item_gps_car',
                activeTextureKey: 'item_gps_car_active',
                x: 1540,
                y: 740,
                width: 320,
                height: 200,
                voNameKey: 'vo_item_gps_car',
                voEduKey: 'vo_edu_gps_car',
                eduTakeaway: 'GPS navigation finds the smartest route through city traffic!',
                actionType: 'gps_route'
            }
        ],
        ordinaryObjects: [
            {
                id: 'park_bench',
                name: 'Park Bench',
                textureKey: 'prop_city_bench',
                x: 180,
                y: 760,
                width: 180,
                height: 130,
                voHintKey: 'vo_hint_city_bench',
                hintText: 'That is a park bench! Can you find something that thinks like a computer?'
            },
            {
                id: 'street_tree',
                name: 'Green Tree',
                textureKey: 'prop_city_tree',
                x: 220,
                y: 420,
                width: 180,
                height: 300,
                voHintKey: 'vo_hint_city_tree',
                hintText: 'That is a shady green tree! Can you find something that thinks like a computer?'
            },
            {
                id: 'fire_hydrant',
                name: 'Fire Hydrant',
                textureKey: 'prop_city_hydrant',
                x: 940,
                y: 770,
                width: 90,
                height: 120,
                voHintKey: 'vo_hint_city_hydrant',
                hintText: 'That is a fire hydrant! Can you find something that thinks like a computer?'
            },
            {
                id: 'city_bicycle',
                name: 'Bicycle',
                textureKey: 'prop_city_bicycle',
                x: 1260,
                y: 750,
                width: 140,
                height: 120,
                voHintKey: 'vo_hint_city_bicycle',
                hintText: 'That is a pedal bicycle! Can you find something that thinks like a computer?'
            },
            {
                id: 'trash_can',
                name: 'Recycle Bin',
                textureKey: 'prop_city_trash',
                x: 1820,
                y: 740,
                width: 90,
                height: 130,
                voHintKey: 'vo_hint_city_trash',
                hintText: 'That is a recycle bin! Can you find something that thinks like a computer?'
            }
        ]
    }
];
