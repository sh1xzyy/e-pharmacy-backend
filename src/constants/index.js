import { resolve } from "node:path";

export const nameRegex = /^[a-zA-Z0-9_]{3,20}$/;
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const phoneRegex = /^(\+380|0)\d{9}$/;

export const TEMP_DIR = resolve("temp");
