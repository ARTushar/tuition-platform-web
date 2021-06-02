interface ConstructorParams {
    country: string;
    district: string;
    upazilla: string;
    area: string;
}

export default class Location {
    country: string;
    district: string;
    upazilla: string;
    area: string;


    constructor({country, district, upazilla, area}: ConstructorParams) {
        this.country = country;
        this.district = district;
        this.upazilla = upazilla;
        this.area = area;
    }
}