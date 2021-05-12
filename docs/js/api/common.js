'use strict';

import { sessionManager } from '../utils/session.js';

const BASE_URL = "http://localhost:8080/api/v1";

const requestOptions = {
    headers: { Token: sessionManager.getToken() },
};

export { BASE_URL, requestOptions };