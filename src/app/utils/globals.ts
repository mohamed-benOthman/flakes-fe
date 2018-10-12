'use strict';

export const baseURL = 'http://82.165.253.223:3000';

export const businessURL = `${baseURL}/business`;
export const expertiseURL = `${baseURL}/expertise`;
export const searchURL = `${baseURL}/maquilleuse`;

export const uploadPhotoURL = `${baseURL}/files/upload`;
export const uploadPhotoParam = 'avatar1';

export const departmentsURL = '../../assets/json/departments.json';
export const citiesSearchURL = 'https://vicopo.selfbuild.fr/cherche';

export const defaultProfilePhoto = '../../assets/images/user_icon_placeholder.svg';

export const UPLOAD_PHOTO_MAX_SIZE = 1_000_000;
export const DEFAULT_MAX_PHOTO = 3;
export const SLOGAN_MAX_LENGTH = 500;
export const PASSWORD_MAX_LENGTH = 15;
export const PASSWORD_MIN_LENGTH = 6;
export const USERNAME_MIN_LENGTH = 4;

export const AUTH0_CLIENT_ID = 'SgKsf61W2U6mPcgmOfoyJcXnuHJurQ_j';
export const AUTH0_DOMAIN = 'dimacsoftware.eu.auth0.com';
