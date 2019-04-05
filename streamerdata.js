/**MobilBarát Menetrend Testreszabása. */
/*Streamer adatok megadása*/

//A twitch neved amivel a csatorna elérhető --> http://twitch.tv/twitchneved.
var streamer = "avid_is_odd";
//Kép megjelenítése amikor üres a menetrend.
var noEventsPic = "https://peldakep.hu/kep.png";
//Kép megjelenítése amikor offline a menetrend(nembiztos, hogy megjelenik majd offline állapotban)
var offlinePic = "https://peldakep.hu/kep.png";
//Offline állapotban megjelenő szöveg
var offlineText = "Csak ezt a szöveget módosítsd!<br><span style=\"cursor: pointer; color: grey; text-decoration: underline;\" onclick=\"OfflineSite()\">OFFLINE MENETREND MEGTEKINTÉSE</span></span>"; 
//Üres menetrendkor megjelenő szöveg
var noEventsText = "Menetrend Jelenleg üres!";

