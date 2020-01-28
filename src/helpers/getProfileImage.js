import profileImage from '../assets/profile_image.png';

const getProfileImage = profileImageUrl =>
  Boolean(profileImageUrl) ? profileImageUrl : profileImage;

export default getProfileImage;
