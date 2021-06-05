import {mapItemFromAlias, mapItemToAlias} from "../../data-layer/utils/utils";
import {AddressAliases} from "../../data-layer/utils/aliases";

interface ConstructorParams {
    country: string;
    district: string;
    area: string;
}

export default class Address {
    country: string;
    district: string;
    area: string;

    constructor({country, district, area }: ConstructorParams) {
        this.country = country;
        this.district = district;
        this.area = area;
    }

    mapToAlias() {
        return mapItemToAlias(AddressAliases, this);
    }

    static mapFromAlias(item): Address {
        return new Address({
            area: undefined, country: undefined, district: undefined,
            ...mapItemFromAlias(AddressAliases, item)
        })
    }
}