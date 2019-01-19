const MifflinStJeor = (params) => {
    //This is useful for those who dont have body fat %
    //Taken from https://en.wikipedia.org/wiki/Basal_metabolic_rate
    const { mass, height, age, gender } = params;
    let genderFactor = 0;


    if (gender === 'M') {
        genderFactor = 5;
    } else { //is Female
        genderFactor = -161;
    };

    return (10 * mass) + (6.25 * height) + (5.0 * age) + genderFactor;
}

const KatchMcArdle = (params) => {
    //This is useful for those who do have body fat %
    //Taken from https://en.wikipedia.org/wiki/Basal_metabolic_rate
    //Body Fat Percentage should be in whole numbers

    const { mass } = params;
    let { bodyFatPct } = params;

    if (bodyFatPct < 1.0) {
        bodyFatPct = bodyFatPct * 100;
    }

    const leanBodyMass = mass * (1 - (bodyFatPct / 100));

    return 370 + (21.6 * leanBodyMass);
}

export const BMR = (params) => {
    const { bodyFatPct } = params;
    if (bodyFatPct) {
        return KatchMcArdle(params);
    };
    return MifflinStJeor(params);
}

export const KCalPerMinute = (params) => {
    const { MET, mass, uom } = params;
    switch (uom) {
        case 'kg':
            return (MET * 3.5 * mass) / 200;
        case 'lbs':
            return (MET * 3.5 * LbToKg(mass)) / 200
        default:
            return (MET * 3.5 * mass) / 200;
    }
}

//Taken from ACSM
export const KgToLb = (kilograms) => {
    return kilograms / 2.2;
}

export const LbToKg = (pounds) => {
    return pounds * 2.2;
}

export const InToCm = (inches) => {
    return inches / 2.54;
}

export const CmToIn = (centimeters) => {
    return centimeters * 2.54;
}

export const MToCm = (meters) => {
    return meters / 100;
}

export const CmToM = (centimeters) => {
    return centimeters * 100;
}

export const MphToMetersPerMinute = (milesPerHour) => {
    return milesPerHour * 26.8;
}

export const MetersPerMinuteToMph = (metersPerMinute) => {
    return metersPerMinute / 26.8;
}