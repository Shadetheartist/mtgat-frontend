import {Axios} from "axios";
import backendAxiosInstance from "@/backendAxiosInstance";

export default {
	computed: {
		backend(){
			return backendAxiosInstance
		}
	}
}