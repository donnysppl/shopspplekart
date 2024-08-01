'use server';

import MpsEkartShipment from '@/models/mpsekship';
import { connect } from "@/dbConfig/dbConfig";

export const mpslabelDataFetch = async (id: string) => {
    await connect();
    const findData = await MpsEkartShipment.findOne({ _id: id })
    return findData;

};