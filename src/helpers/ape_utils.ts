import * as betterInventory from "./betterInventory";
import {apeUtils, steamInstance} from "./index";
import {database as db} from "../resources";

export const getUserInfo = async ( steamid ) => {
    try {
        const inventory = await betterInventory.getInventory(440, steamid, 2);

        let tours = {
            two_cities: 0,
            gear_grinder: 0,
            mecha_engine: 0,
            steel_trap: 0,
            oil_spill: 0
        };

        for (const item of inventory.items) {
            switch (item.name) {
                case 'Operation Two Cities Badge':
                    tours.two_cities = parseInt(item.type.substr(6).slice(0, -6));
                    break;
                case 'Operation Gear Grinder Badge':
                    tours.gear_grinder = parseInt(item.type.substr(6).slice(0, -6));
                    break;
                case 'Operation Mecha Engine Badge':
                    tours.mecha_engine = parseInt(item.type.substr(6).slice(0, -6));
                    break;
                case 'Operation Steel Trap Badge':
                    tours.steel_trap = parseInt(item.type.substr(6).slice(0, -6));
                    break;
                case 'Operation Oil Spill Badge':
                    tours.oil_spill = parseInt(item.type.substr(6).slice(0, -6));
                    break;
            }
        }
        return tours;
    } catch (e) {
        return null;
    }
}

