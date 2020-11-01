//Global imports
import AsyncStorage from "@react-native-community/async-storage";
import { RNToasty } from 'react-native-toasty';
import NetInfo from '@react-native-community/netinfo';


//File imports
import {
    ACCESS_TOKEN,
    BASE_URL,
    GET,
    GET_ID_PARAMS,
    GET_URL_PARAMS,
    POST,
    POST_FORM,
    POST_RAW,
    MULTI_PART,
} from "../Helper/Constants";
import Fonts from "../Helper/Fonts";
import Logger from "../Helper/Logger";

class APICallService {
    constructor(apiname, params) {
        this.url = BASE_URL;

        var arr = apiname.toString().split(' ');
        this.apiType = arr[1];
        this.apiName = arr[0];
        this.params = params
    }

    async findSettings(apiName, apiType, params) {
        const resourceURL = `${this.url}${apiName}`;
        var myHeaders = new Headers();
        try {
            let token = await AsyncStorage.getItem(ACCESS_TOKEN);
            Logger.log({ token })
            myHeaders.append('Authorization', 'Bearer ' + token);
        } catch (error) {
            Logger.log(error, 'ACCESS_TOKEN error');
        }

        var settings = {
            url: resourceURL,
            headers: myHeaders,
        };
        switch (apiType) {
            case GET:
                settings.method = 'GET';
                break;
            case GET_ID_PARAMS:
                settings.method = 'GET';
                settings.url = resourceURL + '/' + params;
                break;
            // case GET_URL_PARAMS:
            //     settings.method = 'GET';
            //     settings.url = resourceURL + '?' + this.objToQueryString(params);
            //     break;
            case POST_RAW:
                myHeaders.append('Content-Type', 'application/json');
                settings.headers = myHeaders;
                settings.method = 'POST';
                settings.body = JSON.stringify(params);
                break;
            case POST:
                settings.headers = myHeaders;
                settings.method = 'POST';
                settings.body = null
                break;
            case POST_FORM:
                settings.headers = myHeaders;
                settings.method = 'POST';
                settings.body = this.objToFormData(params);
                break;
            case MULTI_PART:
                // myHeaders.append('Content-Type', 'multipart/form-data');
                // myHeaders.append('Accept', '*/*');
                settings.headers = myHeaders;
                settings.method = 'POST';
                settings.body = this.objToFormData(params);
                break;
            default:
                settings.method = 'GET';
                break;
        }
        return settings
    }

    objToFormData = (obj) => {
        const form = new FormData();
        for (const key in obj) {
            form.append(key, obj[key]);
        }
        return form;
    };

    async callAPI() {
        // Api call url
        const mObj = await NetInfo.fetch();
        Logger.log('net on => ', mObj)
        if (!mObj.isConnected) {
            RNToasty.Error({
                title: 'No internet connection, please try again later.',
                fontFamily: Fonts.POPPINS_REGULAR,
                position: 'bottom',
                withIcon: false
            });
            return { code: 899, message: 'No internet connection, please try again later.' };
        } else {
            this.settings = await this.findSettings(this.apiName, this.apiType, this.params);
            Logger.log('URL=> ', JSON.stringify(this.settings.url));
            Logger.log('ApiType=> ', this.apiType);
            Logger.log('Header=> ', JSON.stringify(this.settings.headers));
            Logger.log('Params=> ', JSON.stringify(this.settings.body));
            return fetch(this.settings.url, this.settings)
                .then(async (res) => {
                    Logger.log('res=>',res)
                    const resSize = res._bodyInit._data.size
                    if (resSize > 0) {
                        if (res.headers.map["content-type"] === "application/json") {
                            const resTemp = await res.json()
                            if (!resTemp.code) {
                                resTemp.code = res.status;
                            }
                            if (!resTemp.message) {
                                resTemp.message = res && res.message ? res.message : 'Error';
                            }
                            Logger.log('Response=> ', resTemp);
                            return resTemp
                        } else {
                            const successRes = { code: res.status, message: 'No internet connection, please try again later.' }
                            return successRes
                        }
                    } else {
                        const successRes = { code: res.status, message: res ? res.message : '' }
                        return successRes
                    }
                })
                .catch((err) => {
                    Logger.log('Response Error=> ', JSON.stringify(err));
                    const successRes = { code: 899, message: err }
                    return successRes
                });
        }
    }




}

export default APICallService;
