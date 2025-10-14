import { UnitType } from "@common/types/units.type";
import { getUnits } from "@common/unitConversion";

const useUnits = () => {

    const units = getUnits()

    return {units};
}
 
export default useUnits;