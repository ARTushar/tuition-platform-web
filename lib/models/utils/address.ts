import {mapItemFromAlias, mapItemToAlias} from "../../data-layer/utils/utils";
import {AddressAliases} from "../../data-layer/utils/aliases";

interface ConstructorParams {
    country: string;
    district: string;
    upazilla: string;
    area: string;
    ward: string;
    postalCode: string;
}

export default class Address {
    country: string;
    district: string;
    upazilla: string;
    area: string;
    ward: string;
    postalCode: string;


    constructor({country, district, upazilla, area, ward, postalCode}: ConstructorParams) {
        this.country = country;
        this.district = district;
        this.upazilla = upazilla;
        this.area = area;
        this.ward = ward;
        this.postalCode = postalCode;
    }

    mapToAlias() {
        return mapItemToAlias(AddressAliases, this);
    }

    static mapFromAlias(item): Address {
        return new Address({
            area: undefined, country: undefined, district: undefined, postalCode: undefined, upazilla: undefined, ward: undefined,
            ...mapItemFromAlias(AddressAliases, item)
        })
    }
}