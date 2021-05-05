'use strict';

import { sessionManager } from '../utils/session.js';

const BASE_URL = "http://127.0.0.1:8080/api/v1";

const requestOptions = {
    headers: { Token: sessionManager.getToken() },
};

export { BASE_URL, requestOptions };