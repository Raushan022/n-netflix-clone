export const NETFLIX_LOGO = "https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"

export const NETFLIX_BACKGROUNG_IMAGE = "https://assets.nflxext.com/ffe/siteui/vlv3/202ac35e-1fca-44f0-98d9-ea7e8211a07c/web/IN-en-20250512-TRIFECTA-perspective_688b8c03-78cb-46a6-ac1c-1035536f871a_large.jpg"

export const USER_AVATAR = "https://plus.unsplash.com/premium_photo-1681882593262-b80ada0342f4?q=80&w=1919&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

export const API_OPTIONS = {
   method: 'GET',
   headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + import.meta.env.REACT_APP_TMDB_KEY
   }
};

export const IMG_CDN_URL = 'https://image.tmdb.org/t/p/w500/'

export const SUPPORTED_LANGUAGES = [
   { identifier: 'en', name: 'English' },
   { identifier: 'hindi', name: 'Hindi' },
   { identifier: 'spanish', name: 'Spanish' },
]

export const OPENAI_KEY = import.meta.env.REACT_APP_OPENAI_KEY