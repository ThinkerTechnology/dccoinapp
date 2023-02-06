import { io } from "socket.io-client";
import {REACT_APP_BASEURL} from '@env';
const socket = io.connect(REACT_APP_BASEURL);
export default socket;