import React from "react";
import { ClientUpdateData } from "../../../../services/clientsService.types";
declare const ClientForm: React.FC<{
    onSuccess: () => void;
    initialValues?: ClientUpdateData & {
        id: number;
    };
}>;
export default ClientForm;
//# sourceMappingURL=ClientForm.d.ts.map