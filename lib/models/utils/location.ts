import {mapItemFromAlias, mapItemToAlias} from "../../data-layer/utils/utils";
import {LocationAliases} from "../../data-layer/utils/aliases";

interface ConstructorParams {
    district: string;
    area: string;
}

export default class Location {
    district: string;
    area: string;


    constructor({district, area}: ConstructorParams) {
        this.district = district;
        this.area = area;
    }

    mapToAlias() {
        return mapItemToAlias(LocationAliases, this);
    }

    static mapFromAlias(item): Location {
        return new Location({
            area: undefined, district: undefined,
            ...mapItemFromAlias(LocationAliases, item)
        })
    }

    static constructFactory(location): Location {
        return new Location({
            district: location.district,
            area: location.area
        });
    }
}