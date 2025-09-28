import axios from 'axios';
import { Option } from '../types';

export const fetchOptions = async (endpoint: string): Promise<Option[]> => {
    try {
        const { data } = await axios.get(endpoint);
        return data;
    } catch (error) {
        console.error('Error fetching options:', error);
        return [];
    }
};
