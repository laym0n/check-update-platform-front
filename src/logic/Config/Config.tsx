import {OpenAPI} from 'src/api/generated/core/OpenAPI';
import * as process from "process";

export default function initialize() {
    OpenAPI.BASE = process.env.REACT_APP_PLATFORM_BASE_URL as string;
};
