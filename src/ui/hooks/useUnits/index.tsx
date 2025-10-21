import { UnitType } from "@common/types/units.type";
import { getUnits } from "@common/unitConversion";
import { useEffect, useState } from "react";

const useUnits = () => {
    const [units, setUnits] = useState<UnitType[]>([]);

    useEffect(() => {
        const _units = getUnits();
        setUnits(_units);
    }, []);

    return {units};
}
 
export default useUnits;