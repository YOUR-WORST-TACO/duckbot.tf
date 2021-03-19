import * as SteamAPI from 'steamapi';
import config from '../config';

const steam = new SteamAPI(config.steam.api);

export default steam;
