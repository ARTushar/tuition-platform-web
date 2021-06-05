#!/usr/bin/env ts-node

import districts from '../../files/districts.json';
import postOffices from '../../files/postOffice.json';
import fs from 'fs';

let areas = {};
let disMap = {};

for (const dis of districts.districts) {
    areas[dis.name] = [];
    disMap[dis.id] = dis.name;
}
for(const po of postOffices.postcodes) {
    const district = po.district_id? disMap[po.district_id]: po.district;

    if(!areas[district].find(e => e === po.postOffice)){
        areas[district].push(po.postOffice);
    }

    if(po.upazila !== po.postOffice && !areas[district].find(e => e === po.upazila)) {
        areas[district].push(po.upazila);
    }
}

// console.log(areas);
fs.writeFile('areas.json', JSON.stringify(areas, null, 2), err => {
    console.log(err);
});