"use client"

import useAxiosAuth from "./useAxiosAuth"

const useApi = () => {
    const axios = useAxiosAuth();

    const get = async (link: string, controller?: AbortController) => {
        return await axios.get(link, {signal: controller?.signal});
    }

    const post = async (link: string, data:any, controller?: AbortController) => {
        return await axios.post(link, data, {signal: controller?.signal});
    }

    const patch = async (link: string, data:any, id:string, controller?: AbortController) => {
        return await axios.patch(`${link}/${id}`, data, {signal: controller?.signal});
    }

    const Delete = async (link: string, id:string, controller?: AbortController) => {
        return await axios.delete(`${link}/${id}`, {signal: controller?.signal});
    }

    return {get, post, patch, Delete};
}

export default useApi;