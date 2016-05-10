/**
 * @description Injectable constants. Define appropriate providers when bootstrapping the app.
 */
import {OpaqueToken} from '@angular/core';

export const BASE_URL: OpaqueToken = new OpaqueToken('baseUrl');
