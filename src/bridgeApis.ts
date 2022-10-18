import axios from 'axios';

const BASE_URI = "http://localhost:33334" // Temporary api


type play = {
    looking_glass_device_index: string,
    source: string
}

type yuv420p = {
    calibration: string,
    source: string,
    destination: string,
    encoder: string,
    crf: number,
    show_window: string,
    scale_x: number,
    scale_y: number,
}

type yuv444p = {
    calibration: string,
    source: string,
    destination: string,
    encoder: string,
    crf: number,
    pixel_format: string,
}

export async function isBridgeRunning() {
    let response = await axios.get(BASE_URI)
    if (response.status === 200) {
        return true;
    }

    return false;
}

export async function playContent(args: play) {

    try {
        // validation
        if (!args.looking_glass_device_index || !args.source) {
            return { isSuccess: false, message: "Missing paramaters" };
        }

        if (await isBridgeRunning()) {
            let response = await axios.put(`${BASE_URI}/play`, {
                looking_glass_device_index: JSON.stringify(args.looking_glass_device_index),
                source: JSON.stringify(args.source)
            });

            return { isSuccess: true, response: response.data };
        } else {
            return { isSuccess: false, response: "Please connect to bridge" };
        }

    } catch (error) {

        console.log('Error: ', error)
        return { isSuccess: false, error };
    }
}

export async function encodeYuv420p(args: yuv420p) {
    try {
        // validation
        if (!args.calibration ||
            !args.source ||
            !args.destination ||
            !args.encoder ||
            !args.crf ||
            !args.show_window ||
            !args.scale_x ||
            !args.scale_y) {
            return { isSuccess: false, message: "Missing paramaters" };
        }

        if (await isBridgeRunning()) {
            let response = await axios.put(`${BASE_URI}/encode`, {
                calibration: JSON.stringify(args.calibration),
                source: JSON.stringify(args.source),
                destination: JSON.stringify(args.destination),
                encoder: JSON.stringify(args.encoder),
                crf: JSON.stringify(args.crf),
                show_window: JSON.stringify(args.show_window),
                scale_x: JSON.stringify(args.scale_x),
                scale_y: JSON.stringify(args.scale_y),
            });

            return { isSuccess: true, response: response.data };
        } else {
            return { isSuccess: false, response: "Please connect to bridge" };
        }

    } catch (error) {

        console.log('Error: ', error)
        return { isSuccess: false, error };
    }
}

export async function encodeYuv444p(args: yuv444p) {
    try {
        // validation
        if (!args.calibration ||
            !args.source ||
            !args.destination ||
            !args.encoder ||
            !args.crf ||
            !args.pixel_format
        ) {
            return { isSuccess: false, message: "Missing paramaters" };
        }

        if (await isBridgeRunning()) {
            let response = await axios.put(`${BASE_URI}/encode`, {
                calibration: JSON.stringify(args.calibration),
                source: JSON.stringify(args.source),
                destination: JSON.stringify(args.destination),
                encoder: JSON.stringify(args.encoder),
                crf: JSON.stringify(args.crf),
                pixel_format: JSON.stringify(args.pixel_format),
            });

            return { isSuccess: true, response: response.data };
        } else {
            return { isSuccess: false, response: "Please connect to bridge" };
        }
    } catch (error) {

        console.log('Error: ', error)
        return { isSuccess: false, error };
    }
}
