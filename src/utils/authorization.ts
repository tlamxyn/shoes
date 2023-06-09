import { CRUD } from "../models/permission";

/**
 * 
 * @param required 
 * @param current 
 * @description
 * Return `true` if `current` is enough to pass `required` and `false` if it not
 */
export function verifyPermissionRequirement(required: CRUD, current: CRUD): boolean {
    return current[0] >= required[0] &&
        current[1] >= required[1] &&
        current[2] >= required[2] &&
        current[3] >= required[3];
}