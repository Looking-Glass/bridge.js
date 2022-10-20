import axios from "axios";

const BASE_URI = "http://localhost:3000"; // Temporary url

type PlayInput = {
  looking_glass_device_index: string;
  source: string;
};

type Yuv420pInput = {
  calibration: string;
  source: string;
  destination: string;
  encoder: string;
  crf: number;
  show_window: string;
  scale_x: number;
  scale_y: number;
};

type Yuv444pInput = {
  calibration: string;
  source: string;
  destination: string;
  encoder: string;
  crf: number;
  pixel_format: string;
};

export async function isBridgeRunning() {
  try {
    console.log("Checking if Bridge is running...");
    let response = await axios.get(BASE_URI);
    if (response.status === 200) {
      console.log("Bridge is running...");
      return { isSuccess: true, message: "Bridge is running..." };
    }

    console.log("Bridge is NOT running...");
    return { isSuccess: false, message: "Bridge is NOT running..." };
  } catch (error: any) {
    console.log("Error in checking Bridge status: " + error);
    return { isSuccess: false, message: "Error in checking Bridge status: " };
  }
}

export async function playContent(args: PlayInput) {
  try {
    // validation
    if (!args.looking_glass_device_index || !args.source) {
      return { isSuccess: false, message: "Missing paramaters" };
    }

    const checkbridgeStatus = await isBridgeRunning();

    console.log("checkbridgeStatus: ", checkbridgeStatus);

    if (!checkbridgeStatus.isSuccess) {
      return { isSuccess: false, response: "Please connect to bridge" };
    }

    let response = await axios.put(`${BASE_URI}/play`, args);

    return { isSuccess: true, response: response.data };
  } catch (error) {
    console.log("Error: ", error);
    return { isSuccess: false, error };
  }
}

export async function encodeYuv420p(args: Yuv420pInput) {
  try {
    // validation
    if (
      !args.calibration ||
      !args.source ||
      !args.destination ||
      !args.encoder ||
      !args.crf ||
      !args.show_window ||
      !args.scale_x ||
      !args.scale_y
    ) {
      return { isSuccess: false, message: "Missing paramaters" };
    }

    const checkbridgeStatus = await isBridgeRunning();

    console.log("checkbridgeStatus: ", checkbridgeStatus);

    if (!checkbridgeStatus.isSuccess) {
      return { isSuccess: false, response: "Please connect to bridge" };
    }

    let response = await axios.put(`${BASE_URI}/encode`, args);

    return { isSuccess: true, response: response.data };
  } catch (error) {
    console.log("Error: ", error);
    return { isSuccess: false, error };
  }
}

export async function encodeYuv444p(args: Yuv444pInput) {
  try {
    // validation
    if (
      !args.calibration ||
      !args.source ||
      !args.destination ||
      !args.encoder ||
      !args.crf ||
      !args.pixel_format
    ) {
      return { isSuccess: false, message: "Missing paramaters" };
    }

    const checkbridgeStatus = await isBridgeRunning();

    console.log("checkbridgeStatus: ", checkbridgeStatus);

    if (!checkbridgeStatus.isSuccess) {
      return { isSuccess: false, response: "Please connect to bridge" };
    }

    let response = await axios.put(`${BASE_URI}/encode`, args);

    return { isSuccess: true, response: response.data };
  } catch (error) {
    console.log("Error: ", error);
    return { isSuccess: false, error };
  }
}
